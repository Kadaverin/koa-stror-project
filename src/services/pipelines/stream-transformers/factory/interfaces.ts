import { Transform, DuplexOptions, TransformOptions } from 'stream';
import { ZlibOptions, Zlib } from 'zlib';
import { Cipher, Decipher } from 'crypto';

export type StreamProcessingClassOptionsType = TransformOptions | ZlibOptions;
export type StreamTransformerFactoryReturnType = Transform | Cipher | Decipher;

export interface IStreamTransmormersFactory {
  create(transformerName: string, opts?: DuplexOptions): StreamTransformerFactoryReturnType;
}

export interface IStreamFactoryTransformersSettings {
  [key: string]: (options: StreamProcessingClassOptionsType) => StreamTransformerFactoryReturnType;
}



