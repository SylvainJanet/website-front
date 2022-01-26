import { EntityDto } from '../entityDto';
import { PageDto } from '../pageDto';
import { MenuItemDto } from '../menuItemDto';

export interface MenuItemDtoLevel1 extends EntityDto {
  subitems: MenuItemDto[];
  webpageCategoryMain: PageDto;
}
