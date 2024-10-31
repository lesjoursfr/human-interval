import { strictEqual } from "assert";
import humanInterval from "../src/index";

type UnitsType = {
  second: number;
  minute: number;
  hour: number;
  day: number;
  week: number;
  month: number;
  year: number;
};
function populateUnits(): UnitsType {
  const populatedUnits = {} as UnitsType;

  populatedUnits.second = 1000;
  populatedUnits.minute = populatedUnits.second * 60;
  populatedUnits.hour = populatedUnits.minute * 60;
  populatedUnits.day = populatedUnits.hour * 24;
  populatedUnits.week = populatedUnits.day * 7;
  populatedUnits.month = populatedUnits.day * 30;
  populatedUnits.year = populatedUnits.day * 365;

  return populatedUnits;
}
const units = Object.freeze(populateUnits());
const timeUnits = Object.freeze(["second", "minute", "hour", "day", "week", "month", "year"] as Array<keyof UnitsType>);
const englishNumbers = Object.freeze(["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]);

describe("Invalid values", function () {
  it("Returns undefined when given undefined", function () {
    strictEqual(humanInterval(undefined), undefined);
  });

  it("Returns null when given null", function () {
    strictEqual(humanInterval(null), null);
  });

  it("Returns empty string when given empty string", function () {
    strictEqual(humanInterval(""), "");
  });

  it("Returns NaN when given unknown string", function () {
    strictEqual(humanInterval("foobar"), Number.NaN);
  });
});

describe("Single values", function () {
  it("Returns the number when given a number", function () {
    strictEqual(humanInterval(5000), 5000);
  });

  it("Understands numbers", function () {
    strictEqual(humanInterval("2 seconds"), 2 * units.second);
  });

  it("Understands decimals", function () {
    strictEqual(humanInterval("2.5 seconds"), 2.5 * units.second);
  });

  it("Understands long decimals", function () {
    strictEqual(humanInterval("2.5555 seconds"), 2.5555 * units.second);
  });
});

describe("Understands time base units without numbers", function () {
  // i.e. "second === 1000"
  timeUnits.forEach((unit) => {
    it(`Understands "${unit}" without number`, function () {
      strictEqual(humanInterval(unit), units[unit]);
    });
  });
});

describe("Understands time base units in singular", function () {
  // i.e. "1 second === 1000"
  timeUnits.forEach((unit) => {
    it(`Understands "1 ${unit}"`, function () {
      strictEqual(humanInterval("1 " + unit), units[unit]);
    });
  });
});

describe("Understands time base units in plural", function () {
  // i.e. "2 seconds === 2000"
  timeUnits.forEach((unit) => {
    it(`Understands ${unit}s in plural`, function () {
      strictEqual(humanInterval(`2 ${unit}s`), 2 * units[unit]);
    });
  });
});

describe("Understands time base units in decimals values", function () {
  // i.e. "1.5 seconds === 1500"
  timeUnits.forEach((unit) => {
    it(`Understands ${unit}s in decimals`, function () {
      strictEqual(humanInterval(`1.5 ${unit}s`), 1.5 * units[unit]);
    });
  });
});

describe("English numbers", function () {
  // i.e. "one second === 1000"
  englishNumbers.forEach((number, i) => {
    it(`Understands english number ${number}`, function () {
      strictEqual(humanInterval(`${number} seconds`), (i + 1) * units.second);
    });
  });
});

describe("Understands negative numbers", function () {
  // i.e. "-2 seconds === -2000"
  timeUnits.forEach((unit) => {
    it(`Understands negative ${unit}s`, function () {
      strictEqual(humanInterval(`-2 ${unit}s`), -2 * units[unit]);
    });
  });
});

describe("Mixed", function () {
  it("Understands mixed units", function () {
    strictEqual(humanInterval("3 minutes and 30 seconds"), 3 * units.minute + 30 * units.second);
  });

  it("Understands mixed time expressions with plurals", function () {
    strictEqual(humanInterval("three minutes and 30 seconds"), 3 * units.minute + 30 * units.second);
    strictEqual(humanInterval("three minutes 30 seconds"), 3 * units.minute + 30 * units.second);
  });

  it("Understands mixed time expressions with singulars", function () {
    strictEqual(humanInterval("one minute and 1 second"), units.minute + units.second);
    strictEqual(humanInterval("one minute 1 second"), units.minute + units.second);
  });

  it("Understands 2 digit english numbers", function () {
    strictEqual(humanInterval("thirty three seconds"), 33 * units.second);
  });

  it("Understands mix units + multi digit english numbers", function () {
    strictEqual(humanInterval("hundred and three seconds and twelve minutes"), 103 * units.second + 12 * units.minute);
  });

  it("Understands hyphenated numbers", function () {
    strictEqual(humanInterval("three hundred and twenty-five seconds"), 325 * units.second);
  });
});
