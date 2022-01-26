import { EntityDto } from '../entityDto';
import { PageDto } from '../pageDto';
import { MenuItemDtoLevel1 } from './menuItemDtoLevel1';

export interface MenuItemDtoLevel2 extends EntityDto {
  subitems: MenuItemDtoLevel1[];
  webpageCategoryMain: PageDto;
}
