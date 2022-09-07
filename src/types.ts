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

export type CharacterStats = {
  stength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  hpMax: number;
  hpCurrent: number;
  ac: number;
  acTouch: number;
  acFF: number;
  speed: number;
  initiative: number;
  savingThrows: SavingThrows;
  baseAttackBonus: number;
  grapper: number;
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
  abilityModifier: number;
  ranks: number;
  miscModifier: number;
  classSkills: boolean;
  requiresTraining: boolean;
};
