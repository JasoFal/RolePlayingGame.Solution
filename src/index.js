import "./css/styles.css";
import { mage } from "./js/CharList";
import { fighter } from "./js/CharList";
import { monster } from "./js/CharList";
import { combat } from "./js/GameController";

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

function defeatEvent(array) {
  array.length = 0;
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

function onVictoryOrDefeat(array) {
  if (array[0].health <= 0) {
    defeatEvent(array);
  } else {
    if (array[1].health <= 0) {
      enemyUpdate(array);
      victoryEvent();
      array.pop();
    } else {
      enemyUpdate(array);
      playerUpdate(array);
    }
  }
}

// Creates skill buttons
function createSkill(skillName, array, dmgNum, resourceCost) {
  const skillButton = document.createElement("button");
  skillButton.addEventListener("click", () => {
    if (array.length != 1) {
      combat(array, skillName, dmgNum, resourceCost);
      onVictoryOrDefeat(array);
    } else {
      return;
    }
  });
  skillButton.id = `${skillName}`;
  skillButton.append(`${skillName}`);
  document.getElementById("class-ability-list").append(skillButton);
  return skillButton;
}

// Updates Ui elements during combat
function enemyUpdate(array) {
  const enemy = array[1];
  document.getElementById("monster-name").innerText = `${enemy.name}`;
  document.getElementById("monster-hp").innerText = `Hp: ${enemy.health}`;
}

function playerUpdate(array) {
  const player = array[0];
  document.getElementById("char-name").innerText = `${player.name}`;
  document.getElementById("char-hp").innerText = `Hp: ${player.health}`;
  if (player.name == "Mage") {
    document.getElementById("char-resource").innerText = `Mana: ${player.mana}`;
  } else {
    document.getElementById("char-resource").innerText = `Stam: ${player.stamina}`;
  }
}

window.onload = function() {
  let objArray = [];

  document.getElementById("mage-select").onclick = function() {
    const newMage = mage("Mage");
    objArray.push(newMage);
    controlPlayerUiEle();
    playerUpdate(objArray);
    createSkill("fireball", objArray, 15, 10);
  };

  document.getElementById("fighter-select").onclick = function() {
    const newFighter = fighter("Fighter");
    objArray.push(newFighter);
    controlPlayerUiEle();
    playerUpdate(objArray);
  };

  document.getElementById("monster-spawn").onclick = function() {
    const newMonster = monster("Giant Enemy Spider", 40);
    objArray.push(newMonster);
    controlMonsterUiEle();
    document.getElementById("monster-name").innerText = `${newMonster.name}`;
    document.getElementById("monster-hp").innerText = `Hp: ${newMonster.health}`;
  };
};

