MOKSHA VOYAGE — 3D NAMASTE CHATBOT ("Sarthi")
Three.js + SVG + CSS + JavaScript (koi build / npm nahi chahiye)
=================================================================

FILES
  moksha-chatbot.js   -> 3D ladki (Three.js) + chat ka poora logic
  moksha-chatbot.css  -> speech bubble, chat window, mobile design
  index.html          -> demo page

WEBSITE PAR LAGANE KE STEPS
1) "moksha-chatbot" folder ko website par upload karein, jaise:
   https://aapkisite.com/moksha-chatbot/
2) Har page par </body> se theek pehle yeh paste karein:

   <script>
     window.MokshaChatbotConfig = {
       botName: 'Sarthi',
       phone: '+91XXXXXXXXXX',      // Call button
       whatsapp: '91XXXXXXXXXX',    // WhatsApp (+ ke bina)
       leadWebhook: ''              // optional: naam/number yahan POST honge
     };
   </script>
   <script type="module" src="/moksha-chatbot/moksha-chatbot.js"></script>

   (CSS file script khud load kar leta hai — bas dono files ek hi folder me rakhein.)

ZAROORI BAATEIN
- File ko web server (http/https) se kholiye. index.html ko seedha double-click (file://)
  karne par browser "module" script block kar deta hai. Local test ke liye VS Code
  "Live Server" use karein.
- Leads (naam + mobile) aap tak pahunchein, iske liye "whatsapp" ya "leadWebhook"
  zaroor set karein. Warna lead sirf browser console me dikhegi.
- WordPress: "WPCode" ya "Insert Headers and Footers" plugin se Footer me paste karein.
- Internet zaroori hai: Three.js jsDelivr CDN se load hota hai.

SAARI SETTINGS (MokshaChatbotConfig)
  botName, brandName          -> naam (default: Sarthi, Moksha Voyage)
  bubbleText, bubbleText2     -> bubble ke message
  welcomeText                 -> chat khulne par pehla message
  phone, whatsapp, email      -> contact buttons
  leadWebhook                 -> JSON POST: {name, phone, trip, page, time}
  onLead                      -> function(lead) { ... }  (apna code)
  apiUrl                      -> (optional) apna AI backend: POST {message, history} -> {reply, chips}
  packages                    -> ['Char Dham Yatra', {name: 'Kashi Darshan', details: '3 din / 2 raat ...'}]
  position                    -> 'right' ya 'left'
  look                        -> 'vector' (cartoon outline) ya 'soft'
  namasteOnOpen               -> true = chat kholne par bhi namaste
  namasteOncePerSession       -> true = poori visit me sirf pehle page par namaste
  autoOpenDelay               -> ms baad chat khud khule (0 = band)
  rememberChat                -> page badalne par chat yaad rahe

RANG / SIZE BADALNA
  moksha-chatbot.css ke upar --mvc-green, --mvc-gold, --mvc-aw (width), --mvc-ah (height)

JAVASCRIPT SE CONTROL
  MokshaChatbot.open()   MokshaChatbot.close()   MokshaChatbot.namaste()
  MokshaChatbot.say('Diwali offer shuru!')
  window.addEventListener('mokshachat:lead', e => console.log(e.detail))
