import { monster } from "../src/js/monsterList";

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