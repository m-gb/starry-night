import React, { Component } from 'react';
import { WeatherData } from './App';

interface CurrentWeatherProps {
  currentWeatherData?: WeatherData,
  unit: string
}

class CurrentWeather extends Component<CurrentWeatherProps, {}> {
  render() {
    const hasWeatherData = this.props.currentWeatherData;
    const windSpeedUnit = (this.props.unit == 'C') ? 'm/s' : 'miles/hr';
    if (hasWeatherData) {
      return (
        <main className="container">
          <div className="float-right">
            <p>{hasWeatherData.location}</p>
            <p>{hasWeatherData.date}</p>
          </div>
          <div>
            <h1>{hasWeatherData.weather}</h1>
            <h2>{hasWeatherData.temp}<i className="wi wi-degrees"></i></h2>
            <span className="wi wi-direction-up"> {hasWeatherData.maxTemp}<i className="wi wi-degrees"></i></span><br />
            <span className="wi wi-direction-down"> {hasWeatherData.minTemp}<i className="wi wi-degrees"></i></span><br />
            <span className="wi wi-humidity"> {hasWeatherData.humidity}%</span><br />
            <span className="wi wi-barometer"> {hasWeatherData.pressure} hPa</span><br />
            <span className="wi wi-strong-wind"> {hasWeatherData.windSpeed} {windSpeedUnit}</span>
          </div>
        </main>
      );
    }
    else {
      return (
        <div>
          <h1>No weather data!</h1>
        </div>
      )
    }
  }
}

export default CurrentWeather;