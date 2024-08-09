const monsterAttack = () => ({
  attack: (dmg) => {
    return dmg;
  }
});

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
    int: 1,
    str: 5,
    end: 3
  };
  return Object.assign(state, baseChar());
};

export const mage = (name) => {
  let state = {
    name,
    class: "mage",
    mana: 100,
    int: 5,
    str: 1,
    end: 2
  };
  return Object.assign(state, mageSpellList(state), baseChar());
};

export const monster = (name, hp, exp) => {
  let state = {
    name,
    health: hp,
    expValue: exp
  };
  return Object.assign(state, monsterAttack());
};

const mageSpellList = (state) => {
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
  };
  return mageSpells;
};