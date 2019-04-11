import React, { Component } from 'react';

interface CurrentWeatherProps {
  currentWeatherData: WeatherData,
  windSpeedUnit: string
}

export interface WeatherData {
  location: string,
  weather: string,
  date: string,
  temp: number,
  maxTemp: number,
  minTemp: number,
  pressure: number,
  humidity: number,
  windSpeed: number
}

class CurrentWeather extends Component<CurrentWeatherProps, {}> {
  parseWeatherData(data: any): WeatherData {
    const location = `${data.name}, ${data.sys.country}`;
    const weather = data.weather[0].description;
    const time = (data.dt * 1000);
    const date = new Date(time).toDateString();
    const temp = Math.round(data.main.temp);
    const maxTemp = Math.round(data.main.temp_max);
    const minTemp = Math.round(data.main.temp_min);
    const pressure = data.main.pressure;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    return {
      location,
      weather,
      date,
      temp,
      maxTemp,
      minTemp,
      pressure,
      humidity,
      windSpeed
    };
  }

  render() {
    const weatherData: WeatherData = this.parseWeatherData(this.props.currentWeatherData);
    return (
      <div>
        <div className="float-right">
          <p>{weatherData.location}</p>
          <p>{weatherData.date}</p>
        </div>
        <div>
          <span>{weatherData.weather}</span><br />
          <span>{weatherData.temp}<i className="wi wi-degrees"></i></span><br />
          <span className="wi wi-direction-up"> {weatherData.maxTemp}<i className="wi wi-degrees"></i></span><br />
          <span className="wi wi-direction-down"> {weatherData.minTemp}<i className="wi wi-degrees"></i></span><br />
          <span className="wi wi-humidity"> {weatherData.humidity}%</span><br />
          <span className="wi wi-barometer"> {weatherData.pressure} hPa</span><br />
          <span className="wi wi-strong-wind"> {weatherData.windSpeed} {this.props.windSpeedUnit}</span>
        </div>
      </div>
    );
  }
}

export default CurrentWeather;
