import { AbstractServiceState } from './abstractions';
import { ServiceStatesEnum } from './../../../../utils/enums';
import { Service } from './../../../../entities';

export class NewState extends AbstractServiceState {
  public static readonly stateName = ServiceStatesEnum.NEW;

  public get stateName() {
    return NewState.stateName;
  }

  next(service: Service): Service {
    service.state = ServiceStatesEnum.PROCESSING;
    return service.updateState(service.state);
  }
}
