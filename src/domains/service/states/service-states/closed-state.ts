import { AbstractServiceState } from './abstractions';
import { ServiceStatesEnum } from './../../../../utils/enums';

export class ClosedState extends AbstractServiceState {
  public static readonly stateName = ServiceStatesEnum.CLOSED;

  public get stateName() {
    return ClosedState.stateName;
  }
}
