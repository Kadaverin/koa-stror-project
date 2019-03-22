import { IStreamTransmormersFactory, IStreamFactoryTransformersSettings } from './interfaces';
import { Transform, TransformOptions } from 'stream';
import { transformersByNames } from './utils';



export class StreamTransmormersFactory implements IStreamTransmormersFactory {
  //private transformerClassesByNames;

  constructor(private transformerClassesByNames: IStreamFactoryTransformersSettings) {
    //this.transformerClassesByNames = transformerClassesByName;
  }

  create(name: string, opts?: TransformOptions): Transform {
    
    const TransformerClass = this.transformerClassesByNames[name];

    if (!TransformerClass) {
      throw new Error(`Unknown transformer name '${ name }'`);
    }

    const transformer = new TransformerClass(opts);

    return transformer
  }
}

export default new StreamTransmormersFactory(transformersByNames);
