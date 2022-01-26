import { PageDto } from 'src/interfaces/pageDto';
import { Entity, EntityStatic, staticImplements } from './entity';
import { LocalizedString } from './localizedString';

@staticImplements<EntityStatic<Page, PageDto>>()
export class Page extends Entity {
  static convertToDto(entity: Page): PageDto {
    return {
      id: entity.id,
      version: entity.version,
      title: LocalizedString.convertToDto(entity.title),
      content: LocalizedString.convertToDto(entity.content),
    };
  }
  static convertToEntity(dto: PageDto): Page {
    let res: Page = new Page();
    res.id = dto.id;
    res.version = dto.version;
    res.title = LocalizedString.convertToEntity(dto.title);
    res.content = LocalizedString.convertToEntity(dto.content);
    return res;
  }
  static convertListToDto(entityList: Page[]): PageDto[] {
    let res: PageDto[] = [];
    for (let entity of entityList) {
      res.push(Page.convertToDto(entity));
    }
    return res;
  }
  static convertListToEntity(dtoList: PageDto[]): Page[] {
    let res: Page[] = [];
    for (let entity of dtoList) {
      res.push(Page.convertToEntity(entity));
    }
    return res;
  }
  title: LocalizedString = new LocalizedString();
  content: LocalizedString = new LocalizedString();

  constructor() {
    super();
  }
}
