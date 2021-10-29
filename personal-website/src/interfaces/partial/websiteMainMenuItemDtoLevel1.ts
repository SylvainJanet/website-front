import { EntityDto } from '../entityDto';
import { WebpageCategoryMainDto } from '../webpageCategoryMainDto';
import { WebsiteMainMenuItemDto } from '../websiteMainMenuItemDto';

export interface WebsiteMainMenuItemDtoLevel1 extends EntityDto {
  subitems: WebsiteMainMenuItemDto;
  webpageCategoryMain: WebpageCategoryMainDto;
}
