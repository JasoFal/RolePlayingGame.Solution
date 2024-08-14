// Lvl up paths for characters
export function mageLvlPath(char) {
  if (char.lvl >= 1 && char.lvl <= 100) {
    char.health += 40;
    char.mana += 50;
    char.int += 2;
    char.str += 1;
    char.end += 1;
  } else {
    return char.exp = 100;
  }
}

export function fighterLvlPath(char) {
  if (char.lvl >= 1 && char.lvl <= 100) {
    char.health += 60;
    char.stamina += 30;
    char.int += 1;
    char.str += 2;
    char.end += 1;
  } else {
    return char.exp = 100;
  }
}