import "./css/styles.css";

const canCast = (state) => ({
  cast: (spell, dmgNum) => {
    state.mana--;
    return [dmgNum, `${state.name} casts ${spell} it deals ${dmgNum} damage!`];
  }
})

const canFight = (state) => ({
  fight: (dmgNum) => {
    state.stamina--;
    return dmgNum;
  }
})

export const fighter = (name) => {
  let state = {
    name,
    health: 100,
    stamina: 100
  }
  return Object.assign(state, canFight(state));
}

export const mage = (name) => {
  let state = {
    name,
    health: 100,
    mana: 100
  }
  return Object.assign(state, canCast(state));
}

const monsterAttack = () => ({
  attack: (dmg) => {
    return dmg;
  }
});

export const monster = (name, hp) => {
  let state = {
    name,
    health: hp
  }
  return Object.assign(state, monsterAttack());
}

function controlPlayerUiEle() {
  document.getElementById("char-info").classList.remove("hidden");
  document.getElementById("control-buttons").classList.remove("hidden");
  document.getElementById("char-select").classList.add("hidden");
}

window.onload = function() {
  document.getElementById("mage-select").onclick = function() {
    const newMage = mage("Mage");
    controlPlayerUiEle();
    document.getElementById("char-name").innerText = `${newMage.name}`;
    document.getElementById("char-hp").innerText = `${newMage.health}`;
    document.getElementById("char-resource").innerText = `${newMage.mana}`;
    document.getElementById("char-select").classList.add("hidden");
  };

  document.getElementById("fighter-select").onclick = function() {
    const newFighter = fighter("Fighter");
    controlPlayerUiEle();
    document.getElementById("char-info").classList.remove("hidden");
    document.getElementById("control-buttons").classList.remove("hidden");
    document.getElementById("char-name").innerText = `${newFighter.name}`;
    document.getElementById("char-hp").innerText = `${newFighter.health}`;
    document.getElementById("char-resource").innerText = `${newFighter.stamina}`;
  };

  // document.getElementById("monster-spawn").onclick = function() {
  //   const newMonster = monster("Giant Enemy Spider");
  //   document.getElementById("monster-name").innerText = `${newMonster.name}`;
  //   document.getElementById("monster-hp").innerText = `${newMonster.health}`;
  //   document.getElementById("monster-spawn").classList.remove("hidden");
  // };
};

