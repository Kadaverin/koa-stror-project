import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { IsEnum } from 'class-validator';

import { ServiceStatesEnum } from '../utils/enums/service-states.enum';
import { ServiceStep } from './service-step';

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

  constructor(partiall: Partial<Service>) {
    Object.assign(this, partiall);
  }
}
