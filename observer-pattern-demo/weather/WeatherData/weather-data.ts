import { IWeatherData } from './../interfaces';

export class WeatherData implements IWeatherData {
  constructor(
    public temperature: number, 
    public humidity: number,
    public pressure: number
  ) {}
}
