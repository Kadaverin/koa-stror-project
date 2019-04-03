import { Service } from './../../../../../entities';
import { ServiceStatesEnum } from './../../../../../utils/enums';

export interface IServiceState {
  readonly stateName: ServiceStatesEnum;
  next(_: Service): Service;
  close(_: Service): Service;
  refund(_: Service): Service;
}
