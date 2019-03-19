import { IWeatherData } from '../interfaces';

export interface IWeatherStation {
  setWeatherData(data: IWeatherData ): void;
}
