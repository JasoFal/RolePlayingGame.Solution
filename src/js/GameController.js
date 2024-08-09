import { mageLvlPath, fighterLvlPath } from "./CharLvlPath";

// All combat turns go through here
export function combat(array, skill) {
  const player = array[0];
  const enemy = array[1];
  enemy.health -= skill.damage;
  charResourceCost(player, skill);
  player.health -= enemy.attack(8);
}

// Function controlling levelling
export function lvlUp(array) {
  const player = array[0];
  const enemy = array[1];
  player.exp += enemy.expValue;
  if (player.exp >= 100) {
    player.exp -= 100;
    player.lvl++;
    if (player.class == "mage") {
      mageLvlPath(player);
    } else if (player.class == "fighter") {
      fighterLvlPath(player);
    }
  } else {
    return;
  }
}

function charResourceCost(char, skill) {
  if (char.class == "mage") {
    char.mana -= skill.manaCost;
  } else if (char.class == "fighter") {
    char.stamina -= skill.staminaCost;
  }
}
