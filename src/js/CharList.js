const baseChar = () => {
  let baseState = {
    health: 100,
    lvl: 1,
    exp: 0
  };
  return baseState;
};

export const fighter = (name) => {
  let state = {
    name,
    class: "fighter",
    stamina: 100,
    shield: 0,
    int: 1,
    str: 5,
    end: 3
  };
  return Object.assign(state, fighterSkillList(state), baseChar());
};

export const mage = (name) => {
  let state = {
    name,
    class: "mage",
    mana: 100,
    barrier: 0,
    int: 5,
    str: 1,
    end: 2
  };
  return Object.assign(state, mageSpellList(state), baseChar());
};

export const mageSpellList = (state) => {
  const mageSpells = {

    fireBolt: {
      namePlayer: "Firebolt",
      nameFunction: "firebolt",
      nameId: "#firebolt",
      damage: Math.floor(15/2 + state.int),
      manaCost: 10,
      damageType: "fire",
      healthCost: 0,
      manaRestore: 0,
      healthRestore: 0,
      buffName: 0,
      buffAmount: 0
    },

    castBarrier: {
      namePlayer: "Barrier",
      nameFunction: "barrier",
      nameId: "#barrier",
      damage: 0,
      manaCost: 20,
      healthCost: 0,
      manaRestore: 0,
      healthRestore: 0,
      buffName: "buffBarrier",
      buffAmount: Math.floor(40/2 + state.int),
    },

    meditate: {
      namePlayer: "Meditate",
      nameFunction: "meditate",
      nameId: "#meditate",
      damage: 0,
      manaCost: 0,
      healthCost: 0,
      manaRestore: Math.floor(30/2 + state.int),
      healthRestore: 0,
      buffName: 0,
      buffAmount: 0
    }
  };
  return mageSpells;
};

export const fighterSkillList = (state) => {
  console.log(state);
  const fighterSkills = {

    quickSlash: {
      namePlayer: "Quick Slash",
      nameFunction: "quickslash",
      nameId: "#quickslash",
      damage: Math.floor(15/2 + state.str),
      staminaCost: 10,
      damageType: "physical",
      healthCost: 0,
      staminaRestore: 0,
      healthRestore: 0,
      buffName: 0,
      buffAmount: 0
    },

    raiseShield: {
      namePlayer: "Shield",
      nameFunction: "shield",
      nameId: "#shield",
      damage: 0,
      staminaCost: 20,
      healthCost: 0,
      staminaRestore: 0,
      healthRestore: 0,
      buffName: "buffShield",
      buffAmount: Math.floor(40/2 + state.str),
    },

    rest: {
      namePlayer: "Rest",
      nameFunction: "rest",
      nameId: "#rest",
      damage: 0,
      staminaCost: 0,
      healthCost: 0,
      staminaRestore: Math.floor(30/2 + state.end),
      healthRestore: 0,
      buffName: 0,
      buffAmount: 0
    }
  };
  return fighterSkills;
};