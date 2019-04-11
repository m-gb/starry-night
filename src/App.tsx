import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import NavBar from './nav/NavBar';
import CurrentWeather from './weather/CurrentWeather';
import ForecastWeather from './weather/ForecastWeather';

interface AppState {
  query: string,
  unit: string,
  coordinates?: { latitude: number, longitude: number },
  currentWeatherData?: any,
  forecastWeatherData?: any
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      query: '',
      unit: 'C'
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
      coordinates: undefined // Reset coordinates
    }, this.notifyStateChange);
  }

  // Retrieves coordinates if the browser supports geolocation and permission is granted.
  componentDidMount() {
    const geolocation: Geolocation = navigator.geolocation;
    if (geolocation) {
      geolocation.getCurrentPosition((position) => {
        this.setState({
          coordinates: { latitude: position.coords.latitude, longitude: position.coords.longitude }
        }, this.notifyStateChange);
      }, () => {
        throw new Error('Geolocation permission was denied.');
      });
    } else {
      throw new Error('Geolocation is not supported by the browser.');
    }
  }

  notifyStateChange() {
    const hasCoordinates: boolean = (this.state.coordinates != undefined);
    const hasCityOrZipcode: boolean = (this.state.query != '');
    if (hasCoordinates || hasCityOrZipcode) {
      // Retrieve current weather
      this.fetchWeatherForecast(this.state.coordinates, 'weather').then((forecastData: any) => {
        this.setState({
          currentWeatherData: forecastData
        });
      }).catch(() => {
        throw new Error('There was an issue processing the weather data.');
      });
      // Retrieve 5-day forecast
      this.fetchWeatherForecast(this.state.coordinates, 'forecast').then((forecastData: any) => {
        this.setState({
          forecastWeatherData: forecastData
        });
      }).catch(() => {
        throw new Error('There was an issue processing the forecast data.');
      });
    }
  }

  // Retrieve weather data from the API
  fetchWeatherForecast(coordinates: any, service: string): Promise<any> {
    const API_KEY: string = '********************************'; // API key from openweathermap.org
    const BASE_URI: string = 'https://api.openweathermap.org/data/2.5';
    const queryParams: string = (coordinates) ? `lat=${coordinates.latitude}&lon=${coordinates.longitude}` : `q=${this.state.query}`;
    const unitType: string = (this.state.unit == 'C') ? 'metric' : 'imperial';
    const uri: string = `${BASE_URI}/${service}?${queryParams}&units=${unitType}&cnt=40&appid=${API_KEY}`;
    return axios.get(uri).then(res => {
      return res.data;
    }).catch(() => {
      throw new Error('Failed to retrieve data from the weather service.');
    })
  }

  render() {
    const hasCurrentData = this.state.currentWeatherData;
    const hasForecastData = this.state.forecastWeatherData;
    const windSpeedUnit = (this.state.unit == 'C') ? 'm/s' : 'miles/hr';
    return (
      <div>
        <NavBar convertUnit={this.onConvertUnit} submitSearch={this.onSubmitSearch} unit={this.state.unit} />
        <div className="text-light">
          {
            (hasCurrentData && hasForecastData) ?
              (
                <main className="container">
                  <ErrorBoundary>
                    <CurrentWeather currentWeatherData={hasCurrentData} windSpeedUnit={windSpeedUnit} />
                    <ForecastWeather forecastWeatherData={hasForecastData} windSpeedUnit={windSpeedUnit} />
                  </ErrorBoundary>
                </main>
              ) :
              (
                <main className="container">
                  <h3 className="missing-location">Please allow location access or enter a city or zipcode in the search bar.</h3>
                </main>
              )
          }
        </div>
      </div>
    );
  }
}

export default App;
