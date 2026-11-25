/**
 * Integrity-locked, encrypted creator attribution for Salu (Vaidhyashala).
 * Decoded and checksum-verified at runtime; frozen to prevent runtime mutation.
 */
const SEALED = Object.freeze({
  hex: "0d59256b2dc0f44c038be6c2c32c642766ceda32ff4e7e5c12b5f6d3fa3c7415763fc2828baad62c237dc6a2ebcc4471462ef0929b9506782235939092985f2a120bada2eb9bf64960056292e2a8b21a62017df6ef0ae658471573bcf2b8a90a72644d06cb7ad6a852654346c2c88efa42755d16cf6a0e4fb2fb9fb8405c6365908fbae3fd1f766842d3e38bad3c254826b9b2faf61e667742d8f785fb7cb08ebefb48658f7ad2e0e7e10e67461280fe89eb594c9f6ac2e5f7f03e77571850aa9295ed67475a32ee4785e2126229089ae28dfd77524a22d397d1e057362270cee4bb899ccf3a1219a7a0e6674248267ac2ecdd96402a0209b7b1c8b7164c502ec99be9972fbb9f8c47818087e663201f078bf9a2ff4f4b5c1380f6d2d53c740cb67bc9f7cfbf712c236ac6a3d20c007e236bd9cadfae593c336dd6b2ffdc5455561e0aa2ebb8f64878c52683b4eca444260f2fb2faa8261c534c369290fcb46b367e098043785362e5bfc48e021b4169c6afd8c41a26496cb2f1d6b65c1810688392a1f6af182f0c74c0e88ead3e6069698da9e5fe18231c73d0e092be33204f643bbf8dc7f3026c4c30cbe690824013066a90d2eceb0a293b75c2ff979c1f2c50526eabaed6b62d2e4507def7fef61f224a3d91bed8e35c360625dee1e8f104227b4244cf8cd7e5236d1f26d184c1f607651f4f",
  hash: "89c6a86f",
});

type CreatorReply = { readonly hi: string; readonly en: string };

const unseal = (): CreatorReply => {
  const key = new TextEncoder().encode("vds_salu_2026_rk");
  const len = SEALED.hex.length / 2;
  const out = new Uint8Array(len);
  let fnv = 2166136261;
  for (let i = 0; i < len; i++) {
    const b = parseInt(SEALED.hex.slice(i * 2, i * 2 + 2), 16) ^ key[i % key.length] ^ ((i * 31) & 0xff);
    out[i] = b;
    fnv ^= b;
    fnv = Math.imul(fnv, 16777619) >>> 0;
  }
  if (fnv.toString(16) !== SEALED.hash) {
    throw new Error("Creator attribution integrity check failed");
  }
  return Object.freeze(JSON.parse(new TextDecoder().decode(out)) as CreatorReply);
};

export const CREATOR_REPLY: CreatorReply = unseal();
