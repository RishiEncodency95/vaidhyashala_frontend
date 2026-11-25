/* A spoken call with the website chat's assistant (components/chatbot/Chatbot.tsx, Saumya; ported from the Design House chat).
   Two kinds, with the same events for the chat window:
   - openPipelineCall: a WebSocket to the backend, which runs Deepgram (hears), OpenAI (thinks) and Sarvam (speaks, in
     Saumya's Hindi voice). The mic goes out as 16 kHz PCM; her voice comes back as one MP3 per sentence.
   - openCall: WebRTC to OpenAI's Realtime voice model. The backend opens the call, so no key is in the browser; after
     that sound goes straight between the browser and OpenAI, and events come over a data channel.

   Before the mic's sound goes out it passes a gate, so the assistant hears the person at the microphone and not the
   room. Whoever is talking to the chat is the loudest voice at the mic: the gate learns how loud they are and stays
   shut for anything much quieter (a fan, a TV, people further away).

   Noise cancellation (the chat's switch, on by default) makes the gate stricter, and OpenAI's filter keep only the voice
   close to the mic. There is deliberately no third filter here: a neural one (GTCRN) on top of the browser's and
   OpenAI's mangled speech into words of other languages, and kept out no more of the room than the gate does. */

// Sound levels (RMS, 0 to 1). Laptop mics can be quiet.
const SPEECH_LEVEL = 0.008;
const QUIETEST_ROOM = 0.002;
const NOISE_MARGIN = 3; // speech is this many times louder than the room's background noise
const MAIN_VOICE_SHARE = 0.35; // anything quieter than this part of the visitor's own voice isn't them...
const MAIN_VOICE_SHARE_STRICT = 0.45; // ...with noise cancellation on
const MAIN_VOICE_BAR_LIMIT = 0.08; // ...up to this level, so one loud moment can't shut a normal voice out
const OVER_THE_ASSISTANT = 0.012; // while the assistant talks, sound must be at least this loud...
const OVER_ECHO_MARGIN = 2; // ...and this many times louder than its voice coming back through the speakers...
const ECHO_BAR_LIMIT = 0.06; // ...up to this level, so a wrong guess about the echo can't lock the visitor out
const GOOD_VOICE_LEVEL = 0.12; // a quiet mic is turned up towards this before the sound goes out...
const MOST_TURNED_UP = 5; // ...by at most this much

// Times in milliseconds
const WARM_UP_MS = 300; // mics click when they switch on
const ROOM_WINDOW_MS = 2000; // speech always has small gaps within this time: sound with no gap at all is the room
const OPEN_AFTER_MS = 60;
const LEARN_ECHO_MS = 400; // when the assistant starts talking: how loud does it come back?
const AFTER_ASSISTANT_MS = 350; // the room still rings for a moment after it stops
const KEEP_OPEN_MS = 700; // the small pauses inside a sentence
const LOOK_AHEAD_S = 0.16; // the sound waits this long, so the gate opens before the first word goes through
const MAIN_VOICE_FORGET_PER_MS = 0.00001; // it fades (half in about a minute), for someone moving away or a new speaker

