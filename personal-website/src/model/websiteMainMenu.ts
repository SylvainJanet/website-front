import { WebsiteMainMenuDto } from 'src/interfaces/websiteMainMenuDto';
import { Entity, EntityStatic, staticImplements } from './entity';
import { WebsiteMainMenuItem } from './websiteMainMenuItem';

@staticImplements<EntityStatic<WebsiteMainMenu, WebsiteMainMenuDto>>()
export class WebsiteMainMenu extends Entity {
  static convertToDto(entity: WebsiteMainMenu): WebsiteMainMenuDto {
    return {
      id: entity.id,
      version: entity.version,
      items: WebsiteMainMenuItem.convertListToDto(entity.items),
    };
  }
  static convertToEntity(dto: WebsiteMainMenuDto): WebsiteMainMenu {
    let res: WebsiteMainMenu = new WebsiteMainMenu();
    res.id = dto.id;
    res.version = dto.version;
    res.items = WebsiteMainMenuItem.convertListToEntity(dto.items);
    return res;
  }
  static convertListToDto(entityList: WebsiteMainMenu[]): WebsiteMainMenuDto[] {
    let res: WebsiteMainMenuDto[] = [];
    for (let entity of entityList) {
      res.push(WebsiteMainMenu.convertToDto(entity));
    }
    return res;
  }
  static convertListToEntity(dtoList: WebsiteMainMenuDto[]): WebsiteMainMenu[] {
    let res: WebsiteMainMenu[] = [];
    for (let entity of dtoList) {
      res.push(WebsiteMainMenu.convertToEntity(entity));
    }
    return res;
  }
  items: WebsiteMainMenuItem[] = [];

  constructor() {
    super();
  }
}
