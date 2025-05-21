export interface CalcFieldsOD {
  hit: number;
  hitCountUp: number;
  fixedOD: number; // % float allowed
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
  fixedOD: 0, // % float allowed
  numTarget: 1,
  earrings: 15, // %
  isBaboo: false,
  isResisted: false,
  otherBuff: 0, // %
  odRate: 100, // %
});

export const calcOD = (input: CalcFieldsOD): CalcResult => {
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
      (Math.floor(2.5 * multiplier * odRate) / 100) *
      numTarget;

  const gainedByFixed = Math.floor(fixedOD * multiplier * 100) / 100;

  const odPercentage = gainedByHit + gainedByFixed;

  return {
    resValue: Math.floor(odPercentage * 0.4 * 1000) / 1000,
    resPercentage: Math.floor(odPercentage * 100) / 100,
  };
};

export interface CalcFieldsDR {
  skillDr: number; // float allowed
  hit: number;
  hitCountUp_sm: number;
  hitCountUp_lg: number;
  drBoost: 0 | 30 | 50 | 80 | 100 | 130; // %
  earrings: 0 | 10 | 12 | 15; // %
  necklace: 0 | 10; // %
  targetDr: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; // %
}

export const createDefaultDRFields = (): CalcFieldsDR => ({
  skillDr: 0,
  hit: 0,
  hitCountUp_sm: 0,
  hitCountUp_lg: 0,
  drBoost: 0,
  earrings: 15,
  necklace: 0,
  targetDr: 5,
});

export const calcDR = (input: CalcFieldsDR): CalcResult => {
  const {
    skillDr,
    hit,
    hitCountUp_sm,
    hitCountUp_lg,
    drBoost,
    earrings,
    necklace,
    targetDr,
  } = input;

  const multiplier =
    1 +
    // 耳环
    (hit === 0 || earrings === 0
      ? 0
      : hit > 9
      ? earrings / 100
      : 0.05 + ((earrings / 100 - 0.05) * (hit - 1)) / 9) +
    // 其他
    necklace / 100 +
    drBoost / 100;

  const hitCountUpDr = 0.1 * hitCountUp_sm + 0.4 * hitCountUp_lg;

  const resDr = skillDr * (1 + hitCountUpDr) * multiplier;

  return {
    resValue: Math.floor(resDr * 1000) / 1000,
    resPercentage: Math.floor(resDr * targetDr * 100) / 100,
  };
};

export interface CalcResult {
  resValue: number;
  resPercentage: number;
}
