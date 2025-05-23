const BECH32_ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";

function bech32Polymod(values: number[]): number {
  const GENERATORS = [
    0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3,
  ];
  let chk = 1;
  for (let p = 0; p < values.length; ++p) {
    let top = chk >> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ values[p];
    for (let i = 0; i < 5; i++) {
      if ((top >> i) & 1) {
        chk ^= GENERATORS[i];
      }
    }
  }
  return chk;
}

export function bech32Decode(bechString: string) {
  const lower = bechString.toLowerCase();
  const sepIndex = lower.lastIndexOf("1");
  if (sepIndex === -1) throw new Error("Missing separator in Bech32 string");

  const hrp = lower.substring(0, sepIndex);
  const dataPart = lower.substring(sepIndex + 1);
  const data = dataPart.split("").map((c) => {
    const index = BECH32_ALPHABET.indexOf(c);
    if (index === -1) throw new Error(`Invalid Bech32 char: ${c}`);
    return index;
  });

  if (bech32Polymod([...hrpExpand(hrp), ...data]) !== 1) {
    throw new Error("Invalid checksum in Bech32");
  }

  return { hrp, data: data.slice(0, -6) }; // remove checksum
}

function hrpExpand(hrp: string): number[] {
  const result = [];
  for (let i = 0; i < hrp.length; ++i) result.push(hrp.charCodeAt(i) >> 5);
  result.push(0);
  for (let i = 0; i < hrp.length; ++i) result.push(hrp.charCodeAt(i) & 31);
  return result;
}

export function convertBits(
  data: number[],
  fromBits: number,
  toBits: number,
  pad = true,
): Uint8Array {
  let acc = 0,
    bits = 0,
    result = [];
  const maxv = (1 << toBits) - 1;
  for (const value of data) {
    if (value < 0 || value >> fromBits !== 0) throw new Error("Invalid value");
    acc = (acc << fromBits) | value;
    bits += fromBits;
    while (bits >= toBits) {
      bits -= toBits;
      result.push((acc >> bits) & maxv);
    }
  }
  if (pad && bits > 0) {
    result.push((acc << (toBits - bits)) & maxv);
  } else if (!pad && (bits >= fromBits || (acc << (toBits - bits)) & maxv)) {
    throw new Error("Invalid padding");
  }
  return Uint8Array.from(result);
}
