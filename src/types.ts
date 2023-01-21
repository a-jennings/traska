export type CharacterData = {
  name: string;
  player: string;
  classes: Array<Class>;
  race: string;
  alignment: string;
  deity: string | null;
  size: string;
  age: number;
  gender: string;
  height: string;
  weight: string;
  eyes: string;
  hair: string;
  skin: string;
};

export type CharacterAbilitiesList = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

export type CharacterStatistics = {
  hpMax: number;
  hpCurrent: number;
  ac: number;
  acTouch: number;
  acFF: number;
  speed: number;
  initiative: number;
  savingThrows: SavingThrows;
  baseAttackBonus: number;
  grapple: number;
  spellResistance: number;
  damageReduction: number;
};

export type SavingThrows = {
  fortitude: number;
  reflex: number;
  will: number;
};

export type Class = {
  class: string;
  level: number;
};

export type Skill = {
  id: number;
  name: string;
  keyAbility: string;
  ranks: number;
  miscModifier: number;
  classSkill: boolean;
  requiresTraining: boolean;
};

export type Item = {
  id: number;
  name: string;
  weight: number;
};

export type SpellData = {
  spellName: string;
  spellSchool: string | null;
  spellDescriptor: string | null;
  spellLevel: number;
  spellComponents: string | null;
  spellCastingTime: string | null;
  spellRange: string | null;
  spellDuration: string | null;
  spellTarget: string | null;
  spellSavingThrow: string | null;
  spellResistance: string | null;
  spellArea: string | null;
  spellEffect: string | null;
  spellDescription: string;
  spellDescriptionTwo: string;
  spellDescriptionThree: string;
  spellDescriptionFour: string;
  spellDomainSpell: boolean;
  spellSummary: string | null;
  spellPrepared: number;
  spellMaterial: string;
  id: 1;
};

export type AttackData = {
  name: string;
  bonus: number;
  damage: string;
  critical: string;
  range: string;
  type: string;
  notes: string;
  id: number;
};

export type CurrencyData = {
  copper: number;
  silver: number;
  gold: number;
  platinum: number;
};

export type GearData = {
  id: number;
  name: string;
  type: string;
  bonus: number;
  maxDex: string;
  checkPenalty: string;
  spellFailure: string;
  speed: string;
  weight: number;
  properties: string;
};

export type FeatData = {
  id: number;
  name: string;
  description: string;
};

export type LanguageData = {
  id: number;
  name: string;
};

export type SpecialAbilityData = {
  id: number;
  name: string;
  description: string;
  currentUses: number;
  maxUses: number;
};

export type SpellSlotData = {
  zero: number;
  zeroBonus: number;
  zeroDomain: number;
  one: number;
  oneBonus: number;
  oneDomain: number;
  two: number;
  twoBonus: number;
  twoDomain: number;
  three: number;
  threeBonus: number;
  threeDomain: number;
  four: number;
  fourBonus: number;
  fourDomain: number;
  five: number;
  fiveBonus: number;
  fiveDomain: number;
  six: number;
  sixBonus: number;
  sixDomain: number;
  seven: number;
  sevenBonus: number;
  sevenDomain: number;
  eight: number;
  eightBonus: number;
  eightDomain: number;
  nine: number;
  nineBonus: number;
  nineDomain: number;
};

export type NoteData = {
  id?: number;
  title: string;
  text: string;
  date: Date;
  editDate: Date | null;
};

export type LogInfo = {
  dateTime: Date;
  logText: string;
  id: number;
};

export type ContactInfo = {
  name: string;
  description: string;
  text: string;
  id: number;
  race: string | null;
  gender: string | null;
};
