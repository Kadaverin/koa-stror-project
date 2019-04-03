import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { IsEnum } from 'class-validator';

import { ServiceStatesEnum } from '../utils/enums/service-states.enum';
import { ServiceStep } from './service-step';
import { IServiceState } from './../domains/service/states/service-states/abstractions/service-state.interface';
import { serviceStatesFactoryInstance, IServiceStatesFactory } from './../domains/service/states';
import { ServiceStateMutationsEnum } from 'src/utils/enums';


@Entity({ name: 'Services' })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: ServiceStatesEnum.NEW })
  @IsEnum(ServiceStatesEnum)
  state: ServiceStatesEnum;

  @OneToMany(type => ServiceStep, step => step.service, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  steps: ServiceStep[];

  private currentState: IServiceState;
  private statesFactory: IServiceStatesFactory;

  constructor(partiall: Partial<Service>) {
    Object.assign(this, partiall);
  }

  public initializeStateMachine(serviceStatesFactory: IServiceStatesFactory = serviceStatesFactoryInstance) {
    this.statesFactory = serviceStatesFactory;
    return this.updateState();
  }

  next() {
    return this.currentState.next(this);
  }

  close() {
    return this.currentState.close(this);
  }

  refund() {
    return this.currentState.refund(this);
  }

  mutateState( mutationName: ServiceStateMutationsEnum ) {
    return this[ mutationName ]();
  }

  updateState( stateName: ServiceStatesEnum = this.state ): Service {
    this.currentState = this.statesFactory.buildStateByName(stateName);
    return this;
  }
}


