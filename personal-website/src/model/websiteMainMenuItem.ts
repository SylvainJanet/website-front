import { LanguagedString } from './languagedString';
import { WebsiteMainMenuItemDto } from 'src/interfaces/websiteMainMenuItemDto';
import { Entity, EntityStatic, staticImplements } from './entity';
import { WebpageCategoryMain } from './webpageCategoryMain';

@staticImplements<EntityStatic<WebsiteMainMenuItem, WebsiteMainMenuItemDto>>()
export class WebsiteMainMenuItem extends Entity {
  static convertToDto(entity: WebsiteMainMenuItem): WebsiteMainMenuItemDto {
    let subitemsIds = [];
    for (let e of entity.subitems) {
      subitemsIds.push(e.id);
    }
    return {
      id: entity.id,
      version: entity.version,
      subitemsIds: subitemsIds,
      webpageCategoryMain: WebpageCategoryMain.convertToDto(
        entity.webpageCategoryMain
      ),
      languagedTitle: LanguagedString.convertToDto(entity.languagedTitle),
    };
  }
  static convertToEntity(dto: WebsiteMainMenuItemDto): WebsiteMainMenuItem {
    let res: WebsiteMainMenuItem = new WebsiteMainMenuItem();
    res.id = dto.id;
    res.version = dto.version;
    let subitems = [];
    for (let i of dto.subitemsIds) {
      let wmmi = new WebsiteMainMenuItem();
      wmmi.id = i;
      subitems.push(wmmi);
    }
    res.subitems = subitems;
    res.webpageCategoryMain = WebpageCategoryMain.convertToEntity(
      dto.webpageCategoryMain
    );
    res.languagedTitle = LanguagedString.convertToEntity(dto.languagedTitle);
    return res;
  }
  static convertListToDto(
    entityList: WebsiteMainMenuItem[]
  ): WebsiteMainMenuItemDto[] {
    let res: WebsiteMainMenuItemDto[] = [];
    for (let entity of entityList) {
      res.push(WebsiteMainMenuItem.convertToDto(entity));
    }
    return res;
  }
  static convertListToEntity(
    dtoList: WebsiteMainMenuItemDto[]
  ): WebsiteMainMenuItem[] {
    let res: WebsiteMainMenuItem[] = [];
    for (let entity of dtoList) {
      res.push(WebsiteMainMenuItem.convertToEntity(entity));
    }
    return res;
  }
  subitems: WebsiteMainMenuItem[] = [];
  webpageCategoryMain: WebpageCategoryMain = new WebpageCategoryMain();
  languagedTitle: LanguagedString = new LanguagedString();

  constructor() {
    super();
  }
}
