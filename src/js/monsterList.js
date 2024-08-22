const goblin = () => {
  let state = {
    name: "Goblin",
    nameFunction: "goblin",
    hp: 30,
    expValue: 20,
    atk: 12,
    init: 7
  };
  return Object.assign(state, goblinAttackList(state));
};

const goblinAttackList = (state) => {
  const goblinAttacks = {
    knifeAttack: {
      atk: state.atk
    }
  };
  return goblinAttacks;
};

const giantSpider = () => {
  let state = {
    name: "Giant Spider",
    nameFunction: "giantspider",
    hp: 40,
    expValue: 12,
    atk: 5,
    init: 5
  };
  return Object.assign(state, giantSpiderAttackList(state));
};

const giantSpiderAttackList = (state) => {
  const giantSpiderAttacks = {
    bite: {
      atk: state.atk
    }
  };
  return giantSpiderAttacks;
};

export function enemySpawner(playerLvl) {
  const rngRoll = Math.floor(Math.random() * 10);
  if (playerLvl <= 5) {
    if (rngRoll < 5) {
      const newGiantSpider = giantSpider();
      return newGiantSpider;
    } else {
      const newGoblin = goblin();
      return newGoblin;
    }
  } else {
    const newGiantSpider = giantSpider();
    return newGiantSpider;
  }
}