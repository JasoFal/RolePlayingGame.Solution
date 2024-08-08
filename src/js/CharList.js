const canCast = (state) => ({
  cast: (spell, dmgNum, manaCost) => {
    state.mana -= manaCost;
    return [dmgNum, `${state.name} casts ${spell} it deals ${dmgNum} damage!`];
  }
});

const canFight = (state) => ({
  fight: (dmgNum) => {
    state.stamina--;
    return dmgNum;
  }
});

const monsterAttack = (state) => ({
  attack: (dmg) => {
    console.log(state);
    return dmg;
  }
});

export const fighter = (name) => {
  let state = {
    name,
    health: 100,
    stamina: 100,
    lvl: 1,
    exp: 0,
    int: 1,
    str: 5,
    end: 3
  };
  return Object.assign(state, canFight(state));
};

export const mage = (name) => {
  let state = {
    name,
    health: 100,
    mana: 100,
    lvl: 1,
    exp: 0,
    int: 5,
    str: 1,
    end: 2
  };
  return Object.assign(state, canCast(state));
};

export const monster = (name, hp, exp) => {
  let state = {
    name,
    health: hp,
    expValue: exp
  };
  return Object.assign(state, monsterAttack(state));
};
