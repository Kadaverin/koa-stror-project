import { Transform } from 'stream';

export abstract class AbstractStreamTransformer extends Transform {
  _transform(chunk, _, callback) {
    try {
      const transformedData = this.transformChunk(chunk);
      this.push(transformedData);
    } catch ( error ) {
      callback(error);
    }
  }

  protected abstract transformChunk( chunk ): any;
}
