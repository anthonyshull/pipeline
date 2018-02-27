import React from 'react';
import { chain, compose, fromMaybe,
         Just, map, max, min, Maybe,
         Nothing, parseInt, pipe,
         reduce, sequence, sum, toString } from 'sanctuary';

// mIntList :: [Maybe int] -> Maybe [int]
const mIntList = maybes => sequence(Maybe, maybes);

// safeParseIntArray :: [str] -> Maybe [int]
const safeParseIntArray = compose(mIntList, map(parseInt(10)));

// length :: ['a] -> int
const length = arr => arr.length;

// isFinite :: num -> Maybe num
const isFinite = num => {
  return (num === Infinity || num === - Infinity) ? Nothing : Just(num);
};

// safeLength :: [str] -> Maybe int
const safeLength = pipe([
  safeParseIntArray,
  map(length)
]);

// safeMin :: [str] -> Maybe int
const safeMin = pipe([
  safeParseIntArray,
  map(reduce(min, Infinity))
]);

// safeMax :: [str] -> Maybe int
const safeMax = pipe([
  safeParseIntArray,
  map(reduce(max, -Infinity))
]);

// safeIntDisplay :: ([str] -> Maybe int) -> ([str] -> Maybe str)
const safeIntDisplay = fn => {
  return pipe([
    fn,
    chain(isFinite),
    map(toString)
  ]);
}

// floatDisplay :: float -> float
const floatDisplay = float => float.toFixed(2);

// safeAvg :: [ints] -> Maybe float
const safeAvg = ints => {
  return length(ints) === 0 ? Nothing : Just(sum(ints) / ints.length);
};

// safeAvg :: [str] -> Maybe str
const safeAvgDisplay = pipe([
  safeParseIntArray,
  chain(safeAvg),
  map(floatDisplay),
  map(toString)
]);

export default function Pure(props) {
  return (
    <table>
      <tr>
        <th>Count</th>
        <th>Min</th>
        <th>Max</th>
        <th>Avg</th>
      </tr>
      <tr>
        <td>{fromMaybe('---', safeIntDisplay(safeLength)(props.ints))}</td>
        <td>{fromMaybe('---', safeIntDisplay(safeMin)(props.ints))}</td>
        <td>{fromMaybe('---', safeIntDisplay(safeMax)(props.ints))}</td>
        <td>{fromMaybe('---', safeAvgDisplay(props.ints))}</td>
      </tr>
    </table>
  );
}
