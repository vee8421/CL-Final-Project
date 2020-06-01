import React from 'react';
import './App.css';
import Heading from "./components/heading";
import Form from "./components/form";
import Forecast from './components/forecast';

const api_key = "6682e791a6815af8b99330674d3bd3b0";


class App extends React.Component {
  state = {
    temperature: "",
    city: "",
    country: "",
    humidty: "",
    icon: "",
    description: "",
    error: "",
  }

  getWeather = async (e) => {
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    const api_call = await 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${api_key}`);

const response = await api_call.json();
if(city && country){
  this.setState({
    temperature: response.main.temp,
    city: response.name,
    country: response.sys.country,
    humidity: response.main.humidity,
    icon: response.weather[0].icon,
    description: response.weather[0].description,
    error: ''
  })
 }else{
   this.setState({
     error: "Please check City and/or Country to ensure correct input"

      })
 }
}

  render(){
    return(
      <div className="container">
      <Heading/>
      <div className="form"></div>
      <Form loadWeather={this.getWeather} />
      <div className="weather"></div>
      <Forecast
      temperature={this.state.temperature}
      city={this.state.city}
      country={this.state.country}
      humidity={this.state.humidty}
      icon={this.state.icon}
      description={this.state.description}
      error={this.state.error}/>
      
    </div>
    )

 }
}
export default App;