/** Decides from sound levels alone whether to let the mic's sound through. Separate from the mic, so it can be tested. */
export const createVoiceGate = () => {
  const recentLevels: number[] = [];
  let warmUp = WARM_UP_MS;
  let voiced = 0;
  let keepOpen = 0;
  let open = false;
  let mainVoice = 0;
  let echo = 0;
  let assistantTalking = false;
  let learnEcho = 0;
  let afterAssistant = 0;
  let mainVoiceShare = MAIN_VOICE_SHARE;

  const room = () => Math.max(QUIETEST_ROOM, Math.min(...recentLevels));

  return {
    /** Noise cancellation on: voices much quieter than the visitor's are shut out more firmly */
    setStrict(on: boolean) {
      mainVoiceShare = on ? MAIN_VOICE_SHARE_STRICT : MAIN_VOICE_SHARE;
    },

    setAssistantTalking(on: boolean) {
      if (on && !assistantTalking) learnEcho = LEARN_ECHO_MS;
      if (!on && assistantTalking) afterAssistant = AFTER_ASSISTANT_MS;
      assistantTalking = on;
    },

    /** One short piece of sound: its level, and how long it lasted. Returns whether the gate is open. */
    frame(level: number, ms: number) {
      recentLevels.push(level);
      if (recentLevels.length * ms > ROOM_WINDOW_MS) recentLevels.shift();
      if (warmUp > 0) {
        warmUp -= ms;
        return false;
      }

      const assistantHeard = assistantTalking || afterAssistant > 0;
      if (afterAssistant > 0) afterAssistant -= ms;
      // How loud its voice comes back. Anything louder than the limit is a person, not the speakers.
      // Not while the gate is open: that is the visitor talking over it, and learning their voice as "echo" shut them out
      if (assistantTalking && !open && level < ECHO_BAR_LIMIT) echo += (level - echo) * (level > echo ? 0.1 : 0.002);

      const echoBar = assistantHeard ? Math.min(ECHO_BAR_LIMIT, Math.max(OVER_THE_ASSISTANT, echo * OVER_ECHO_MARGIN)) : 0;
      const bar = Math.max(SPEECH_LEVEL, room() * NOISE_MARGIN, Math.min(MAIN_VOICE_BAR_LIMIT, mainVoice * mainVoiceShare), echoBar);

      if (learnEcho > 0) {
        learnEcho -= ms;
        if (!open) return false;
      }

      if (level > bar) {
        voiced = Math.min(voiced + ms, OPEN_AFTER_MS * 2);
        if (voiced >= OPEN_AFTER_MS) open = true;
        if (open) {
          keepOpen = KEEP_OPEN_MS;
          mainVoice += (level - mainVoice) * (level > mainVoice ? 0.08 : 0.01);
        }
      } else {
        voiced = Math.max(0, voiced - ms);
        if (open) {
          keepOpen -= ms;
          if (keepOpen <= 0) open = false;
        }
      }
      mainVoice *= 1 - MAIN_VOICE_FORGET_PER_MS * ms;
      return open;
    },

    /** How much to turn the sound up, so that a quiet mic still reaches the assistant clearly */
    volume() {
      return mainVoice > 0 ? Math.min(MOST_TURNED_UP, Math.max(1, GOOD_VOICE_LEVEL / mainVoice)) : 1;
    },
  };
};

// Runs apart from the page, so a busy page can't delay it. Hands over the sound about every 40 ms.
const TAP = `class MvMicTap extends AudioWorkletProcessor {
  constructor() { super(); this.sum = 0; this.count = 0; }
  process(inputs) {
    const channel = inputs[0] && inputs[0][0];
    if (channel) {
      for (let i = 0; i < channel.length; i++) this.sum += channel[i] * channel[i];
      this.count += channel.length;
      if (this.count >= sampleRate * 0.04) {
        this.port.postMessage({ level: Math.sqrt(this.sum / this.count), ms: (this.count / sampleRate) * 1000 });
        this.sum = 0;
        this.count = 0;
      }
    }
    return true;
  }
}
registerProcessor("mv-mic-tap", MvMicTap);`;

export interface CallEvents {
  connect: (offer: string) => Promise<string>; // sends the connection offer to the backend, returns the answer
  onEvent: (event: { type: string; [key: string]: unknown }) => void;
  onLevel: (level: number) => void;
  onClosed: () => void; // the call dropped, or was ended from the other side
}

// Back from hold (the realtime call; the pipeline call has the same line on the server, chat.pipeline.ts)
const BACK_FROM_HOLD =
  "The visitor has just taken the call off hold. Don't greet them or introduce yourself again. In one or two short sentences pick up where you left off, naming in a few words what you were talking about, and ask how they would like to go on. If nothing had been discussed yet, just ask how you can help.";

export interface Call {
  send: (event: object) => void;
  /** Pipeline call only: says this fixed line (the greeting) as it is, without asking the model */
  say?: (text: string) => void;
  /** Back from hold: she picks up where they left off, without greeting again */
  resume: () => void;
  setAssistantTalking: (on: boolean) => void;
  setMuted: (on: boolean) => void;
  /** Turns noise cancellation on or off during the call */
  setNoiseCancel: (on: boolean) => void;
  stop: () => void;
}

