import { EntityDto } from './entityDto';
import { LocalizedStringDto } from './localizedStringDto';

export interface PageDto extends EntityDto {
  title: LocalizedStringDto;
  content: LocalizedStringDto;
}
