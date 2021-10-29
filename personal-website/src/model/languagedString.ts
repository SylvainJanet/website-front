import { SupportedLanguages } from 'src/constants/languages/supportedLanguages';
import { LanguagedStringDto } from 'src/interfaces/languagedStringDto';
import { Entity, EntityStatic, staticImplements } from './entity';

@staticImplements<EntityStatic<LanguagedString, LanguagedStringDto>>()
export class LanguagedString extends Entity {
  static convertToDto(entity: LanguagedString): LanguagedStringDto {
    return {
      id: entity.id,
      version: entity.version,
      strings: entity.strings,
    };
  }
  static convertToEntity(dto: LanguagedStringDto): LanguagedString {
    let res: LanguagedString = new LanguagedString();
    res.id = dto.id;
    res.version = dto.version;
    res.strings = dto.strings;
    return res;
  }
  static convertListToDto(entityList: LanguagedString[]): LanguagedStringDto[] {
    let res: LanguagedStringDto[] = [];
    for (let entity of entityList) {
      res.push(LanguagedString.convertToDto(entity));
    }
    return res;
  }
  static convertListToEntity(dtoList: LanguagedStringDto[]): LanguagedString[] {
    let res: LanguagedString[] = [];
    for (let entity of dtoList) {
      res.push(LanguagedString.convertToEntity(entity));
    }
    return res;
  }
  strings: Map<SupportedLanguages, string> = new Map<
    SupportedLanguages,
    string
  >();

  constructor() {
    super();
  }
}
