import { SupportedLanguage } from 'src/constants/languages/supportedLanguage';
import { EntityDto } from './entityDto';

export interface LocalizedStringDto extends EntityDto {
  strings: Map<SupportedLanguage, string>;
}
