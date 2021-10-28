import { WebpageCategoryMainDto } from 'src/interfaces/webpageCategoryMainDto';
import { Entity, EntityStatic, staticImplements } from './entity';
import { LanguagedString } from './languagedString';

@staticImplements<EntityStatic<WebpageCategoryMain, WebpageCategoryMainDto>>()
export class WebpageCategoryMain extends Entity {
  static convertToDto(entity: WebpageCategoryMain): WebpageCategoryMainDto {
    return {
      id: entity.id,
      version: entity.version,
      title: LanguagedString.convertToDto(entity.title),
      content: LanguagedString.convertToDto(entity.content),
    };
  }
  static convertToEntity(dto: WebpageCategoryMainDto): WebpageCategoryMain {
    let res: WebpageCategoryMain = new WebpageCategoryMain();
    res.id = dto.id;
    res.version = dto.version;
    res.title = LanguagedString.convertToEntity(dto.title);
    res.content = LanguagedString.convertToEntity(dto.content);
    return res;
  }
  static convertListToDto(
    entityList: WebpageCategoryMain[]
  ): WebpageCategoryMainDto[] {
    let res: WebpageCategoryMainDto[] = [];
    for (let entity of entityList) {
      res.push(WebpageCategoryMain.convertToDto(entity));
    }
    return res;
  }
  static convertListToEntity(
    dtoList: WebpageCategoryMainDto[]
  ): WebpageCategoryMain[] {
    let res: WebpageCategoryMain[] = [];
    for (let entity of dtoList) {
      res.push(WebpageCategoryMain.convertToEntity(entity));
    }
    return res;
  }
  title: LanguagedString = new LanguagedString();
  content: LanguagedString = new LanguagedString();

  constructor() {
    super();
  }
}
