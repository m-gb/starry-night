import React from 'react';
import { create } from 'react-test-renderer';
import CurrentWeather from './CurrentWeather';
import { parseWeatherData } from './CurrentWeather';

const unparsedWeatherData = {
  name: 'Haifa',
  sys: { country: 'IL' },
  dt: (Date.now() / 1000),
  weather: [{
    id: 1,
    description: 'clear sky'
  }],
  main: {
    humidity: 50,
    pressure: 1000,
    temp: 20
  },
  wind: { speed: 5.1 }
};

it('parses the weather data', () => {
  const parsedWeatherData = {
    location: 'Haifa, IL',
    weatherId: 1,
    weatherDesc: 'clear sky',
    day: 'Friday',
    date: '19 April 2019',
    temp: 20,
    pressure: 1000,
    humidity: 50,
    windSpeed: 5.1
  };
  expect(parseWeatherData(unparsedWeatherData)).toEqual(parsedWeatherData);
});

it('matches the snapshot', () => {
  const testWindSpeed = '5.1 m/s';
  const component = create(<CurrentWeather currentWeatherData={unparsedWeatherData} windSpeedUnit={testWindSpeed} />);
  expect(component.toJSON()).toMatchSnapshot();
});
