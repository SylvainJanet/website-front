import { map } from 'rxjs/operators';
import { LanguagedStringService } from './../languagedStringService/languaged-string.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIFullURIWebpageCategoryMain } from 'src/constants/API/APIUriFull';
import { EntitiesDto } from 'src/interfaces/entitiesDto';
import { WebpageCategoryMainDto } from 'src/interfaces/webpageCategoryMainDto';
import { GenericCrudService } from '../genericCrudService/genericCrudService';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root',
})
export class WebpageCategoryMainService extends GenericCrudService<WebpageCategoryMainDto> {
  log: LogService;
  constructor(
    protected http: HttpClient,
    protected logService: LogService,
    protected languagedStringService: LanguagedStringService
  ) {
    super(APIFullURIWebpageCategoryMain, logService, http);
    this.log = logService.withClassName(WebpageCategoryMainService.name);
  }

  public getAll(): Observable<EntitiesDto<WebpageCategoryMainDto>> {
    this.log.debug('getAllByEntity()');
    let url = this.apiUrl + '/' + APIFullURIWebpageCategoryMain.GETALL;
    this.log.debug('url', url);
    return this.http.get<EntitiesDto<WebpageCategoryMainDto>>(url).pipe(
      map((res: EntitiesDto<WebpageCategoryMainDto>) => {
        if (res && res.entities) {
          res.entities = res.entities.map((wcm) => {
            wcm.title = this.languagedStringService.getEntityWithMap(wcm.title);
            wcm.content = this.languagedStringService.getEntityWithMap(
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
