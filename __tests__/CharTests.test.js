import { mage } from "../src/js/CharList.js";
import { fighter } from "../src/js/CharList.js";
import { monster } from "../src/js/CharList.js";

describe('fighter', () => {
  
  test('Should return an object state when called', () => {
    const result = fighter("result");
    
    expect(result).toEqual(expect.objectContaining({
      name: "result",
      class: "fighter",
      health: 100,
      stamina: 100
    }));
  });

  test('Should return exp and lvl values', () => {
    const result = fighter("result");
    expect(result).toEqual(expect.objectContaining({
      exp: 0,
      lvl: 1
    }));
  });

  test('Should return int, str, and end values', () => {
    const result = fighter("result");
    expect(result).toEqual(expect.objectContaining({
      int: 1,
      str: 5,
      end: 3
    }));
  });
});

describe('mage', () => {
  test('Should return a mage object state when called', () => {
    const result = mage("result");

    expect(result).toEqual(expect.objectContaining({
      name: "result",
      class: "mage",
      health: 100,
      mana: 100
    }));
  });

  test('Should return exp and lvl values', () => {
    const result = mage("result");
    expect(result).toEqual(expect.objectContaining({
      exp: 0,
      lvl: 1
    }));
  });

  test('Should return int, str, and end values', () => {
    const result = mage("result");
    expect(result).toEqual(expect.objectContaining({
      int: 5,
      str: 1,
      end: 2
    }));
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