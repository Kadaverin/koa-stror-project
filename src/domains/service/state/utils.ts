import {
  NewState,
  PendingState,
  ProcessingState,
  DelpoyedState,
  RefundState,
  ClosedState,
} from './service-states';

import { ServiceStatesEnum } from 'src/utils/enums';
import { AbstractServiceState } from './service-states/abstractions';

type StatesClassesByNames = {
  [state in ServiceStatesEnum]: typeof AbstractServiceState
};

export const statesClassesByNames: StatesClassesByNames = {
  [NewState.stateName]: NewState,
  [ProcessingState.stateName]: ProcessingState,
  [PendingState.stateName]: PendingState,
  [DelpoyedState.stateName]: DelpoyedState,
  [RefundState.stateName]: RefundState,
  [ClosedState.stateName]: ClosedState,
};
