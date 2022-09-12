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
  spellName: string | null;
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
  spellDescription: string | null;
  spellDescriptionTwo: string | null;
  spellDescriptionThree: string | null;
  spellDescriptionFour: string | null;
  spellDomainSpell: boolean;
  spellPrepared: number;
  id: 1;
};
