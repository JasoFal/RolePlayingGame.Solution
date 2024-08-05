import { mage } from "../src/index.js"
import { fighter } from "../src/index.js";

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
  test("Should return a mage object state when called", () => {
    const result = mage("result");

    expect(result).toEqual(expect.objectContaining({
      name: "result",
      health: 100,
      mana: 100
    }));
    expect(typeof result.cast).toBe("function");
  });
});

describe('canCast', () => {

  test('Should decrease mage mana by 1', () => {
    const mageTest = mage("mageTest");
    mageTest.cast("Fireball", 15);
    expect(mageTest.mana).toEqual(99);
  });

  test('Should return array with dmgNum and string', () => {
    const mageTest = mage("mageTest");
    const result = mageTest.cast("Fireball", 15);
    expect(result[0]).toEqual(15);
    expect(typeof result[1]).toEqual("string");
  });
});