import { AbstractServiceState } from './abstractions';
import { ServiceStatesEnum } from './../../../../utils/enums';
import { Service } from './../../../../entities';

export class ProcessingState extends AbstractServiceState {
  public static readonly stateName = ServiceStatesEnum.PROCESSING;

  public get stateName() {
    return ProcessingState.stateName;
  }

  next(service: Service): Service {
    service.state = ServiceStatesEnum.PENDING;
    return service.updateState(service.state);
  }

  close(service: Service): Service {
    service.state = ServiceStatesEnum.CLOSED;
    return service.updateState(service.state);
  }
}
