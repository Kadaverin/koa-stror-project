import { IObservable } from './../interfaces/observable.interface';
import { IObserver } from './../interfaces/observer.interface';

export abstract class AbstractObservable implements IObservable {
  protected observers: Set<IObserver>;

  constructor() {
    this.observers = new Set<IObserver>();
  }

  protected abstract getDataToUpdateObservers(): any;

  registerObserver(observer: IObserver): void {
    this.observers.add(observer);
  }

  removeObserver(observer: IObserver): void {
    this.observers.delete(observer);
  }

  notifyObservers(): void {
    this.observers.forEach(observer => {
      observer.update(this.getDataToUpdateObservers());
    });
  }
}
