import "./css/styles.css";
import { mage, fighter } from "./js/charList";
import { combat, lvlUp } from "./js/gameController";
import GameBoard from "./js/gameSave";
import { enemySpawner } from "./js/monsterList";

// Functions that control Ui elements on game start or combat start
function controlPlayerUiEle() {
  document.getElementById("char-info").classList.remove("hidden");
  document.getElementById("control-buttons").classList.remove("hidden");
  document.getElementById("char-select").classList.add("hidden");
  document.getElementById("monster-spawn").classList.remove("hidden");
}

function controlMonsterUiEle() {
  document.getElementById("monster-info").classList.remove("hidden");
  document.getElementById("monster-spawn").classList.add("hidden");
}

// Functions controlling Ui elements on victory or defeat
function victoryEvent() {
  document.getElementById("monster-info").classList.add("hidden");
  document.getElementById("monster-spawn").classList.remove("hidden");
  console.log("You Win!");
}

function defeatEvent(gameState) {
  gameState.playerArray.length = 0;
  gameState.enemyArray.length = 0;
  document.getElementById("monster-info").classList.add("hidden");
  document.getElementById("monster-spawn").classList.add("hidden");
  document.getElementById("char-info").classList.add("hidden");
  document.getElementById("control-buttons").classList.add("hidden");
  document.getElementById("char-select").classList.remove("hidden");
  const skillList = document.getElementById("class-ability-list");
  while (skillList.firstChild) {
    skillList.removeChild(skillList.lastChild);
  }
}

function onVictoryOrDefeat(gameState) {
  const player = gameState.playerArray[0];
  const enemy = gameState.enemyArray;
  if (player.health <= 0) {
    defeatEvent(gameState);
  } else {
    enemy.forEach(element => {
      console.log(element);
      if (element.hp <= 0) {
        let lastLvl = player.lvl;
        lvlUp(player, element);
        if (lastLvl < player.lvl) {
          createSkillButtons(gameState);
        }
        playerUpdate(player);
        enemyUpdate(element);
        victoryEvent();
        enemy.splice(element);
      } else {
        enemyUpdate(element);
        playerUpdate(player);
      }
    });
  }
}

// Creates skill buttons
function createSkill(gameState, skill) {
  const skillButton = document.createElement("button");
  skillButton.addEventListener("click", () => {
    if (gameState.enemyArray.length >= 1) {
      combat(gameState, skill);
      onVictoryOrDefeat(gameState);
    } else {
      return;
    }
  });
  skillButton.id = `${skill.nameId}`;
  skillButton.append(`${skill.namePlayer}`);
  document.getElementById("class-ability-list").append(skillButton);
  return skillButton;
}

function createSkillButtons(gameState) {
  const player = gameState.playerArray[0];
  const skillList = document.getElementById("class-ability-list");
  while (skillList.firstChild) {
    skillList.removeChild(skillList.lastChild);
  }
  if (player.class == "mage") {
    createSkill(gameState, player.fireBolt);
    createSkill(gameState, player.castBarrier);
    createSkill(gameState, player.meditate);
  } else if (player.class == "fighter") {
    createSkill(gameState, player.quickSlash);
    createSkill(gameState, player.raiseShield);
    createSkill(gameState, player.rest);
  }
}

// Updates Ui elements during combat
function enemyUpdate(enemy) {
  document.getElementById("monster-name").innerText = `${enemy.name}`;
  document.getElementById("monster-hp").innerText = `Hp: ${enemy.hp}`;
  console.log(enemy, "enemyUpdate");
}

function playerUpdate(player) {
  document.getElementById("char-name").innerText = `${player.name}`;
  document.getElementById("char-hp").innerText = `Hp: ${player.health}`;
  document.getElementById("char-lvl").innerText = `Lvl: ${player.lvl}`;
  document.getElementById("char-exp").innerText = `Exp: ${player.exp}`;
  document.getElementById("char-int").innerText = `Intelligence: ${player.int}`;
  document.getElementById("char-str").innerText = `Strength: ${player.str}`;
  document.getElementById("char-end").innerText = `Endurance: ${player.end}`;
  if (player.class == "mage") {
    document.getElementById("char-resource").innerText = `Mana: ${player.mana}`;
    document.getElementById("char-def").innerText = `Barrier: ${player.barrier}`;
  } else if (player.class == "fighter") {
    document.getElementById("char-resource").innerText = `Stam: ${player.stamina}`;
    document.getElementById("char-def").innerText = `Shield: ${player.shield}`;
  }
}

window.onload = function() {
  const gameBoard = new GameBoard();

  document.getElementById("mage-select").onclick = function() {
    const newMage = mage("Mage");
    gameBoard.playerArray.push(newMage);
    controlPlayerUiEle();
    playerUpdate(newMage);
    createSkillButtons(gameBoard);
    console.log(newMage);
  };

  document.getElementById("fighter-select").onclick = function() {
    const newFighter = fighter("Fighter");
    gameBoard.playerArray.push(newFighter);
    controlPlayerUiEle();
    playerUpdate(newFighter);
    createSkillButtons(gameBoard);
  };

  document.getElementById("monster-spawn").onclick = function() {
    gameBoard.enemyArray.push(enemySpawner(gameBoard.playerArray[0].lvl));
    const enemy = gameBoard.enemyArray[0];
    console.log(enemy);
    controlMonsterUiEle();
    document.getElementById("monster-name").innerText = `${enemy.name}`;
    document.getElementById("monster-hp").innerText = `Hp: ${enemy.hp}`;
  };
};