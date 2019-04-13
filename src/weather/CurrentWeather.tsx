import React, { Component } from 'react';
import { getDayName, getMonthName } from '../utils/utils';

interface CurrentWeatherProps {
  currentWeatherData: WeatherData,
  windSpeedUnit: string
}

export interface WeatherData {
  location: string,
  weatherId: number,
  weatherDesc: string,
  day: string,
  date: string,
  temp: number,
  pressure: number,
  humidity: number,
  windSpeed: number
}

class CurrentWeather extends Component<CurrentWeatherProps, {}> {
  parseWeatherData(data: any): WeatherData {
    try {
      const location = `${data.name}, ${data.sys.country}`;
      const weatherId = data.weather[0].id;
      const weatherDesc = data.weather[0].description;
      const day = getDayName(data.dt * 1000);
      const rawDate = new Date(data.dt * 1000);
      const date = `${rawDate.getDate()} ${getMonthName(data.dt * 1000)} ${rawDate.getFullYear()}`;
      const temp = Math.round(data.main.temp);
      const pressure = data.main.pressure;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      return {
        location,
        weatherId,
        weatherDesc,
        day,
        date,
        temp,
        pressure,
        humidity,
        windSpeed
      };
    }
    catch(err) {
      throw new Error(`There was an issue parsing the weather data: ${err.message}`);
    }
  }

  render() {
    const weatherData: WeatherData = this.parseWeatherData(this.props.currentWeatherData);
    return (
      <div>
        <h3>Current weather:</h3>
        <p>{weatherData.location}</p>
        <p>{weatherData.day}, {weatherData.date}</p>
        <p className={`wi wi-owm-${weatherData.weatherId}`}> {weatherData.temp}<i className="wi wi-degrees" /></p>
        <p className="wi wi-humidity"> {weatherData.humidity}%</p>
        <p className="wi wi-barometer"> {weatherData.pressure} hPa</p>
        <p className="wi wi-strong-wind"> {weatherData.windSpeed} {this.props.windSpeedUnit}</p>
      </div>
    );
  }
}

export default CurrentWeather;
