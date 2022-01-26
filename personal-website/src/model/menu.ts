import { MenuType } from 'src/constants/menu/menuType';
import { MenuDto } from 'src/interfaces/menuDto';
import { Entity, EntityStatic, staticImplements } from './entity';
import { MenuItem } from './menuItem';

@staticImplements<EntityStatic<Menu, MenuDto>>()
export class Menu extends Entity {
  static convertToDto(entity: Menu): MenuDto {
    return {
      id: entity.id,
      version: entity.version,
      items: MenuItem.convertListToDto(entity.items),
      type: entity.type,
      menuVersion: entity.menuVersion,
    };
  }
  static convertToEntity(dto: MenuDto): Menu {
    let res: Menu = new Menu();
    res.id = dto.id;
    res.version = dto.version;
    res.items = MenuItem.convertListToEntity(dto.items);
    res.type = dto.type;
    res.menuVersion = dto.menuVersion;
    return res;
  }
  static convertListToDto(entityList: Menu[]): MenuDto[] {
    let res: MenuDto[] = [];
    for (let entity of entityList) {
      res.push(Menu.convertToDto(entity));
    }
    return res;
  }
  static convertListToEntity(dtoList: MenuDto[]): Menu[] {
    let res: Menu[] = [];
    for (let entity of dtoList) {
      res.push(Menu.convertToEntity(entity));
    }
    return res;
  }
  items: MenuItem[] = [];
  type: MenuType = MenuType.MAIN_MENU;
  menuVersion: number = -1;

  constructor() {
    super();
  }
}
