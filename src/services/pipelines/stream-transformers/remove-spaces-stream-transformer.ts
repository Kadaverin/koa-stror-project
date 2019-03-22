import { AbstractStreamTransformer } from './abstract-stream-transformer';

export class RemoveSpacesStreamTransformer extends AbstractStreamTransformer {
  protected transformChunk(chunk): string {
    return chunk.toString().replace(/\s/g, '');
  }
}
