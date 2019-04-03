import { statesClassesByNames, StatesClassesByNamesType } from './utils';
import { IServiceState } from './service-states/abstractions/service-state.interface';
import { ServiceStatesEnum } from './../../../utils/enums';
import { IServiceStatesFactory } from './service-states-factory.interface';

export class ServiceStatesFactory implements IServiceStatesFactory {
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

export const serviceStatesFactoryInstance = new ServiceStatesFactory(statesClassesByNames);


