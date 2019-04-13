import React, { Component } from 'react';
import { getDayName } from '../utils/utils';

interface ForecastWeatherProps {
  forecastWeatherData: any
}

interface ForecastWeatherState {
  weatherData: WeatherData[]
}

interface WeatherData {
  weatherId: number,
  weatherDesc: string,
  temp: number,
  day: string
}

class ForecastWeather extends Component<ForecastWeatherProps, ForecastWeatherState> {
  constructor(props: ForecastWeatherProps) {
    super(props);
    this.state = {
      weatherData: []
    }
  }

  // Retrieves the predictions at noon for the next 4-5 days,
  // since the API call returns a list of 8 predictions per day for 5 days.
  sortForecastData(data: any): any {
    try {
      let noonList: any = data.list.filter((item: any) => item.dt_txt.split(' ')[1].includes('12'));
      let today: Date = new Date();
      let todayDate: string = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
      let firstElementDate: string = noonList[0].dt_txt.split(' ')[0]; // 2019-03-10
      // Removes the first element if today is part of the results (i.e. before 15:00).
      if (firstElementDate == todayDate) {
        noonList.shift();
      }
      return noonList;
    }
    catch(err) {
      throw new Error(`There was an issue sorting the forecast data: ${err.message}`);
    }
  }

  // Extracts relevant information from the API result.
  parseForecastData(data: any): WeatherData {
    try {
      const weatherId: number = data.weather[0].id;
      const weatherDesc: string = data.weather[0].description;
      const temp: number = Math.round(data.main.temp);
      const day: string = getDayName(data.dt * 1000);
      return {
        weatherId,
        weatherDesc,
        temp,
        day
      };
    }
    catch(err) {
      throw new Error(`There was an issue parsing the forecast data: ${err.message}`);
    }
  }

  componentDidMount() {
    const sortedWeatherData: any = this.sortForecastData(this.props.forecastWeatherData);
    const parsedWeatherData: WeatherData[] = sortedWeatherData.map((element: any) => this.parseForecastData(element));
    this.setState({
      weatherData: parsedWeatherData
    });
  }

  render() {
    const weatherData: any = this.state.weatherData.map(element => (
      <div key={element.day}>
        <span>{element.day}</span> <p className={`wi wi-owm-${element.weatherId}`}> {element.temp}<i className="wi wi-degrees" /> {element.weatherDesc}</p>
      </div>
    ));
    return (
      <div>
        <h3>Forecast weather:</h3>
        {weatherData}
      </div>
    );
  }
}

export default ForecastWeather;
