import { BaseContext } from 'koa';
import { getManager, Repository } from 'typeorm';
import { OK, CREATED, NO_CONTENT, BAD_REQUEST } from 'http-status-codes';
import { validate, ValidationError, IsEnum } from 'class-validator';

import { Service, ServiceStep } from './../entities';

export class ServicesController {

  public static async createService (ctx: BaseContext) {
    const flowSteps = ctx.request.body.flowSteps;

    if(!flowSteps) {
      ctx.throw(BAD_REQUEST, 'The "flowSteps" array is required');
    }

    if(!flowSteps.length) {
      ctx.throw(BAD_REQUEST, 'The "flowSteps" array can not be empty')
    }


    await getManager().transaction( async transactionManager => {
      const ServiceRepository: Repository<Service> = transactionManager.getRepository(Service);
      const ServiceStepsRepository: Repository<ServiceStep> = transactionManager.getRepository(ServiceStep);

      const serviceToBeSaved = await ServiceRepository.create();
      const service = await ServiceRepository.save(serviceToBeSaved);

      flowSteps.forEach( async (name, order) => {
        const stepToBeSaved = await ServiceStepsRepository.create({
          name,
          order,
          service,
        });

        const errors: ValidationError[] = await validate(stepToBeSaved);

        if (errors.length > 0) {
          ctx.throw(BAD_REQUEST, 'Bad request', { errors });
        }

        await ServiceStepsRepository.save(stepToBeSaved);
      });
      
      ctx.status = CREATED;
      ctx.body = service;
    });

  }

  public static async executeService (ctx: BaseContext) {

  }
}
