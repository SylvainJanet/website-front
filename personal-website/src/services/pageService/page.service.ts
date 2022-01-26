import { LocalizedStringService } from './../localizedStringService/localized-string.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIFullURIPage } from 'src/constants/API/APIUriFull';
import { EntitiesDto } from 'src/interfaces/entitiesDto';
import { PageDto } from 'src/interfaces/pageDto';
import { GenericCrudService } from '../genericCrudService/genericCrudService';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root',
})
export class PageService extends GenericCrudService<PageDto> {
  log: LogService;
  constructor(
    protected http: HttpClient,
    protected logService: LogService,
    protected localizedStringService: LocalizedStringService
  ) {
    super(APIFullURIPage, logService, http);
    this.log = logService.withClassName(PageService.name);
  }

  public getAll(): Observable<EntitiesDto<PageDto>> {
    this.log.debug('getAllByEntity()');
    let url = this.apiUrl + '/' + APIFullURIPage.GETALL;
    this.log.debug('url', url);
    return this.http.get<EntitiesDto<PageDto>>(url).pipe(
      map((res: EntitiesDto<PageDto>) => {
        if (res && res.entities) {
          res.entities = res.entities.map((wcm) => {
            wcm.title = this.localizedStringService.getEntityWithMap(wcm.title);
            wcm.content = this.localizedStringService.getEntityWithMap(
              wcm.content
            );
            return wcm;
          });
        }
        return res;
      })
    );
  }
}
