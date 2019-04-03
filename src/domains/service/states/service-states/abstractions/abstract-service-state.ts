import { Service } from './../../../../../entities';
import { ServiceStatesEnum } from './../../../../../utils/enums';
import { IServiceState } from './service-state.interface';


export abstract class AbstractServiceState implements IServiceState {
  public abstract get stateName(): ServiceStatesEnum;

  public next(_: Service): any {
    this.generateNotAllowedExeption('next');
  }

  public close(_: Service): any {
    this.generateNotAllowedExeption('close');
  }

  public refund(_: Service): any {
    this.generateNotAllowedExeption('refund');
  }

  protected generateNotAllowedExeption(targetMethod: string) {
    throw new Error(
      `The mutation method "${ targetMethod }" is not allowed for state "${ this.stateName }"`
    );
  }
}


