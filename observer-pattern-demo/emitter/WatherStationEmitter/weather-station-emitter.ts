import { EventEmitter } from 'events';
import { IWeatherData } from './../../weather/interfaces';
import { IWeatherStation } from './../../weather/WeatherStation/weather-station.interface';
import { IObserver, IObservable } from './../../observer/interfaces';

const events = {
  MEASUREMENTS_CHANGED: 'MEASUREMENTS_CHANGED',
};

export class WatherStationEmitter extends EventEmitter implements IWeatherStation, IObservable {
  public static readonly  events = events;

  private currentWeatherData: IWeatherData;

  registerObserver(observer: IObserver) {
    this.on(WatherStationEmitter.events.MEASUREMENTS_CHANGED, observer.update.bind(observer));
  }

  removeObserver(observer: IObserver) {
    this.off(WatherStationEmitter.events.MEASUREMENTS_CHANGED, observer.update);
  }

  public notifyObservers() {
    this.emit(WatherStationEmitter.events.MEASUREMENTS_CHANGED, this.currentWeatherData);
  }

  public setWeatherData(data: IWeatherData): void {
    this.currentWeatherData = data;
    this.notifyObservers();
  }
}
