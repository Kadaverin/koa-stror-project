import { IStreamTransmormersFactory, IStreamFactoryTransformersSettings } from './interfaces';
import { Transform } from 'stream';
import { transformersCreatorsByNames } from './utils';

import { StreamProcessingClassOptionsType } from './interfaces';



export class StreamTransmormersFactory implements IStreamTransmormersFactory {

  constructor(
    private transformersCreatorsByNames: IStreamFactoryTransformersSettings,
  ) {}

  create(name: string, opts?: StreamProcessingClassOptionsType) {

    const transformerCreator = this.transformersCreatorsByNames[name];

    if (!transformerCreator) {
      throw new Error(`Unknown transformer name '${ name }'`);
    }


    return transformerCreator(opts);
  }
}

export default new StreamTransmormersFactory(transformersCreatorsByNames);
