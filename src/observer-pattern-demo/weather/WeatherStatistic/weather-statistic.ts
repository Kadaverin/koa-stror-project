import { IWeatherStatistics } from "./weather-statistic.interface";
import { IWeatherData } from "../interfaces";
import { average } from './utils';


export class WeatherStatistics implements IWeatherStatistics {
  private temperatures: number[];
  private humidities: number[];
  private pressuries: number[];

  private _avgTemperature: number;
  private _avgPressury: number;
  private _avgHumidity: number;
  
  constructor( temperatures?: number, humidities?: number, pressuries?: number ) {
    this._avgTemperature = temperatures;
    this._avgHumidity = humidities;
    this._avgPressury = pressuries;

    this.updateStatistics();
  }

  public get avgPressury() {
    return this._avgPressury;
  }

  public get avgTemperature() {
    return this._avgTemperature;
  }

  public get avgHumidity() {
    return this._avgHumidity;
  }


  public receiveNewData( data: IWeatherData ) {
    this.temperatures.push(data.temperature);
    this.humidities.push(data.humidity);
    this.pressuries.push(data.pressure);

    this.updateStatistics();
  }

  private updateStatistics(): void {
    this._avgTemperature = average(this.temperatures);
    this._avgHumidity = average(this.humidities);
    this._avgPressury = average(this.pressuries);
  }

  toString() {
    return (
      `Average temperature: ${ this.avgTemperature }F \n
       Average humidity: ${ this.avgHumidity } \n
       Average pressury: ${ this.avgPressury }
      `
    );
  }
}
