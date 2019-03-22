import { Transform, TransformCallback } from 'stream';

export abstract class AbstractStreamTransformer extends Transform {
  _transform(chunk, _, callback) {
    try {
      const transformedData = this.transformChunk(chunk);
      callback(undefined , transformedData);

    } catch (error) {
      callback(error);
    }
  }

  protected abstract transformChunk( chunk ): any;
}
