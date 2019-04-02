import { statesClassesByNames, StatesClassesByNamesType } from './utils';
import { IServiceState } from './service-states/abstractions/service-state.interface';
import { ServiceStatesEnum } from 'src/utils/enums';

export class ServiceStateFactory {
  private stateInstancesByNames = {};

  constructor(
    private statesClassesByNames: StatesClassesByNamesType,
  ) {}


  public buildStateByName(name: ServiceStatesEnum): IServiceState {
    const TargetClass = this.statesClassesByNames[ name ];

    if (!this.stateInstancesByNames[ name ]) {
      this.stateInstancesByNames[ name ] = new TargetClass();
    }

    return this.stateInstancesByNames[ name ];
  }
}

export default new ServiceStateFactory(statesClassesByNames);