// Mic sound for the pipeline call: averaged down to 16 kHz, 16-bit PCM, handed over every 40 ms (640 samples)
const PCM = `class MvPcm extends AudioWorkletProcessor {
  constructor() { super(); this.step = sampleRate / 16000; this.pos = 0; this.sum = 0; this.n = 0; this.out = new Int16Array(640); this.len = 0; }
  process(inputs) {
    const channel = inputs[0] && inputs[0][0];
    if (channel) {
      for (let i = 0; i < channel.length; i++) {
        this.sum += channel[i];
        this.n++;
        if (++this.pos >= this.step) {
          this.pos -= this.step;
          const v = Math.max(-1, Math.min(1, this.sum / this.n));
          this.out[this.len++] = v < 0 ? v * 0x8000 : v * 0x7fff;
          this.sum = 0;
          this.n = 0;
          if (this.len === this.out.length) {
            this.port.postMessage(this.out.buffer, [this.out.buffer]);
            this.out = new Int16Array(640);
            this.len = 0;
          }
        }
      }
    }
    return true;
  }
}
registerProcessor("mv-pcm", MvPcm);`;

const addWorklet = async (ctx: AudioContext, code: string) => {
  const script = URL.createObjectURL(new Blob([code], { type: "application/javascript" }));
  try {
    await ctx.audioWorklet.addModule(script);
  } finally {
    URL.revokeObjectURL(script);
  }
};

/** The mic, through the voice gate: `gated` carries only the visitor's voice (silence otherwise) */
const openMic = async (ctx: AudioContext, onLevel: (level: number) => void, noiseCancel: boolean) => {
  // The browser's own filters first: they remove the assistant's voice from the speakers, and steady noise. Not its
  // automatic volume: that lifts distant voices, and how loud a voice really is tells the gate who is at the mic.
  const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: false } });
  try {
    await ctx.resume();
    await addWorklet(ctx, TAP);
  } catch (error) {
    stream.getTracks().forEach((track) => track.stop());
    throw error;
  }
  let muted = false;

  const source = ctx.createMediaStreamSource(stream);
  const tap = new AudioWorkletNode(ctx, "mv-mic-tap");
  source.connect(tap).connect(ctx.destination); // it outputs silence: the connection only keeps it running

  const delay = ctx.createDelay(1);
  delay.delayTime.value = LOOK_AHEAD_S;
  const gain = ctx.createGain();
  gain.gain.value = 0;
  source.connect(delay).connect(gain);

  const gate = createVoiceGate();
  gate.setStrict(noiseCancel);
  tap.port.onmessage = ({ data }: MessageEvent<{ level: number; ms: number }>) => {
    onLevel(muted ? 0 : data.level);
    const open = gate.frame(data.level, data.ms);
    gain.gain.setTargetAtTime(open && !muted ? gate.volume() : 0, ctx.currentTime, 0.015);
  };

  return {
    stream,
    gated: gain as AudioNode,
    gate,
    setMuted: (on: boolean) => {
      muted = on;
      if (on) gain.gain.setTargetAtTime(0, ctx.currentTime, 0.015);
    },
  };
};

/** True where the page can make a call (not on a plain http address, for one) */
export const canCall = () =>
  typeof RTCPeerConnection !== "undefined" &&
  typeof navigator.mediaDevices?.getUserMedia === "function" &&
  typeof AudioContext !== "undefined" &&
  "audioWorklet" in AudioContext.prototype;

const CONNECT_TIMEOUT_MS = 15000;

