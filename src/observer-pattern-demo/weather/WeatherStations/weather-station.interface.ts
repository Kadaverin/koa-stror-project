import { IWeatherData } from './../WeatherData';

export interface IWeatherStation {
  setWeatherData(data: IWeatherData ): void;
}
