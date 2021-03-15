import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div id="home">
        <div className="info">
          <h1><b>Starry Night</b></h1>
          <p>This website uses the OpenWeatherMap service to retrieve and display the current weather, as well as the forecast for the next 4 days.</p>
          <p>You can choose to provide your current location by allowing geolocation access, or enter a desired location in the search bar (in English or Hebrew).</p>
          <p>It's also possible to convert the units from Celsius to Fahrenheit.</p>
        </div>
      </div>
    );
  }
}

export default Home;
