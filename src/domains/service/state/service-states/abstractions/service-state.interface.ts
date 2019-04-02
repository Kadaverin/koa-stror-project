import { Service } from 'src/entities';
import { ServiceStatesEnum } from 'src/utils/enums';

export interface IServiceState {
  readonly stateName: ServiceStatesEnum;
  next(_: Service): Service;
  close(_: Service): Service;
  refund(_: Service): Service;
}
