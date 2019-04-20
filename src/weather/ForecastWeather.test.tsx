import React from 'react';
import { create } from 'react-test-renderer';
import ForecastWeather from './ForecastWeather';
import { parseForecastData, sortForecastData } from './ForecastWeather';

const date = 1555664754176;

const unsortedWeatherData = {
  list: [
    {
      dt: new Date(date).setHours(new Date(date).getHours() + 9),
      dt_txt: '2019-04-19 18:00:00',
      weather: [{
        id: 1,
        description: 'scattered clouds'
      }],
      main: {
        temp: 18
      }
    },
    {
      dt: new Date(date).setDate(new Date(date).getDate() + 1),
      dt_txt: '2019-04-20 12:00:00',
      weather: [{
        id: 2,
        description: 'light rain'
      }],
      main: {
        temp: 17
      }
    },
    {
      dt: new Date(date).setDate(new Date(date).getDate() + 2),
      dt_txt: '2019-04-21 12:00:00',
      weather: [{
        id: 2,
        description: 'light rain'
      }],
      main: {
        temp: 15
      }
    },
    {
      dt: new Date(date).setDate(new Date(date).getDate() + 3),
      dt_txt: '2019-04-22 12:00:00',
      weather: [{
        id: 3,
        description: 'clear sky'
      }],
      main: {
        temp: 17
      }
    },
    {
      dt: new Date(date).setDate(new Date(date).getDate() + 4),
      dt_txt: '2019-04-23 12:00:00',
      weather: [{
        id: 3,
        description: 'clear sky'
      }],
      main: {
        temp: 18
      }
    }
  ]
};

it('sorts the weather data', () => {
  const sortedWeatherData = [
    {
      dt: new Date(date).setDate(new Date(date).getDate() + 1),
      dt_txt: '2019-04-20 12:00:00',
      weather: [{
        id: 2,
        description: 'light rain'
      }],
      main: {
        temp: 17
      }
    },
    {
      dt: new Date(date).setDate(new Date(date).getDate() + 2),
      dt_txt: '2019-04-21 12:00:00',
      weather: [{
        id: 2,
        description: 'light rain'
      }],
      main: {
        temp: 15
      }
    },
    {
      dt: new Date(date).setDate(new Date(date).getDate() + 3),
      dt_txt: '2019-04-22 12:00:00',
      weather: [{
        id: 3,
        description: 'clear sky'
      }],
      main: {
        temp: 17
      }
    },
    {
      dt: new Date(date).setDate(new Date(date).getDate() + 4),
      dt_txt: '2019-04-23 12:00:00',
      weather: [{
        id: 3,
        description: 'clear sky'
      }],
      main: {
        temp: 18
      }
    }
  ];
  expect(sortForecastData(unsortedWeatherData)).toEqual(sortedWeatherData);
});

it('parses the weather data', () => {
  const unparsedWeatherData = {
    dt: (Date.now() / 1000),
    weather: [{
      id: 1,
      description: 'scattered clouds'
    }],
    main: {
      temp: 18
    }
  };
  const parsedWeatherData = {
    weatherId: 1,
    weatherDesc: 'scattered clouds',
    day: 'Friday',
    temp: 18
  };
  expect(parseForecastData(unparsedWeatherData)).toEqual(parsedWeatherData);
});

it('matches the snapshot', () => {
  const component = create(<ForecastWeather forecastWeatherData={unsortedWeatherData} />);
  expect(component.toJSON()).toMatchSnapshot();
});
