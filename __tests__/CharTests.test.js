import { mage } from "../src/js/CharList.js";
import { fighter } from "../src/js/CharList.js";
import { monster } from "../src/js/CharList.js";

describe('fighter', () => {
  
  test('Should return an object state when called', () => {
    const result = fighter("result");
    
    expect(result).toEqual(expect.objectContaining({
      name: "result",
      health: 100,
      stamina: 100
    }));
    expect(typeof result.fight).toBe("function");
  });

  test('Should return exp and lvl values', () => {
    const result = fighter("result");
    expect(result).toEqual(expect.objectContaining({
      exp: 0,
      lvl: 1
    }));
  });
});

describe('canFight', () => {
  test('Should decrease fighter stamina by one and return dmgNumber', () => {
    const fighterTest = fighter("Test");
    fighterTest.fight(5);
    expect(fighterTest.stamina).toEqual(99);
    expect(fighterTest.fight(5)).toEqual(5);
  });
});

describe('mage', () => {
  test('Should return a mage object state when called', () => {
    const result = mage("result");

    expect(result).toEqual(expect.objectContaining({
      name: "result",
      health: 100,
      mana: 100
    }));
    expect(typeof result.cast).toBe("function");
  });

  test('Should return exp and lvl values', () => {
    const result = mage("result");
    expect(result).toEqual(expect.objectContaining({
      exp: 0,
      lvl: 1
    }));
  });
});

describe('canCast', () => {

  test('Should subtract spell cost from mana', () => {
    const mageTest = mage("mageTest");
    mageTest.cast("Fireball", 15, 10);
    expect(mageTest.mana).toEqual(90);
  });

  test('Should return array with dmgNum and string', () => {
    const mageTest = mage("mageTest");
    const result = mageTest.cast("Fireball", 15);
    expect(result[0]).toEqual(15);
    expect(typeof result[1]).toEqual("string");
  });
});

describe('monster', () => {
  
  test('Should return a monster object when called', () => {
    const result = monster("result", 40, 10);

    expect(result).toEqual(expect.objectContaining({
      name: "result",
      health: 40,
      expValue: 10
    }));
    expect(typeof result.attack).toBe("function");
  });
});

describe('monsterAttack', () => {

  test('Should return a dmgNum', () => {
    const monsterTest = monster("monsterTest");
    const result = monsterTest.attack(15);
    expect(result).toEqual(15);
  });
});