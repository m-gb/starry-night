import React, { Component } from 'react';
import axios from 'axios';
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
  }

  onConvertUnit = (newUnit: string) => {
    this.setState({
      unit: newUnit,
      forecastWeatherData: undefined // Reset forecastWeatherData
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
        this.setState(() => {
          throw new Error('Geolocation permission was denied.');
        });
      });
    } else {
      throw new Error('Geolocation is not supported by the browser.');
    }
  }

  notifyStateChange() {
    const hasCoordinates: boolean = (this.state.coordinates !== undefined);
    const hasQuery: boolean = (this.state.query !== '');
    if (hasCoordinates || hasQuery) {
      this.fetchWeatherForecast(this.state.coordinates, 'weather')
        .then((currentData: any) => {
          this.setState({
            currentWeatherData: currentData
          });
        })
        .catch((err: Error) => {
          this.setState(() => {
            throw new Error(`There was an issue processing the weather service data: ${err.message}`);
          });
        });
      this.fetchWeatherForecast(this.state.coordinates, 'forecast')
        .then((forecastData: any) => {
          this.setState({
            forecastWeatherData: forecastData
          });
        })
        .catch((err: Error) => {
          this.setState(() => {
            throw new Error(`There was an issue processing the weather service data: ${err.message}`);
          });
        });
    }
  }

  // Retrieve weather data from the API
  fetchWeatherForecast(coordinates: any, service: string): Promise<any> {
    const API_KEY: string = `${process.env.REACT_APP_API_KEY}`;
    const BASE_URI: string = 'https://api.openweathermap.org/data/2.5';
    const queryParams: string = (coordinates) ? `lat=${coordinates.latitude}&lon=${coordinates.longitude}` : `q=${this.state.query}`;
    const unitType: string = (this.state.unit === 'C') ? 'metric' : 'imperial';
    const uri: string = `${BASE_URI}/${service}?${queryParams}&units=${unitType}&cnt=40&appid=${API_KEY}`;
    return axios.get(uri).then(res => {
      return res.data;
    }).catch((err: Error) => {
      this.setState(() => {
        throw new Error(`Failed to retrieve data from the weather service: ${err.message}`);
      });
    });
  }

  render() {
    const hasCurrentData = this.state.currentWeatherData;
    const hasForecastData = this.state.forecastWeatherData;
    const windSpeedUnit = (this.state.unit === 'C') ? 'm/s' : 'miles/hr';
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
                    <ForecastWeather forecastWeatherData={hasForecastData} />
                  </ErrorBoundary>
                </main>
              ) :
              (
                <main className="container">
                  <h3 className="error-message">Please allow location access or enter a city in the search bar.</h3>
                </main>
              )
          }
        </div>
      </div>
    );
  }
}

export default App;
