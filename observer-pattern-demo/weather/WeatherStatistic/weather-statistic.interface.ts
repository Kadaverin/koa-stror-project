import { IWeatherData } from '../interfaces';

export interface IWeatherStatistics {
  readonly avgTemperature: number;
  readonly avgHumidity: number;
  readonly avgPressury: number;
  receiveNewData( data: IWeatherData ): void;
  toString(): string;
}
