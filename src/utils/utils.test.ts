import * as utils from './utils';

it('returns the capitalized words', () => {
  const words = 'starry night';
  const capitalizedWords = 'Starry Night';
  expect(utils.capitalize(words)).toEqual(capitalizedWords);
});

it('returns the correct color', () => {
  const weatherId = 300;
  const color = 'wi-blue';
  expect(utils.getIconColor(weatherId)).toEqual(color);
});
