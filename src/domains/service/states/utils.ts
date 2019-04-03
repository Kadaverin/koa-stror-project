import {
  NewState,
  PendingState,
  ProcessingState,
  DelpoyedState,
  RefundState,
  ClosedState,
} from './service-states';

import { ServiceStatesEnum } from './../../../utils/enums';
import { IServiceState } from './service-states/abstractions/service-state.interface';

export interface IServiceStateClass {
  new(): IServiceState;
}

export type StatesClassesByNamesType = {
  [state in ServiceStatesEnum]: IServiceStateClass
};

export const statesClassesByNames: StatesClassesByNamesType = {
  [NewState.stateName]: NewState,
  [ProcessingState.stateName]: ProcessingState,
  [PendingState.stateName]: PendingState,
  [DelpoyedState.stateName]: DelpoyedState,
  [RefundState.stateName]: RefundState,
  [ClosedState.stateName]: ClosedState,
};
