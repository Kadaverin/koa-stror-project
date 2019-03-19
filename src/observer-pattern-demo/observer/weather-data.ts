import { IObserver, IObservable } from './interfaces';

export class WeatherStation implements IObservable {
  private observers: Set<IObserver>
}
