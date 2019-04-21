import React from 'react';
import { create } from 'react-test-renderer';
import ForecastWeather from './ForecastWeather';
import { parseForecastData, sortForecastData } from './ForecastWeather';

const date = Date.now() / 1000;

const unsortedWeatherData = {
  list: [
    {
      dt: date,
      dt_txt: '2019-04-19 12:00:00',
      weather: [{
        id: 1,
        description: 'scattered clouds'
      }],
      main: {
        temp: 18
      }
    },
    {
      dt: new Date(date * 1000).setHours(18) / 1000,
      dt_txt: '2019-04-19 18:00:00',
      weather: [{
        id: 1,
        description: 'scattered clouds'
      }],
      main: {
        temp: 16
      }
    },
    {
      dt: new Date(date * 1000).setDate(new Date(date * 1000).getDate() + 1) / 1000,
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
      dt: new Date(date * 1000).setDate(new Date(date * 1000).getDate() + 2) / 1000,
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
      dt: new Date(date * 1000).setDate(new Date(date * 1000).getDate() + 3) / 1000,
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
      dt: new Date(date * 1000).setDate(new Date(date * 1000).getDate() + 4) / 1000,
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
      dt: new Date(date * 1000).setDate(new Date(date * 1000).getDate() + 1) / 1000,
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
      dt: new Date(date * 1000).setDate(new Date(date * 1000).getDate() + 2) / 1000,
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
      dt: new Date(date * 1000).setDate(new Date(date * 1000).getDate() + 3) / 1000,
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
      dt: new Date(date * 1000).setDate(new Date(date * 1000).getDate() + 4) / 1000,
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
    dt: date,
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
