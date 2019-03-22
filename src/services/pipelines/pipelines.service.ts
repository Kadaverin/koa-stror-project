import { Readable, Stream } from 'stream';
import { IStreamTransmormersFactory } from './stream-transformers/factory/interfaces';
import { ServiceStep } from './../../entities';
import streamTransmormersFactory from './stream-transformers/factory/stream-transformers-factory';


export class PipelineService {
  constructor(
    private streamTransformersFactory: IStreamTransmormersFactory,
  ) {}

  buildTransformPipeline(targetStream: Stream, serviceSteps: ServiceStep[]): Stream {
    return serviceSteps
      .sort((step1, step2) => step1.order - step2.order)
      .reduce(( pipeline, transformStep) =>
        pipeline.pipe(this.streamTransformersFactory.create(transformStep.name)),
        targetStream,
      );
  }
}

export default new PipelineService(streamTransmormersFactory);
