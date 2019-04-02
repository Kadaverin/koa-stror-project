import { AbstractServiceState } from './abstractions';
import { ServiceStatesEnum } from 'src/utils/enums';
import { Service } from 'src/entities';

export class DelpoyedState extends AbstractServiceState {
  public static readonly stateName = ServiceStatesEnum.DEPLOYED;

  public get stateName() {
    return DelpoyedState.stateName;
  }

  refund(service: Service): Service {
    service.state = ServiceStatesEnum.REFUND;
    return service.setStateByName(service.state);
  }
}
