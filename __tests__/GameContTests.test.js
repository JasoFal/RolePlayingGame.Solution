import { combat, lvlUp } from "../src/js/GameController";
import { fighter, mage, monster } from "../src/js/CharList";

describe('combat', () => {
  let testArray;

  beforeEach(() => {
    const testMage = mage("test");
    const testMonster = monster("test2", 40, 5);
    testArray = [testMage, testMonster];
    combat(testArray, "fireball", 15, 10);
  });

  test('Decreases monster health based on spell cast', () => {
    expect(testArray[1].health).toEqual(25);
  });

  test('Decreases player health based on monster attack', () => {
    expect(testArray[0].health).toEqual(92);
  });
});

describe('lvlUp', () => {
  let testArray;

  beforeEach(() => {
    const testMage = mage("test");
    const testMonster = monster("test2", 40, 0);
    testArray = [testMage, testMonster];
  });

  test('Should return if not over exp cap', () => {
    const player = testArray[0];
    player.exp = 60;
    lvlUp(testArray);
    expect(player.lvl).toEqual(1);
  });

  test('Increases player lvl and decreases exp if exp is over exp cap', () => {
    const player = testArray[0]
    player.exp = 100;
    console.log(testArray[0].exp);
    lvlUp(testArray);
    expect(player.lvl).toEqual(2);
    expect(player.exp).toEqual(0);
  }); 
});