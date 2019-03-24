import { Repository, getManager } from 'typeorm';
import { Service } from 'src/entities';
import { ServiceStatesEnum, ServiceStateMutations } from 'src/utils/enums';

interface IServiceState {
  next(service: Service);
  close(service: Service);
  refund(service: Service);
}

abstract class State implements IServiceState {
  constructor(
    protected serviceStateManager,
    protected servicesRepository = getManager().getRepository(Service),
  ) {}

  abstract next(service: Service): Promise<any>;
  abstract close(service: Service): Promise<any>;
  abstract refund(service: Service): Promise<any>;
}




// class NewState implements IServiceState {
//   constructor(
//     private serviceStateManager
//   ) {}

//   async next(service: Service): Promise<Service> {
//     service.state = ServiceStatesEnum.PROCESSING;
//     this.serviceStateManager.setState(this.serviceStateManager.processingState);

//     return this.serviceStateManager.saveService(service);
//   }

//   async close(service: Service): Promise<Service> {
//     service.state = ServiceStatesEnum.CLOSED;
//     this.serviceStateManager.setState(this.serviceStateManager.closedState);

//     return this.serviceStateManager.saveService(service);
//   }

//   refund(): Promise<never> {
//     return Promise.reject('Can not refund service that has not paid yet');
//   }
// }

class NewState extends State {
  async next(service: Service): Promise<Service> {
    service.state = ServiceStatesEnum.PROCESSING;

    const serviceInProcessing = await this.servicesRepository.save(service);
    this.serviceStateManager.setState(this.serviceStateManager.processingState);

    return serviceInProcessing;
  }

  close(): Promise<never> {
    throw new Error('Can not close service that has not processed yet');
  }

  refund(): Promise<never> {
    throw new Error('Can not close service that has not processed yet');
  }
}


class DelpoyedState extends State {
  next(): Promise<never> {
    throw new Error(`There is no next state after "${ ServiceStatesEnum.DEPLOYED }"`);
  }

  close(): Promise<never> {
    throw new Error('Can not close deployed service. Please, do refund first');
  }

  async refund(service: Service): Promise<Service> {
    service.state = ServiceStatesEnum.REFUND;

    const refundedService = await this.servicesRepository.save(service);
    this.serviceStateManager.setState(this.serviceStateManager.refundedService);

    return refundedService;
  }
}

class PendingState extends State {
  async next(service: Service): Promise<Service> {
    service.state = ServiceStatesEnum.DEPLOYED;

    const deployedService = await this.servicesRepository.save(service);
    this.serviceStateManager.setState(this.serviceStateManager.deployedService);

    return deployedService;
  }

  close(): Promise<never> {
    throw new Error('Can not close deployed service. Please, do refund first');
  }

  async refund(service: Service): Promise<Service> {
    service.state = ServiceStatesEnum.REFUND;

    const refundedService = await this.servicesRepository.save(service);
    this.serviceStateManager.setState(this.serviceStateManager.refundedService);

    return refundedService;
  }
}


class ProcessingState extends State {
  async next(service: Service): Promise<Service> {
    service.state = ServiceStatesEnum.PENDING;

    const pendingService = await this.servicesRepository.save(service);
    this.serviceStateManager.setState(this.serviceStateManager.pendingState);

    return pendingService;
  }

  async close(service: Service): Promise<Service> {
    service.state = ServiceStatesEnum.CLOSED;

    const closedService = await this.servicesRepository.save(service);
    this.serviceStateManager.setState(this.serviceStateManager.closedState);

    return closedService; 
  }

  refund(): Promise<never> {
    return Promise.reject('Can not refund service that has not paid yet');
  }
}

export class ServiceStateManagerService {
  private servicesRepository: Repository<Service>;
  private state;
  private _newState;
  private _processingState;


  async changeState(service: Service, mutationMethodName: ServiceStateMutations) {
    // todo: move validation to controller or validation service
    // const service = await this.servicesRepository.findOne(targetServiceId);

    // if (!service) {
    //   throw new Error('Target service does not exist');
    // }

    // validate mutationMethodName and then

    this.setStateByName(service.state);

    return this.state[mutationMethodName](service);
  }

  public get newState() {
    return this._newState;
  }

  public get processingState() {
    return this._processingState;
  }

  constructor() {
    this._newState = new NewState(this);
  }

  private statesClassesByNames = {
    [ServiceStatesEnum.NEW]: new NewState(this),
    [ServiceStatesEnum.PROCESSING]: new ProcessingState(this),
  };

  saveService(service: Service): Promise<Service> {
    return this.servicesRepository.save(service);
  }


  setState(state) {
    this.state = state;
  }

  setStateByName(name) {
    this.setState(this.statesClassesByNames[name]);
  }
}

export default new ServiceStateManagerService();


