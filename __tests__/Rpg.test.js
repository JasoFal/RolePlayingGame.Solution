import { canCast } from "../src";
import { canFight } from "../src/index.js";
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
// describe('canCast', () => {

//   test('Should return string with spell name and dmgNum', () => {
//     const result = canCast("fireball", "15");
//     expect(result).toEqual()
//   });
// });