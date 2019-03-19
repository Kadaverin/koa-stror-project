import { AbstractDisplay } from './abstractions/abstract-display';
import { IWeatherData } from './../weather/interfaces';
import { IObservable } from '../observer/interfaces/observable.interface';
import { IWeatherStatistics } from '../weather/WeatherStatistic/weather-statistic.interface';
import { WeatherStatistics } from '../weather/WeatherStatistic/weather-statistic';


export class WeatherStatisticsDisplay extends AbstractDisplay { 

  public statistics: IWeatherStatistics;
  
  constructor(subject: IObservable) {
    super(subject);
    this.statistics = new WeatherStatistics();
  }

  public display(): void {
    console.log(
      `*** Weather statistics display *** :\n` +
      this.statistics.toString()
    );
  }

  protected receiveData(data: IWeatherData) {
    this.statistics.receiveNewData(data);
  }
}
