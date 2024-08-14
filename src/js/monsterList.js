const monsterAttack = () => ({
  attack: (dmg) => {
    return dmg;
  }
});

export const monster = (name, hp, exp) => {
  let state = {
    name,
    health: hp,
    expValue: exp
  };
  return Object.assign(state, monsterAttack());
};