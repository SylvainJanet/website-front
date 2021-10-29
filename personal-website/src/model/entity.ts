export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

export interface EntityStatic<T, TDto> {
  new (): EntityInstance;
  convertToDto(entity: T): TDto;
  convertToEntity(dto: TDto): T;
  convertListToDto(entityList: T[]): TDto[];
  convertListToEntity(dtoList: TDto[]): T[];
}

interface EntityInstance {
  id?: number;
  version?: number;
}

export class Entity {
  id?: number;
  version?: number;
  constructor() {}
}
