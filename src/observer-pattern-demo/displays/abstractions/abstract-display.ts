import { IDisplayElement } from './display.interface';
import { IObserver } from '../../observer/interfaces/observer.interface';
import { IObservable } from '../../observer/interfaces/observable.interface';

export interface IDisplayElement {
  display(): void;
}

export abstract class AbstractDisplay implements IDisplayElement, IObserver {
  abstract display(): void;
  protected subject: IObservable;

  constructor(subject: IObservable) {
    this.subject = subject;
    this.subject.registerObserver(this);
  }

  protected abstract receiveData(data: any): void;

  public update(data: any): void {
    this.receiveData(data);
    this.display();
  }
}



