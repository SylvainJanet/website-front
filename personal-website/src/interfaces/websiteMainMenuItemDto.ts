import { EntityDto } from './entityDto';
import { LanguagedStringDto } from './languagedStringDto';
import { WebpageCategoryMainDto } from './webpageCategoryMainDto';

export interface WebsiteMainMenuItemDto extends EntityDto {
  subitemsIds: (number | undefined)[];
  webpageCategoryMain: WebpageCategoryMainDto;
  languagedTitle: LanguagedStringDto;
}
