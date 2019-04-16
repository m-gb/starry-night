import React, { Component } from 'react';
import { capitalize, getDayName, getMonthName, getIconColor } from '../utils/utils';

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
    catch (err) {
      throw new Error(`There was an issue parsing the weather data: ${err.message}`);
    }
  }

  render() {
    const weatherData: WeatherData = this.parseWeatherData(this.props.currentWeatherData);
    return (
      <div>
        <h5 className="text-center py-3">{weatherData.location}</h5>
        <div className="row pb-5">
          <div className="col-lg-3 text-center">
            <div className="pt-5">
              <h3>{weatherData.day}</h3>
              <h3>{weatherData.date}</h3>
            </div>
          </div>
          <div className="col-lg-3 text-center">
            <i className={`current-img wi ${getIconColor(weatherData.weatherId)} wi-owm-${weatherData.weatherId}`} />
            <h5 className="pt-5">{capitalize(weatherData.weatherDesc)}</h5>
          </div>
          <div className="col-lg-3 text-center">
            <h1 className="pt-5"> {weatherData.temp}<i className="wi wi-degrees" /></h1>
          </div>
          <div className="col-lg-3">
            <div className="pt-4">
              <p className="my-3" title="Humidity"><i className="wi wi-blue wi-humidity" /> {weatherData.humidity}%</p>
              <p className="my-3" title="Pressure"><i className="wi wi-yellow wi-barometer" /> {weatherData.pressure} hPa</p>
              <p className="my-3" title="Wind Speed"><i className="wi wi-gray wi-strong-wind" /> {weatherData.windSpeed} {this.props.windSpeedUnit}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentWeather;
