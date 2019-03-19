import { AbstractDisplay } from './abstractions/abstract-display';
import { IWeatherConditions } from './../weather/interfaces';

export class CurrentConditionsDisplay extends AbstractDisplay { 
  temperature: number;
  humidity: number;

  public display(): void {
    console.log(`Current conditions: ${ this.temperature }F degrees and humidity ${ this.humidity }`);
  }

  protected receiveData(data: IWeatherConditions) {
    this.temperature = data.temperature;
    this.humidity = data.humidity;
  }
}
