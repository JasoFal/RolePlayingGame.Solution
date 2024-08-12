import { mageLvlPath, fighterLvlPath } from "./charLvlPath";
import { mageSpellList, fighterSkillList } from "./charList";

// All combat turns go through here
export function combat(gameState, skill) {
  const player = gameState.playerArray[0];
  const enemy = gameState.enemyArray[0];
  enemy.health -= skill.damage;
  if (player.class == "mage") {
    player.mana += skill.manaRestore;
    player.barrier += skill.buffAmount;
  } else if (player.class == "fighter") {
    player.stamina += skill.staminaRestore;
    player.shield += skill.buffAmount;
  }
  charResourceCost(player, skill);
  enemyDamage(player, enemy);
}

// Function controlling levelling
export function lvlUp(player, enemy) {
  player.exp += enemy.expValue;
  console.log(player);
  if (player.exp >= 100) {
    player.exp -= 100;
    player.lvl++;
    if (player.class == "mage") {
      mageLvlPath(player);
      Object.assign(player, mageSpellList(player));
    } else if (player.class == "fighter") {
      fighterLvlPath(player);
      Object.assign(player, fighterSkillList(player));
    }
  } else {
    return;
  }
}

function charResourceCost(player, skill) {
  if (player.class == "mage") {
    player.mana -= skill.manaCost;
  } else if (player.class == "fighter") {
    player.stamina -= skill.staminaCost;
  }
}

function enemyDamage(player, enemy) {
  const enemyAttack = enemy.attack(8);
  if (player.shield != 0) {
    player.shield -= enemyAttack;
  } else if (player.barrier != 0) {
    player.barrier -= enemyAttack;
  } else {
    player.health -= enemyAttack;
  }
}