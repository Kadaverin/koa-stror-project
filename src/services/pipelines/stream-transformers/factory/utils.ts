import { LowerCaseStreamTransformer } from '../lowercase-stream-transformer';
import { UpperCaseStreamTransformer } from '../uppercase-stream-transformer';
import { ServiceStepsEnum } from './../../../..//utils/enums/service-steps.enum';
import { IStreamFactoryTransformersSettings } from './interfaces';

export const transformersByNames: IStreamFactoryTransformersSettings = {
  [ServiceStepsEnum.lowerCase]: LowerCaseStreamTransformer,
  [ServiceStepsEnum.upperCase]: UpperCaseStreamTransformer,
};
