import { IDisplayElement } from './display.interface';
import { IObserver } from './../observer/interfaces/observer.interface';

export abstract class AbstractDisplay implements IDisplayElement, IObserver {
  public abstract display(): void;

  public update(): void {
    this.display();
  }
}
