import { EntityDto } from './entityDto';
import { LocalizedStringDto } from './localizedStringDto';
import { PageDto } from './pageDto';

export interface MenuItemDto extends EntityDto {
  subItemsIds: (number | undefined)[];
  depth: number;
  itemRank: number;
  menuId: number;
  title: LocalizedStringDto;
  page: PageDto;
}
