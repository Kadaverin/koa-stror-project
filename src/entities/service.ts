import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { IsEnum } from 'class-validator';

import { ServiceStatesEnum } from '../utils/enums/service-states.enum';
import { ServiceStep } from './service-step';
import { IServiceState } from 'src/domains/service/state/service-states/abstractions/service-state.interface';


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

  constructor(partiall: Partial<Service>, private ServiceStatesFactory) {
    Object.assign(this, partiall);
    this.setStateByName();
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

  setStateByName(state: ServiceStatesEnum = this.state): Service {
    this.currentState = this.ServiceStatesFactory.buildStateByName(state);
    return this;
  }
}


