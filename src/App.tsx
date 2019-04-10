import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import NavBar from './nav/NavBar';
import CurrentWeather from './CurrentWeather';

interface AppState {
  query: string,
  unit: string,
  coordinates: number[],
  currentWeatherData?: WeatherData
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

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      query: '',
      unit: 'C',
      coordinates: []
      // currentWeatherData: {
      //   location: '',
      //   weather: '',
      //   date: '',
      //   temp: 0,
      //   maxTemp: 0,
      //   minTemp: 0,
      //   pressure: 0,
      //   humidity: 0,
      //   windSpeed: 0
      // }
    };
    library.add(fab, fas);
  }

  onConvertUnit = (newUnit: string) => {
    this.setState({
      unit: newUnit
    }, this.notifyStateChange);
  }

  onSubmitSearch = (newQuery: string) => {
    this.setState({
      query: newQuery,
      coordinates: [] // reset coordinates
    }, this.notifyStateChange);
  }

  // Retrieves coordinates if the browser supports geolocation and permission is granted.
  componentDidMount() {
    const geolocation: Geolocation = navigator.geolocation;
    if (geolocation) {
      const permissionGranted = (position: Position) => {
        this.setState({
          coordinates:  [ position.coords.latitude, position.coords.longitude ]
        }, this.notifyStateChange);
      }
      const permissionDenied = () => {
        console.log('Permission denied');
      }
      geolocation.getCurrentPosition(permissionGranted, permissionDenied);
    } else {
      console.log('Geolocation not supported');
    }
  }

  notifyStateChange = () => {
    const hasCoordinates: boolean = (this.state.coordinates.length > 0);
    const hasCityOrZipcode: boolean = (this.state.query != '');
    if (hasCoordinates || hasCityOrZipcode) {
      this.fetchWeatherForecast(hasCoordinates).then(forecastData => {
        console.log(forecastData);
        const newCurrentWeatherData = this.parseCurrentWeatherData(forecastData);
        this.setState({
          currentWeatherData: newCurrentWeatherData
        })
      }).catch(err => {
        console.log('Error: ', err);
      });
    }
  }

  fetchWeatherForecast = (hasCoordinates: boolean) => {
    const API_KEY: string = '********************************'; // API key from openweathermap.org
    const BASE_URL: string = 'https://api.openweathermap.org/data/2.5/forecast';
    const queryParams: string = (hasCoordinates) ? `lat=${this.state.coordinates[0]}&lon=${this.state.coordinates[1]}` : `q=${this.state.query}`;
    const unitType: string = (this.state.unit == 'C') ? 'metric' : 'imperial';
    const url: string = `${BASE_URL}?${queryParams}&units=${unitType}&cnt=7&appid=${API_KEY}`;
    return axios.get(url).then(res => {
      return res.data;
    }).catch(err => {
      console.log('Error: ', err);
    })
  }

  parseCurrentWeatherData = (data: any) => {
    const location = `${data.city.name}, ${data.city.country}`;
    const weather = data.list[0].weather[0].description;
    const time = (data.list[0].dt * 1000);
    const date = new Date(time).toDateString();
    const temp = Math.round(data.list[0].main.temp);
    const maxTemp = Math.round(data.list[0].main.temp_max);
    const minTemp = Math.round(data.list[0].main.temp_min);
    const pressure = data.list[0].main.pressure;
    const humidity = data.list[0].main.humidity;
    const windSpeed = data.list[0].wind.speed;
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
    return (
      <div>
        <NavBar convertUnit={this.onConvertUnit} submitSearch={this.onSubmitSearch} unit={this.state.unit} />
        <div className="container text-light">
          <CurrentWeather currentWeatherData={this.state.currentWeatherData} unit={this.state.unit}/>
        </div>
      </div>
    );
  }
}

export default App;
