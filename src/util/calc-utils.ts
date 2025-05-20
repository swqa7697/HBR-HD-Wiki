export interface CalcFieldsOD {
  hit: number;
  hitCountUp: number;
  fixedOD: number; // %
  numTarget: 1 | 2 | 3;
  earrings: 0 | 10 | 12 | 15; // %
  isBaboo: boolean;
  isResisted: boolean;
  otherBuff: number; // %
  odRate: number; // %
}

export const createDefaultODFields = (): CalcFieldsOD => ({
  hit: 0,
  hitCountUp: 0,
  fixedOD: 0, // %
  numTarget: 1,
  earrings: 15, // %
  isBaboo: false,
  isResisted: false,
  otherBuff: 0, // %
  odRate: 100, // %
});

export const calcOD = (input: CalcFieldsOD): number => {
  const {
    hit,
    hitCountUp,
    fixedOD,
    numTarget,
    earrings,
    isBaboo,
    isResisted,
    otherBuff,
    odRate,
  } = input;

  const multiplier =
    1 +
    // 耳环
    (hit === 0 || earrings === 0
      ? 0
      : hit > 9
      ? earrings / 100
      : ((hit - 1) / 9) * (earrings / 100 - 0.05) + 0.05) +
    // 其他增益
    (isBaboo ? 0.2 : 0) +
    otherBuff / 100;

  const gainedByHit = isResisted
    ? 0
    : (hit + hitCountUp) *
      (Math.floor(multiplier * odRate * 2.5) / 100) *
      numTarget;

  const gainedByFixed = Math.floor(fixedOD * multiplier * 100) / 100;

  return Math.floor((gainedByHit + gainedByFixed) * 0.4 * 1000) / 1000;
};
