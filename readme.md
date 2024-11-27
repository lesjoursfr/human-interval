[![npm version](https://badge.fury.io/js/@lesjoursfr%2Fhuman-interval.svg)](https://badge.fury.io/js/@lesjoursfr%2Fhuman-interval)
[![QC Checks](https://github.com/lesjoursfr/human-interval/actions/workflows/quality-control.yml/badge.svg)](https://github.com/lesjoursfr/human-interval/actions/workflows/quality-control.yml)

# @lesjoursfr/human-interval

Human-readable interval parser for Javascript.
Converts words written in English to numbers by using [node-numbered](https://github.com/blakeembrey/node-numbered).

**This is a fork of [@rschmukler project human-interval](https://github.com/agenda/human-interval)**

## Installation

### On the server or in the browser:

```bash
npm install @lesjoursfr/human-interval
```

## Example usage

```js
humanInterval("three minutes");
```

## More sophisticated examples

Human Interval understands all of the following examples:

```js
humanInterval("minute");
humanInterval("one minute");
humanInterval("1.5 minutes");
humanInterval("3 days and 4 hours");
humanInterval("3 days, 4 hours and 36 seconds");
humanInterval("4 months, 3 days, 5 hours and forty-five seconds");
```

## The full list

### Units

Supports the following units in the plural and singular forms:

- `seconds`
- `minutes`
- `hours`
- `days`
- `weeks`
- `months` — assumes 30 days
- `years` — assumes 365 days

### Wordy numbers

Supports numbers being written out in English words.

```js
humanInterval("five minutes");
```

### Hyphenated numbers

Supports hyphenated numbers.

```js
humanInterval("twenty-five seconds");
```

### Negative numbers

Supports negative numbers if the time starts with a `-` symbol immediately followed by a number.

```js
humanInterval("-2 minutes");
```

## API

### humanInterval(str)

Return the `number` of milliseconds from a `str` interval.

## Tests

To run the tests, you'll need Node.js:

```bash
npm install
npm run test
```
