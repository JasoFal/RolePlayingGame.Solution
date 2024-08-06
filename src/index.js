import "./css/styles.css";

const canCast = (state) => ({
  cast: (spell, dmgNum) => {
    state.mana--;
    return [dmgNum, `${state.name} casts ${spell} it deals ${dmgNum} damage!`];
  }
});

const canFight = (state) => ({
  fight: (dmgNum) => {
    state.stamina--;
    return dmgNum;
  }
});

const monsterAttack = () => ({
  attack: (dmg) => {
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
  return Object.assign(state, monsterAttack());
};

function combat(array) {
  const player = array[0];
  player.cast("fireball", 10);
  console.log(player);
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

function createSkill(name, objArray) {
  const skillButton = document.createElement("button");
  skillButton.addEventListener("click", () => {
    combat(objArray);
  });
  skillButton.id = `${name}`;
  skillButton.append(`${name}`);
  document.getElementById("class-ability-list").append(skillButton);
  return skillButton;
}

function mageUpdate(objArray) {
  const mage = objArray[0];
  document.getElementById("char-name").innerText = `${mage.name}`;
  document.getElementById("char-hp").innerText = `Hp: ${mage.health}`;
  document.getElementById("char-resource").innerText = `Mana: ${mage.mana}`;
}

function fighterUpdate(objArray) {
  const fighter = objArray[0];
  document.getElementById("char-name").innerText = `${fighter.name}`;
  document.getElementById("char-hp").innerText = `Hp: ${fighter.health}`;
  document.getElementById("char-resource").innerText = `Stam: ${fighter.stamina}`;
}

window.onload = function() {
  let objArray = [];

  document.getElementById("mage-select").onclick = function() {
    const newMage = mage("Mage");
    objArray.push(newMage);
    controlPlayerUiEle();
    mageUpdate(objArray);
    document.getElementById("char-select").classList.add("hidden");
    createSkill("fireball", objArray);
  };

  document.getElementById("fighter-select").onclick = function() {
    const newFighter = fighter("Fighter");
    objArray.push(newFighter);
    controlPlayerUiEle();
    fighterUpdate(objArray);
  };

  document.getElementById("monster-spawn").onclick = function() {
    const newMonster = monster("Giant Enemy Spider", 40);
    objArray.push(newMonster);
    controlMonsterUiEle();
    document.getElementById("monster-name").innerText = `${newMonster.name}`;
    document.getElementById("monster-hp").innerText = `Hp: ${newMonster.health}`;
  };
};

