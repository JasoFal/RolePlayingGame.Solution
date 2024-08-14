import { combat, lvlUp } from "../src/js/gameController";
import { fighter, mage } from "../src/js/charList";
import GameBoard from "../src/js/gameSave";
import { monster } from "../src/js/monsterList";

describe('combat', () => {
  const testObject = new GameBoard();

  beforeEach(() => {
    const testMage = mage("test");
    const testMonster = monster("test2", 40, 5);
    testObject.playerArray.push(testMage);
    testObject.enemyArray.push(testMonster);
    combat(testObject, testMage.fireBolt);
  });

  test('Decreases monster health based on spell cast', () => {
    expect(testObject.enemyArray[0].health).toEqual(28);
  });

  test('Decreases player health based on monster attack', () => {
    expect(testObject.playerArray[0].health).toEqual(92);
  });
});

describe('lvlUp', () => {
  test('Should return if not over exp cap', () => {
    const testMage = mage("test");
    const testMonster = monster("test2", 40, 0);
    const testObject = new GameBoard();
    testObject.playerArray.push(testMage);
    testObject.enemyArray.push(testMonster);
    testMage.exp = 60;
    lvlUp(testMage, testMonster);
    expect(testMage.lvl).toEqual(1);
  });

  test('Increases player lvl and decreases exp if exp is over exp cap', () => {
    const testMage = mage("test");
    const testMonster = monster("test2", 40, 0);
    const testObject = new GameBoard();
    testObject.playerArray.push(testMage);
    testObject.enemyArray.push(testMonster);
    testMage.exp = 100;
    lvlUp(testMage, testMonster);
    expect(testMage.lvl).toEqual(2);
    expect(testMage.exp).toEqual(0);
  }); 

  test('If player is a mage follow mage level up path', () => {
    const testMage = mage("test");
    const testMonster = monster("test2", 40, 0);
    const testObject = new GameBoard();
    testObject.playerArray.push(testMage);
    testObject.enemyArray.push(testMonster);
    testMage.exp = 100;
    lvlUp(testMage, testMonster);
    expect(testMage.int).toEqual(7);
  });

  test('If player is a fighter follow fighter level up path', () => {
    const testFighter = fighter("test");
    const testMonster = monster("test2", 40, 0);
    const testObject = new GameBoard();
    testObject.playerArray.push(testFighter);
    testObject.enemyArray.push(testMonster);
    testFighter.exp = 100;
    lvlUp(testFighter, testMonster);
    expect(testFighter.str).toEqual(7);
  });
});