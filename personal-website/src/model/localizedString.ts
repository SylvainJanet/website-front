import { SupportedLanguage } from 'src/constants/languages/supportedLanguage';
import { LocalizedStringDto } from 'src/interfaces/localizedStringDto';
import { Entity, EntityStatic, staticImplements } from './entity';

@staticImplements<EntityStatic<LocalizedString, LocalizedStringDto>>()
export class LocalizedString extends Entity {
  static convertToDto(entity: LocalizedString): LocalizedStringDto {
    return {
      id: entity.id,
      version: entity.version,
      strings: entity.strings,
    };
  }
  static convertToEntity(dto: LocalizedStringDto): LocalizedString {
    let res: LocalizedString = new LocalizedString();
    res.id = dto.id;
    res.version = dto.version;
    res.strings = dto.strings;
    return res;
  }
  static convertListToDto(entityList: LocalizedString[]): LocalizedStringDto[] {
    let res: LocalizedStringDto[] = [];
    for (let entity of entityList) {
      res.push(LocalizedString.convertToDto(entity));
    }
    return res;
  }
  static convertListToEntity(dtoList: LocalizedStringDto[]): LocalizedString[] {
    let res: LocalizedString[] = [];
    for (let entity of dtoList) {
      res.push(LocalizedString.convertToEntity(entity));
    }
    return res;
  }
  strings: Map<SupportedLanguage, string> = new Map<
    SupportedLanguage,
    string
  >();

  constructor() {
    super();
  }
}
