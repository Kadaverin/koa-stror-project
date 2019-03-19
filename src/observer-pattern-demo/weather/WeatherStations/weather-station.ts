import { AbstractObservable } from './../../observer/abstractions';
import { IWeatherData } from './../WeatherData/';
import { IWeatherStation } from './weather-station.interface';


export class WeatherStation extends AbstractObservable implements IWeatherStation {
  private currentWeatherData: IWeatherData;

  public setWeatherData(data: IWeatherData): void {
    this.currentWeatherData = data;
    this.notifyObservers();
  }

  protected getDataToUpdateObservers(): IWeatherData {
    return this.currentWeatherData;
  }
  
}

