const canCast = (state) => ({
  cast: (spell, dmgNum) => {
    `${state.name} casts ${spell} it deals ${dmgNum} damage!`;
    state.mana--;
    return dmgNum;
  }
})

export const canFight = (state) => ({
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

const mage = (name) => {
  let state = {
    name,
    health: 100,
    mana: 100
  }
  return Object.assign(state, canCast(state));
}