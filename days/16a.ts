import input from "./16input";
// const input = "A0016C880162017C3686B18A3D4780";

type Bits = (0 | 1)[];

type OperatorType = 0 | 1 | 2 | 3 | 5 | 6 | 7;
type LiteralPacket = { version: number, type: 4, value: number, bitsConsumed: number };
type OperatorPacket = { version: number, type: OperatorType, length: number, subPackets: Packet[], bitsConsumed: number };
type Packet = LiteralPacket | OperatorPacket;

export default function() {
  const bits: Bits = input.trim().split("").flatMap(char => parseInt(char, 16).toString(2).padStart(4, "0").split("")).map(char => char === "1" ? 1 : 0);
  const outerPacket = readPacket(bits, 0);
  console.log(versionSum(outerPacket));
}

function versionSum(packet: Packet): number {
  if (packet.type === 4) {
    return packet.version;
  } else {
    return packet.subPackets.map(sub => versionSum(sub)).reduce((a,b) => a+b, packet.version);
  }
}

function readPacket(bits: Bits, startIdx: number): Packet {
  let cursor = startIdx;

  const version = readPacketVersion(bits, cursor);
  cursor += version.bitsConsumed;

  const type = readTypeId(bits, cursor);
  cursor += type.bitsConsumed;

  if (type.typeId === 4) {
    const packet = readLiteralPacket(bits, cursor, version.version, type.typeId);
    cursor += packet.bitsConsumed;
    return {
      ...packet,
      bitsConsumed: version.bitsConsumed + type.bitsConsumed + packet.bitsConsumed
    };
  } else {
    const packet = readOperatorPacket(bits, cursor, version.version, type.typeId as OperatorType);
    cursor += packet.bitsConsumed;
    return {
      ...packet,
      bitsConsumed: version.bitsConsumed + type.bitsConsumed + packet.bitsConsumed
    };
  }
}

function readPacketVersion(bits: Bits, startIdx: number): { version: number, bitsConsumed: 3 } {
  const version = readValue(bits, startIdx, 3);
  return { version, bitsConsumed: 3 };
}

function readTypeId(bits: Bits, startIdx: number): { typeId: number, bitsConsumed: 3 } {
  const typeId = readValue(bits, startIdx, 3);
  return { typeId, bitsConsumed: 3 };
}

function readOperatorPacket(bits: Bits, startIdx: number, version: number, type: OperatorType): OperatorPacket {
  const lengthType: 0 | 1 = bits[startIdx];
  const data = lengthType === 0 ? readOperatorPacketBitLength(bits, startIdx + 1, version, type) : readOperatorPacketPacketLength(bits, startIdx + 1, version, type);
  return { ...data, bitsConsumed: data.bitsConsumed + 1 };
}

function readOperatorPacketBitLength(bits: Bits, startIdx: number, version: number, type: OperatorType): OperatorPacket {
  const bitLength = readValue(bits, startIdx, 15);

  const packets: Array<ReturnType<typeof readPacket>> = [];

  let consumedBits: number = 0;
  while (consumedBits < bitLength) {
    const packet = readPacket(bits, startIdx + 15 + consumedBits);
    packets.push(packet);
    consumedBits += packet.bitsConsumed;
  }

  return { subPackets: packets, bitsConsumed: 15 + consumedBits, version, type, length: bitLength };
}

function readOperatorPacketPacketLength(bits: Bits, startIdx: number, version: number, type: OperatorType): OperatorPacket {
  const packetCount = readValue(bits, startIdx, 11);

  const packets: Array<ReturnType<typeof readPacket>> = [];
  let cursor = startIdx + 11;
  for (let i = 0; i < packetCount; i++) {
    const packet = readPacket(bits, cursor);
    cursor += packet.bitsConsumed;
    packets.push(packet);
  }

  return { subPackets: packets, bitsConsumed: cursor - startIdx, version, type, length: packetCount };
}

function readLiteralPacket(bits: Bits, startIdx: number, version, type): LiteralPacket {
  let cursor = startIdx;
  const dataPackets: Array<ReturnType<typeof readLiteralData>> = [];

  while (true) {
    const data = readLiteralData(bits, cursor);
    dataPackets.push(data);
    cursor += data.bitsConsumed;
    if (data.end) break;
  }

  const dataBits = dataPackets.map(packet => packet.data).reduce((a,b) => a.concat(b));

  const value = readFullValue(dataBits);
  const bitsConsumed: number = dataPackets.map(packet => packet.bitsConsumed).reduce((a,b) => a+b, 0);
  return { value, bitsConsumed, version, type }
}

function readLiteralData(bits: Bits, startIdx: number): { data: Bits, end: boolean, bitsConsumed: 5 } {
  const data = bits.slice(startIdx + 1, startIdx + 5);
  const end = bits[startIdx] === 0;
  return { data, end, bitsConsumed: 5 };
}

function readValue(bits: Bits, startIdx: number, length: number): number {
  const binary = bits.slice(startIdx, startIdx + length).map(num => num === 1 ? "1" : "0").join("");
  return parseInt(binary, 2);
}

function readFullValue(bits: Bits): number {
  return readValue(bits, 0, bits.length);
}
