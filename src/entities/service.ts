import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ServiceStep } from './service-step';

@Entity({ name: 'Services' })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => ServiceStep, step => step.service, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  steps: ServiceStep[];

  constructor(partiall: Partial<Service>) {
    Object.assign(this, partiall);
  }
}
