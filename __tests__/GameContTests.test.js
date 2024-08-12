import { combat, lvlUp } from "../src/js/gameController";
import { fighter, mage, monster } from "../src/js/charList";

describe('combat', () => {
  let testArray;

  beforeEach(() => {
    const testMage = mage("test");
    const testMonster = monster("test2", 40, 5);
    testArray = [testMage, testMonster];
    combat(testArray, testMage.fireBolt);
  });

  test('Decreases monster health based on spell cast', () => {
    expect(testArray[1].health).toEqual(28);
  });

  test('Decreases player health based on monster attack', () => {
    expect(testArray[0].health).toEqual(92);
  });
});

describe('lvlUp', () => {
  test('Should return if not over exp cap', () => {
    const testMage = mage("test");
    const testMonster = monster("test2", 40, 0);
    let testArray = [testMage, testMonster];
    const player = testArray[0];
    player.exp = 60;
    lvlUp(testArray);
    expect(player.lvl).toEqual(1);
  });

  test('Increases player lvl and decreases exp if exp is over exp cap', () => {
    const testMage = mage("test");
    const testMonster = monster("test2", 40, 0);
    let testArray = [testMage, testMonster];
    const player = testArray[0]
    player.exp = 100;
    lvlUp(testArray);
    expect(player.lvl).toEqual(2);
    expect(player.exp).toEqual(0);
  }); 

  test('If player is a mage follow mage level up path', () => {
    const testMage = mage("test");
    const testMonster = monster("test2", 40, 0);
    let testArray = [testMage, testMonster];
    const player = testArray[0]
    player.exp = 100;
    lvlUp(testArray);
    expect(player.int).toEqual(7);
  });

  test('If player is a fighter follow fighter level up path', () => {
    const testFighter = fighter("test");
    const testMonster = monster("test2", 40, 0);
    let testArray = [testFighter, testMonster];
    const player = testArray[0]
    player.exp = 100;
    lvlUp(testArray);
    expect(player.str).toEqual(7);
  });
});