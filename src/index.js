const canCast = (state) => ({
  cast: (spell, dmgNum) => {
    state.mana--;
    return [dmgNum, `${state.name} casts ${spell} it deals ${dmgNum} damage!`];
  }
})

const canFight = (state) => ({
  fight: (dmgNum) => {
    state.stamina--;
    return dmgNum;
  }
})

export const fighter = (name) => {
  let state = {
    name,
    health: 100,
    stamina: 100
  }
  return Object.assign(state, canFight(state));
}

export const mage = (name) => {
  let state = {
    name,
    health: 100,
    mana: 100
  }
  return Object.assign(state, canCast(state));
}

