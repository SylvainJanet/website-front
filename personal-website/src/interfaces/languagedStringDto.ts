import { SupportedLanguages } from 'src/constants/languages/supportedLanguages';
import { EntityDto } from './entityDto';

export interface LanguagedStringDto extends EntityDto {
  strings: Map<SupportedLanguages, string>;
}
