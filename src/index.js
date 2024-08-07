import "./css/styles.css";

const canCast = (state) => ({
  cast: (spell, dmgNum, manaCost) => {
    state.mana -= manaCost;
    return [dmgNum, `${state.name} casts ${spell} it deals ${dmgNum} damage!`];
  }
});

const canFight = (state) => ({
  fight: (dmgNum) => {
    state.stamina--;
    return dmgNum;
  }
});

const monsterAttack = (state) => ({
  attack: (dmg) => {
    console.log(state);
    return dmg;
  }
});

export const fighter = (name) => {
  let state = {
    name,
    health: 100,
    stamina: 100
  };
  return Object.assign(state, canFight(state));
};

export const mage = (name) => {
  let state = {
    name,
    health: 100,
    mana: 100
  };
  return Object.assign(state, canCast(state));
};

export const monster = (name, hp) => {
  let state = {
    name,
    health: hp
  };
  return Object.assign(state, monsterAttack(state));
};

// All combat turns go through here
function combat(array, skill, dmgNum, resourceCost) {
  const player = array[0];
  const enemy = array[1];
  enemy.health -= player.cast(skill, dmgNum, resourceCost)[0];
  player.health -= enemy.attack(8);
  // if (player.health <= 0) {

  // }
  if (enemy.health <= 0) {
    enemyUpdate(array);
    victoryEvent();
    array.pop();
  } else {
    enemyUpdate(array);
    playerUpdate(array);
  }
}

function controlPlayerUiEle() {
  document.getElementById("char-info").classList.remove("hidden");
  document.getElementById("control-buttons").classList.remove("hidden");
  document.getElementById("char-select").classList.add("hidden");
}

function controlMonsterUiEle() {
  document.getElementById("monster-info").classList.remove("hidden");
  document.getElementById("monster-spawn").classList.add("hidden");
}

function victoryEvent() {
  document.getElementById("monster-info").classList.add("hidden");
  document.getElementById("monster-spawn").classList.remove("hidden");
  console.log("You Win!");
}

function createSkill(name, array, dmgNum, resourceCost) {
  const skillButton = document.createElement("button");
  skillButton.addEventListener("click", () => {
    if (array.length != 1) {
      combat(array, name, dmgNum, resourceCost);
    } else {
      return;
    }
  });
  skillButton.id = `${name}`;
  skillButton.append(`${name}`);
  document.getElementById("class-ability-list").append(skillButton);
  return skillButton;
}

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

