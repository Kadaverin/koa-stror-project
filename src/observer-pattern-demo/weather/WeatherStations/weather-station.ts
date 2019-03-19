import { AbstractObservable } from './../../observer/abstractions';
import { IWeatherStation } from './weather-station.interface';
import { IWeatherData } from '../interfaces';


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

