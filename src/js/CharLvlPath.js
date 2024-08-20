// Lvl up paths for characters
export function mageLvlPath(char) {
  if (char.lvl >= 1 && char.lvl <= 100) {
    char.maxHealth += 18;
    char.maxMana += 32;
    char.int += 2;
    char.str += 1;
    char.end += 1;
    char.health = char.maxHealth;
    char.mana = char.maxMana
  } else {
    return char.exp = 100;
  }
}

export function fighterLvlPath(char) {
  if (char.lvl >= 1 && char.lvl <= 100) {
    char.maxHealth += 22;
    char.maxStamina += 12;
    char.int += 1;
    char.str += 2;
    char.end += 2;
    char.health = char.maxHealth;
    char.stamina = char.maxStamina;
  } else {
    return char.exp = 100;
  }
}