import { ServiceStatesEnum } from './../../../utils/enums';
import { IServiceState } from './service-states/abstractions/service-state.interface';

export interface IServiceStatesFactory {
  buildStateByName(stateName: ServiceStatesEnum): IServiceState;
}