/** Asks for the mic and connects. Call it from a click. Rejects if the mic can't be opened or the call can't connect. */
export async function openCall(events: CallEvents, options: { noiseCancel: boolean } = { noiseCancel: true }): Promise<Call> {
  // Made before anything is awaited: browsers only allow sound to start during a click
  const ctx = new AudioContext();
  const speaker = new Audio();
  speaker.autoplay = true;

  let mic: Awaited<ReturnType<typeof openMic>> | null = null;
  let pc: RTCPeerConnection | null = null;
  let closed = false;

  const shutDown = () => {
    closed = true;
    pc?.close();
    mic?.stream.getTracks().forEach((track) => track.stop());
    speaker.srcObject = null;
    void ctx.close();
  };

  try {
    mic = await openMic(ctx, events.onLevel, options.noiseCancel);
    const { gate } = mic;
    const toCall = ctx.createMediaStreamDestination();
    mic.gated.connect(toCall);

    const connection = new RTCPeerConnection();
    pc = connection;
    connection.ontrack = ({ streams }) => {
      speaker.srcObject = streams[0];
      void speaker.play().catch(() => {});
    };
    toCall.stream.getTracks().forEach((track) => connection.addTrack(track, toCall.stream));

    const channel = connection.createDataChannel("oai-events");
    channel.onmessage = ({ data }) => {
      try {
        events.onEvent(JSON.parse(data));
      } catch {
        // not an event
      }
    };

    const dropped = () => {
      if (closed) return;
      shutDown();
      events.onClosed();
    };
    connection.onconnectionstatechange = () => {
      if (connection.connectionState === "failed" || connection.connectionState === "closed") dropped();
    };

    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
    const answer = await events.connect(offer.sdp || "");
    await connection.setRemoteDescription({ type: "answer", sdp: answer });

    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("The call didn't connect")), CONNECT_TIMEOUT_MS);
      channel.onopen = () => {
        clearTimeout(timer);
        resolve();
      };
    });
    channel.onclose = dropped;

    const send = (event: object) => {
      if (channel.readyState === "open") channel.send(JSON.stringify(event));
    };
    return {
      send,
      resume: () => send({ type: "response.create", response: { instructions: BACK_FROM_HOLD } }),
      setAssistantTalking: gate.setAssistantTalking,
      setNoiseCancel: gate.setStrict,
      setMuted: mic.setMuted,
      stop: () => {
        if (!closed) shutDown();
      },
    };
  } catch (error) {
    shutDown();
    throw error;
  }
}

// After her last sentence ends, wait this long for the next one before saying she has stopped talking
const BETWEEN_SENTENCES_MS = 300;

