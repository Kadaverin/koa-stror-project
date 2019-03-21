import { Transform, TransformOptions } from 'stream';

export interface IStreamTransmormersFactory {
  create(transformerName: string, opts?: TransformOptions): Transform;
}

export interface IStreamFactoryTransformersSettings {
  [key: string]: typeof Transform;
}
