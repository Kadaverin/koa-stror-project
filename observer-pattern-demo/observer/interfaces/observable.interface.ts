import { IObserver } from './observer.interface';

export interface IObservable {
  registerObserver(observer: IObserver): void;
  removeObserver(observer: IObserver): void;
  notifyObservers(): void;
}
