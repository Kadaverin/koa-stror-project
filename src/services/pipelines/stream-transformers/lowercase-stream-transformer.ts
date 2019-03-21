import { AbstractStreamTransformer } from './abstract-stream-transformer';

export class LowerCaseStreamTransformer extends AbstractStreamTransformer {
  protected transformChunk(chunk): string {
    return chunk.toString().toLowerCase();
  }
}
