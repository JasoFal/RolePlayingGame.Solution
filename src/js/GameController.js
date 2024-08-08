import { mageLvlPath, fighterLvlPath } from "./CharLvlPath";

// All combat turns go through here
export function combat(array, skillName, dmgNum, resourceCost) {
  const player = array[0];
  const enemy = array[1];
  enemy.health -= player.cast(skillName, dmgNum, resourceCost)[0];
  player.health -= enemy.attack(8);
}

// Function controlling levelling
export function lvlUp(array) {
  const player = array[0];
  const enemy = array[1];
  enemy.expValue += player.exp;
  if (player.exp >= 100) {
    player.exp -= 100;
    player.lvl++;
    if (player.name == "Mage") {
      mageLvlPath(player);
    } else if (player.name == "Fighter") {
      fighterLvlPath(player);
    }
  } else {
    return;
  }
}
