import { AbstractServiceState } from './abstractions';
import { ServiceStatesEnum } from './../../../../utils/enums';
import { Service } from './../../../../entities';

export class PendingState extends AbstractServiceState {
  public static readonly stateName = ServiceStatesEnum.PENDING;

  public get stateName() {
    return PendingState.stateName;
  }

  refund(service: Service): Service {
    service.state = ServiceStatesEnum.REFUND;
    return service.updateState(service.state);
  }

  next(service: Service): Service {
    service.state = ServiceStatesEnum.DEPLOYED;
    return service.updateState(service.state);
  }
}

