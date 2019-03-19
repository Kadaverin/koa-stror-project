import { IWeatherData } from './weather-data.interface';

export class WeatherData implements IWeatherData {
  temperature: number;
  humidity: number;
  pressure: number;

  constructor(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
  }
}
