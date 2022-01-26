import { MenuType } from './../constants/menu/menuType';
import { EntityDto } from './entityDto';
import { MenuItemDto } from './menuItemDto';

export interface MenuDto extends EntityDto {
  items: MenuItemDto[];
  type: MenuType;
  menuVersion: number;
}
