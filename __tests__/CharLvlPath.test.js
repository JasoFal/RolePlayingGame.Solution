import { mageLvlPath, fighterLvlPath } from "../src/js/charLvlPath";
import { mage, fighter } from "../src/js/charList";

describe('mageLvlPath', () => {
  test('Should increase mage stats if lvl up between lvl 1 and 100', () => {
    const testMage = mage("test");
    mageLvlPath(testMage);
    expect(testMage.int).toEqual(7);
    expect(testMage.str).toEqual(2);
    expect(testMage.end).toEqual(3);
  });
  test('Should do nothing if lvl has reached lvl cap exp should stay at max cap', () => {
    const testMage = mage("test");
    testMage.lvl = 100;
    testMage.exp = 100;
    mageLvlPath(testMage);
    expect(testMage.lvl).toEqual(100);
    expect(testMage.exp).toEqual(100);
  });
});

describe('fighterLvlPath', () => {
  test('Should increase fighter stats if lvl up between 1 and 100', () => {
    const testFighter = fighter("test");
    fighterLvlPath(testFighter);
    expect(testFighter.int).toEqual(2);
    expect(testFighter.str).toEqual(7);
    expect(testFighter.end).toEqual(4);
  });
  test('Should do nothing if lvl has reached lvl cap exp should stay at max cap', () => {
    const testFighter = fighter("test");
    testFighter.lvl = 100;
    testFighter.exp = 100;
    fighterLvlPath(testFighter);
    expect(testFighter.lvl).toEqual(100);
    expect(testFighter.exp).toEqual(100);
  });
});