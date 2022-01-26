import { SupportedLanguage } from '../../constants/languages/supportedLanguage';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIFullURILocalizedString } from 'src/constants/API/APIUriFull';
import { EntitiesDto } from 'src/interfaces/entitiesDto';
import { LocalizedStringDto } from 'src/interfaces/localizedStringDto';
import { GenericCrudService } from '../genericCrudService/genericCrudService';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root',
})
export class LocalizedStringService extends GenericCrudService<LocalizedStringDto> {
  log: LogService;
  constructor(protected http: HttpClient, protected logService: LogService) {
    super(APIFullURILocalizedString, logService, http);
    this.log = logService.withClassName(LocalizedStringService.name);
  }

  public getEntityWithMap(entity: LocalizedStringDto): LocalizedStringDto {
    entity.strings = new Map<SupportedLanguage, string>(
      Object.entries(entity.strings).map((entry) => [
        (<any>SupportedLanguage)[entry[0]],
        entry[1],
      ])
    );
    return entity;
  }

  public getEntitiesWithMap(
    lst: EntitiesDto<LocalizedStringDto>
  ): EntitiesDto<LocalizedStringDto> {
    if (lst && lst.entities) {
      lst.entities = lst.entities.map((ls) => {
        ls.strings = new Map<SupportedLanguage, string>(
          Object.entries(ls.strings).map((entry) => [
            (<any>SupportedLanguage)[entry[0]],
            entry[1],
          ])
        );
        return ls;
      });
    }
    return lst;
  }

  public getAll(): Observable<EntitiesDto<LocalizedStringDto>> {
    this.log.debug('getAllByEntity()');
    let url = this.apiUrl + '/' + APIFullURILocalizedString.GETALL;
    this.log.debug('url', url);
    return this.http.get<EntitiesDto<LocalizedStringDto>>(url).pipe(
      map((res: EntitiesDto<LocalizedStringDto>) => {
        return this.getEntitiesWithMap(res);
      })
    );
  }
}
