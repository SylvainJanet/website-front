import { LocalizedString } from './localizedString';
import { MenuItemDto } from 'src/interfaces/menuItemDto';
import { Entity, EntityStatic, staticImplements } from './entity';
import { Page } from './page';

@staticImplements<EntityStatic<MenuItem, MenuItemDto>>()
export class MenuItem extends Entity {
  static convertToDto(entity: MenuItem): MenuItemDto {
    let subItemsIds = [];
    for (let e of entity.subItems) {
      subItemsIds.push(e.id);
    }
    return {
      id: entity.id,
      version: entity.version,
      subItemsIds: subItemsIds,
      depth: entity.depth,
      itemRank: entity.itemRank,
      menuId: entity.menuId,
      title: LocalizedString.convertToDto(entity.title),
      page: Page.convertToDto(entity.page),
    };
  }
  static convertToEntity(dto: MenuItemDto): MenuItem {
    let res: MenuItem = new MenuItem();
    res.id = dto.id;
    res.version = dto.version;
    let subitems = [];
    for (let i of dto.subItemsIds) {
      let wmmi = new MenuItem();
      wmmi.id = i;
      subitems.push(wmmi);
    }
    res.subItems = subitems;
    res.depth = dto.depth;
    res.itemRank = dto.itemRank;
    res.menuId = dto.menuId;
    res.title = LocalizedString.convertToEntity(dto.title);
    res.page = Page.convertToEntity(dto.page);
    return res;
  }
  static convertListToDto(entityList: MenuItem[]): MenuItemDto[] {
    let res: MenuItemDto[] = [];
    for (let entity of entityList) {
      res.push(MenuItem.convertToDto(entity));
    }
    return res;
  }
  static convertListToEntity(dtoList: MenuItemDto[]): MenuItem[] {
    let res: MenuItem[] = [];
    for (let entity of dtoList) {
      res.push(MenuItem.convertToEntity(entity));
    }
    return res;
  }
  subItems: MenuItem[] = [];
  depth: number = -1;
  itemRank: number = -1;
  menuId: number = -1;
  title: LocalizedString = new LocalizedString();
  page: Page = new Page();

  constructor() {
    super();
  }
}
