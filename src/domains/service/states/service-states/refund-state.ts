import { AbstractServiceState } from './abstractions';
import { ServiceStatesEnum } from './../../../../utils/enums';
import { Service } from './../../../../entities';

export class RefundState extends AbstractServiceState {
  public static readonly stateName = ServiceStatesEnum.REFUND;

  public get stateName() {
    return RefundState.stateName;
  }

  close(service: Service): Service {
    service.state = ServiceStatesEnum.CLOSED;
    return service.updateState(service.state);
  }
}
