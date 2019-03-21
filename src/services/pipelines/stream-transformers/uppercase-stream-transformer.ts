import { AbstractStreamTransformer } from './abstract-stream-transformer';

export class UpperCaseStreamTransformer extends AbstractStreamTransformer {
  protected transformChunk(chunk): string {
    return chunk.toString().toUpperCase();
  }
}