/** The pipeline call (Deepgram + OpenAI + Sarvam on the backend) over a WebSocket. Call it from a click. */
export async function openPipelineCall(
  url: string,
  events: Omit<CallEvents, "connect">,
  options: { noiseCancel: boolean } = { noiseCancel: true }
): Promise<Call> {
  // Made before anything is awaited: browsers only allow sound to start during a click
  const ctx = new AudioContext();
  let mic: Awaited<ReturnType<typeof openMic>> | null = null;
  let ws: WebSocket | null = null;
  let closed = false;

  const send = (event: object) => {
    if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify(event));
  };

  /* Her voice: each sentence (an MP3) is decoded and played straight after the one before */
  const voice = ctx.createGain();
  voice.connect(ctx.destination);
  const sounding = new Set<AudioBufferSourceNode>();
  let playAt = 0;
  let decoding = Promise.resolve();
  let round = 0; // moves on when she is cut off, so sentences still decoding are dropped
  let talking = false;
  let quietTimer: ReturnType<typeof setTimeout> | undefined;
  const setTalking = (on: boolean, cleared = false) => {
    clearTimeout(quietTimer);
    if (talking === on) return;
    talking = on;
    send({ type: "pipeline.playback", playing: on });
    events.onEvent({ type: on ? "output_audio_buffer.started" : cleared ? "output_audio_buffer.cleared" : "output_audio_buffer.stopped" });
  };
  /* Her words in the chat follow her voice: the text of a sentence (a transcript delta with its `part`) is held until
     that sentence starts playing, and the end of the reply (transcript done, response done) waits behind it. So the
     chat never shows a line before she says it. */
  const started = new Set<string>(); // "item:part" of the sentences that have started playing
  let held: { type: string; [key: string]: unknown }[] = [];
  let nextPart = ""; // the sentence the next binary message is
  const partKey = (event: { [key: string]: unknown }) => `${event.item_id}:${event.part}`;
  const release = () => {
    while (held.length) {
      const event = held[0];
      if (event.type === "response.output_audio_transcript.delta" && typeof event.part === "number" && !started.has(partKey(event))) return;
      held.shift();
      events.onEvent(event);
    }
  };
  const begin = (key: string) => {
    started.add(key);
    release();
  };

  const play = (data: ArrayBuffer, key: string) => {
    const mine = round;
    decoding = decoding.then(async () => {
      let sound: AudioBuffer;
      try {
        sound = await ctx.decodeAudioData(data);
      } catch {
        if (mine === round) begin(key); // not sound: its words are shown anyway
        return;
      }
      if (mine !== round || closed) return;
      const source = ctx.createBufferSource();
      source.buffer = sound;
      source.connect(voice);
      const at = Math.max(ctx.currentTime + 0.02, playAt);
      source.start(at);
      playAt = at + sound.duration;
      sounding.add(source);
      setTimeout(() => mine === round && begin(key), Math.max(0, (at - ctx.currentTime) * 1000));
      setTalking(true);
      source.onended = () => {
        sounding.delete(source);
        if (sounding.size || mine !== round) return;
        clearTimeout(quietTimer);
        quietTimer = setTimeout(() => !sounding.size && setTalking(false), BETWEEN_SENTENCES_MS);
      };
    });
  };
  // Cut off (the visitor talked over her, or the chat dropped what was heard): silent at once. What she hadn't said yet
  // isn't shown; the reply's end still goes through, so the chat keeps what she did say.
  const silence = () => {
    round += 1;
    sounding.forEach((source) => {
      try {
        source.stop();
      } catch {
        // not started yet
      }
    });
    sounding.clear();
    playAt = 0;
    decoding = Promise.resolve();
    const ends = held.filter((event) => event.type === "response.done");
    held = [];
    started.clear();
    nextPart = "";
    ends.forEach((event) => events.onEvent(event));
    setTalking(false, true);
  };

  const shutDown = () => {
    closed = true;
    clearTimeout(quietTimer);
    held = [];
    if (ws && ws.readyState <= WebSocket.OPEN) ws.close(1000);
    mic?.stream.getTracks().forEach((track) => track.stop());
    void ctx.close();
  };

  try {
    mic = await openMic(ctx, events.onLevel, options.noiseCancel);
    await addWorklet(ctx, PCM);
    const pcm = new AudioWorkletNode(ctx, "mv-pcm");
    mic.gated.connect(pcm).connect(ctx.destination); // it outputs silence: the connection only keeps it running

    const socket = new WebSocket(url);
    ws = socket;
    socket.binaryType = "arraybuffer";
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("The call didn't connect")), CONNECT_TIMEOUT_MS);
      socket.onopen = () => {
        clearTimeout(timer);
        resolve();
      };
      socket.onclose = () => {
        clearTimeout(timer);
        reject(new Error("The call didn't connect"));
      };
    });

    pcm.port.onmessage = ({ data }: MessageEvent<ArrayBuffer>) => {
      if (socket.readyState === WebSocket.OPEN) socket.send(data);
    };
    socket.onmessage = ({ data }) => {
      if (typeof data !== "string") {
        play(data as ArrayBuffer, nextPart);
        nextPart = "";
        return;
      }
      let event: { type: string; [key: string]: unknown };
      try {
        event = JSON.parse(data);
      } catch {
        return; // not an event
      }
      if (event.type === "pipeline.interrupt") silence();
      else if (event.type === "pipeline.part") {
        // No sound could be made for this sentence: its words are shown straight away
        if (event.audio) nextPart = partKey(event);
        else begin(partKey(event));
      } else if (event.type.startsWith("response.")) {
        held.push(event);
        release();
      } else events.onEvent(event);
    };
    socket.onclose = () => {
      if (closed) return;
      shutDown();
      events.onClosed();
    };

    const { gate } = mic;
    return {
      send: (event) => {
        if ((event as { type?: string }).type === "output_audio_buffer.clear") silence();
        else send(event);
      },
      say: (text) => send({ type: "pipeline.say", text }),
      resume: () => send({ type: "pipeline.resume" }),
      setAssistantTalking: gate.setAssistantTalking,
      setNoiseCancel: gate.setStrict,
      setMuted: mic.setMuted,
      stop: () => {
        if (!closed) shutDown();
      },
    };
  } catch (error) {
    shutDown();
    throw error;
  }
}
