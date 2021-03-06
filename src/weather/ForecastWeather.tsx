import React, { Component } from 'react';
import { getDayName, getIconColor, capitalize } from '../utils/utils';

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

// Retrieves the predictions at noon for the next 4 days,
// since the API call returns a list of 8 predictions per day for 5 days.
export function sortForecastData(data: any): any {
  try {
    let noonList: any = data.list.filter((item: any) => item.dt_txt.split(' ')[1].includes('12'));
    let today: Date = new Date(Date.now());
    let todayDate: string = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    let dt: Date = new Date(noonList[0].dt * 1000);
    let firstElementDate: string = `${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`;
    // Removes the first element if today is part of the results (i.e. before 15:00).
    if (firstElementDate === todayDate) {
      noonList.shift();
    }
    else {
      noonList.pop();
    }
    return noonList;
  }
  catch (err) {
    throw new Error(`There was an issue sorting the forecast data: ${err.message}`);
  }
}

// Extracts relevant information from the API result.
export function parseForecastData(data: any): WeatherData {
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
  catch (err) {
    throw new Error(`There was an issue parsing the forecast data: ${err.message}`);
  }
}

class ForecastWeather extends Component<ForecastWeatherProps, ForecastWeatherState> {
  constructor(props: ForecastWeatherProps) {
    super(props);
    this.state = {
      weatherData: []
    }
  }

  componentDidMount() {
    const sortedWeatherData: any = sortForecastData(this.props.forecastWeatherData);
    const parsedWeatherData: WeatherData[] = sortedWeatherData.map((element: any) => parseForecastData(element));
    this.setState({
      weatherData: parsedWeatherData
    });
  }

  showForecastdata = (forecastData: WeatherData[]): JSX.Element[] => {
    return forecastData.map(element => (
      <div className="col-lg-3" key={element.day}>
        <div className="card card-bg text-center mb-4">
          <div className="card-body">
            <h5 className="card-title">{element.day}</h5>
            <p className="card-text">{element.temp}<i className="wi wi-degrees" /></p>
            <p className="card-text">{capitalize(element.weatherDesc)}</p>
            <i className={`forecast-img wi ${getIconColor(element.weatherId)} wi-owm-${element.weatherId}`} />
          </div>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="row">
        {this.showForecastdata(this.state.weatherData)}
      </div>
    );
  }
}

export default ForecastWeather;
