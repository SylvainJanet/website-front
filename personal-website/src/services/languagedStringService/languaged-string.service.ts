import { SupportedLanguages } from './../../constants/languages/supportedLanguages';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIFullURILanguagedString } from 'src/constants/API/APIUriFull';
import { EntitiesDto } from 'src/interfaces/entitiesDto';
import { LanguagedStringDto } from 'src/interfaces/languagedStringDto';
import { GenericCrudService } from '../genericCrudService/genericCrudService';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root',
})
export class LanguagedStringService extends GenericCrudService<LanguagedStringDto> {
  log: LogService;
  constructor(protected http: HttpClient, protected logService: LogService) {
    super(APIFullURILanguagedString, logService, http);
    this.log = logService.withClassName(LanguagedStringService.name);
  }

  public getEntityWithMap(entity: LanguagedStringDto): LanguagedStringDto {
    entity.strings = new Map<SupportedLanguages, string>(
      Object.entries(entity.strings).map((entry) => [
        (<any>SupportedLanguages)[entry[0]],
        entry[1],
      ])
    );
    return entity;
  }

  public getEntitiesWithMap(
    lst: EntitiesDto<LanguagedStringDto>
  ): EntitiesDto<LanguagedStringDto> {
    if (lst && lst.entities) {
      lst.entities = lst.entities.map((ls) => {
        ls.strings = new Map<SupportedLanguages, string>(
          Object.entries(ls.strings).map((entry) => [
            (<any>SupportedLanguages)[entry[0]],
            entry[1],
          ])
        );
        return ls;
      });
    }
    return lst;
  }

  public getAll(): Observable<EntitiesDto<LanguagedStringDto>> {
    this.log.debug('getAllByEntity()');
    let url = this.apiUrl + '/' + APIFullURILanguagedString.GETALL;
    this.log.debug('url', url);
    return this.http.get<EntitiesDto<LanguagedStringDto>>(url).pipe(
      map((res: EntitiesDto<LanguagedStringDto>) => {
        return this.getEntitiesWithMap(res);
      })
    );
  }
}
