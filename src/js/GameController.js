import { mageLvlPath, fighterLvlPath } from "./charLvlPath";
import { mageSpellList, fighterSkillList } from "./charList";

// All combat turns go through here
export function combat(gameState, skill) {
  const player = gameState.playerArray[0];
  const enemy = gameState.enemyArray[0];
  const enemyAttack = enemyAttackChoice(enemy);
  enemy.hp -= skill.damage;
  if (player.class == "mage") {
    if (player.mana < player.maxMana) {
      player.mana += skill.manaRestore;
    }
    if (player.barrier < player.maxMana) {
      player.barrier += skill.buffAmount;
    }
  } else if (player.class == "fighter") {
    if (player.stamina < player.maxStamina) {
      player.stamina += skill.staminaRestore;
    }
    if (player.shield < player.maxHealth) {
      player.shield += skill.buffAmount;
    }
  }
  charResourceCost(player, skill);
  enemyDamage(player, enemyAttack.atk);
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
    console.log(player);
    player.mana -= skill.manaCost;
  } else if (player.class == "fighter") {
    player.stamina -= skill.staminaCost;
  }
}

function enemyDamage(player, enemyDmg) {
  console.log(enemyDmg);
  if (player.shield > 0) {
    if (player.shield < enemyDmg) {
      const attackDiff = enemyDmg - player.shield;
      player.shield = 0;
      player.health -= attackDiff;
    } else {
      player.shield -= enemyDmg;
    }
  } else if (player.barrier > 0) {
    if (player.barrier < enemyDmg) {
      const attackDiff = enemyDmg - player.barrier;
      player.barrier = 0;
      player.health -= attackDiff;
    } else {
      player.barrier -= enemyDmg;
    }
  } else {
    player.health -= enemyDmg;
  }
}

function enemyAttackChoice(enemy) {
  if (enemy.nameFunction == "giantspider") {
    console.log(enemy.bite);
    return enemy.bite;
  } else if (enemy.nameFunction == "goblin") {
    return enemy.knifeAttack;
  }
}