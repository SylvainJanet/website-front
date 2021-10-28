import { EntityDto } from '../entityDto';
import { WebpageCategoryMainDto } from '../webpageCategoryMainDto';
import { WebsiteMainMenuItemDtoLevel1 } from './websiteMainMenuItemDtoLevel1';

export interface WebsiteMainMenuItemDtoLevel2 extends EntityDto {
  subitems: WebsiteMainMenuItemDtoLevel1;
  webpageCategoryMain: WebpageCategoryMainDto;
}
