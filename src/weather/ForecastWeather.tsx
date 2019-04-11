import React, { Component } from 'react';

interface ForecastWeatherProps {
  forecastWeatherData: any,
  windSpeedUnit: string
}

class ForecastWeather extends Component<ForecastWeatherProps, {}> {
  parseForecastData = (data: any, day: number): any => {
    const location = `${data.city.name}, ${data.city.country}`;
    const weather = data.list[day].weather[0].description;
    const time = (data.list[day].dt * 1000);
    const date = new Date(time).toDateString();
    const temp = Math.round(data.list[day].main.temp);
    const maxTemp = Math.round(data.list[day].main.temp_max);
    const minTemp = Math.round(data.list[day].main.temp_min);
    const pressure = data.list[day].main.pressure;
    const humidity = data.list[day].main.humidity;
    const windSpeed = data.list[day].wind.speed;
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
    const weatherData: any = this.parseForecastData(this.props.forecastWeatherData, 39);
    console.log(this.props.forecastWeatherData);
    return (
      <div>
        <span>{weatherData.date}</span>
      </div>
    );
  }
}

export default ForecastWeather;
