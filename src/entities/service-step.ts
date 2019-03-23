import {
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Entity,
  Column,
} from 'typeorm';
import { IsInt, IsEnum } from 'class-validator';

import { Service } from './service';
import { ServiceStepsEnum } from './../utils/enums/service-steps.enum';


@Entity({ name: 'ServiceSteps'})
export class ServiceStep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEnum(ServiceStepsEnum)
  name: ServiceStepsEnum;

  @Column()
  @IsInt()
  order: number;

  @Column({ nullable: false })
  serviceId: number;

  @JoinColumn()
  @ManyToOne(type => Service, service => service.steps, {
    nullable: false
  })
  service: Service;

  constructor(partiall: Partial<ServiceStep>) {
    Object.assign(this, partiall);
  }
}
