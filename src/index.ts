import numbered from "numbered";

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
const UNITS = Object.freeze(populateUnits());
const regexp = /(second|minute|hour|day|week|month|year)s?/;

export default function humanInterval(time: null): null;
export default function humanInterval(time: undefined): undefined;
export default function humanInterval(time: number): number;
export default function humanInterval(time: string): string | number;
export default function humanInterval(time: string | number | null | undefined): string | number | null | undefined {
  if (!time || typeof time === "number") {
    return time;
  }

  let result = Number.NaN;

  time = time.replace(/([^a-z\d.-]|and)+/g, " ");

  for (;;) {
    const match = time.match(regexp);
    if (!match) {
      return result;
    }

    const matchedNumber = time.slice(0, match.index).trim();
    const unit = UNITS[match[1] as keyof typeof UNITS];
    let number = 1;
    if (matchedNumber.length > 0) {
      number = Number.parseFloat(matchedNumber);
      if (Number.isNaN(number)) {
        number = numbered.parse(matchedNumber);
      }
    }

    if (Number.isNaN(result)) {
      result = 0;
    }

    result += number * unit;
    time = time.slice(match.index! + match[0].length);
  }
}
