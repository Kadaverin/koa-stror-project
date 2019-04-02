import { AbstractServiceState } from './abstractions';
import { ServiceStatesEnum } from 'src/utils/enums';
import { Service } from 'src/entities';

export class NewState extends AbstractServiceState {
  public static readonly stateName = ServiceStatesEnum.NEW;

  public get stateName() {
    return NewState.stateName;
  }

  next(service: Service): Service {
    service.state = ServiceStatesEnum.PROCESSING;
    return service.setStateByName(service.state);
  }
}
