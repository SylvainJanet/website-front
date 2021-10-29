import { EntityDto } from './entityDto';
import { LanguagedStringDto } from './languagedStringDto';

export interface WebpageCategoryMainDto extends EntityDto {
  title: LanguagedStringDto;
  content: LanguagedStringDto;
}
