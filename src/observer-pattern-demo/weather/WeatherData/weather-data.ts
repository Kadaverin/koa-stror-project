import { IWeatherData } from './../interfaces';

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
