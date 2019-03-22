import { LowerCaseStreamTransformer } from '../lowercase-stream-transformer';
import { UpperCaseStreamTransformer } from '../uppercase-stream-transformer';
import { RemoveSpacesStreamTransformer } from '../remove-spaces-stream-transformer';
import { ServiceStepsEnum } from './../../../..//utils/enums/service-steps.enum';
import { IStreamFactoryTransformersSettings, StreamProcessingClassOptionsType } from './interfaces';
import { createGzip, createUnzip, ZlibOptions } from 'zlib';
import { scryptSync, createCipheriv, createDecipheriv } from 'crypto';

// stub crypto settings
const algorithm = 'aes-192-cbc';
const password = 'Password used to generate key';
const key = scryptSync(password, 'salt', 24);
const iv = Buffer.alloc(16, 0);

const createTransformerCreator = TransformerClass =>
  (options: StreamProcessingClassOptionsType) => new TransformerClass(options);
  

export const transformersCreatorsByNames: IStreamFactoryTransformersSettings = {
  [ServiceStepsEnum.lowerCase]: createTransformerCreator(LowerCaseStreamTransformer),
  [ServiceStepsEnum.upperCase]: createTransformerCreator(UpperCaseStreamTransformer),
  [ServiceStepsEnum.removeSpaces]: createTransformerCreator(RemoveSpacesStreamTransformer),
  [ServiceStepsEnum.gzip]: (options: ZlibOptions) => createGzip(),
  [ServiceStepsEnum.ungzip]: (options: ZlibOptions) => createUnzip(),
  [ServiceStepsEnum.encrypt]: () => createCipheriv(algorithm, key, iv),
  [ServiceStepsEnum.decrypt]: () => createDecipheriv(algorithm, key, iv),

};
