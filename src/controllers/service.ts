import { BaseContext } from 'koa';
import { getManager, Repository } from 'typeorm';
import { OK, CREATED, NO_CONTENT, BAD_REQUEST } from 'http-status-codes';
import { validate, ValidationError, IsEnum , Validator } from 'class-validator';

import { Service, ServiceStep } from './../entities';
import { ServiceStepsEnum } from './../utils/enums/service-steps.enum';

export class ServicesController {

  public static async createService (ctx: BaseContext) {
    const flowSteps = ctx.request.body.flowSteps;
    const validator = new Validator();

    if(!flowSteps) {
      ctx.throw(BAD_REQUEST, 'The "flowSteps" array is required');
    }

    if(!flowSteps.length) {
      ctx.throw(BAD_REQUEST, 'The "flowSteps" array can not be empty');
    }

    const errors = flowSteps.reduce((stepErrors, step) => {
      
      if(!validator.isEnum(step, ServiceStepsEnum)) {
        stepErrors.push(`'${ step }' is not allowed service step!`);
      }

      return stepErrors;
    }, []);

    if(errors.length > 0) {
      ctx.throw(BAD_REQUEST, 'Incorrect flowSteps are given', { errors });
    }

    const ServicesRepository: Repository<Service> = await getManager().getRepository(Service);
    
    const steps: ServiceStep[] = flowSteps.map((name: ServiceStepsEnum, index: number): ServiceStep => (
      new ServiceStep({
        name,
        order: index + 1,
      })
    ));
      
    const serviceToBeSaved = new Service({ steps });

    const service = await ServicesRepository.save(serviceToBeSaved);

    ctx.status = CREATED;
    ctx.body = service;

  }

  public static async executeService (ctx: BaseContext) {
    
  }
}
