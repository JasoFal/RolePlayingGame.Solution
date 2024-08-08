import { combat } from "../src/js/GameController";
import { mage } from "../src/js/CharList";
import { monster } from "../src/js/CharList";

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