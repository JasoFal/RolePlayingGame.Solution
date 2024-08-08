// All combat turns go through here
export function combat(array, skillName, dmgNum, resourceCost) {
  const player = array[0];
  const enemy = array[1];
  enemy.health -= player.cast(skillName, dmgNum, resourceCost)[0];
  player.health -= enemy.attack(8);
}

// Function controlling levelling

