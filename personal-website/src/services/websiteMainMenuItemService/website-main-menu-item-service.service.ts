import { LanguagedStringService } from './../languagedStringService/languaged-string.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIFullURIWebsiteMainMenuItem } from 'src/constants/API/APIUriFull';
import { WebsiteMainMenuItemDto } from 'src/interfaces/websiteMainMenuItemDto';
import { GenericCrudService } from '../genericCrudService/genericCrudService';
import { LogService } from '../log/log.service';
import { Observable } from 'rxjs';
import { EntitiesDto } from 'src/interfaces/entitiesDto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WebsiteMainMenuItemService extends GenericCrudService<WebsiteMainMenuItemDto> {
  log: LogService;
  constructor(
    protected http: HttpClient,
    protected logService: LogService,
    private languagedStringService: LanguagedStringService
  ) {
    super(APIFullURIWebsiteMainMenuItem, logService, http);
    this.log = logService.withClassName(WebsiteMainMenuItemService.name);
  }

  public getAll(): Observable<EntitiesDto<WebsiteMainMenuItemDto>> {
    this.log.debug('getAllByEntity()');
    let url = this.apiUrl + '/' + APIFullURIWebsiteMainMenuItem.GETALL;
    this.log.debug('url', url);
    return this.http.get<EntitiesDto<WebsiteMainMenuItemDto>>(url).pipe(
      map((res: EntitiesDto<WebsiteMainMenuItemDto>) => {
        if (res && res.entities) {
          res.entities = res.entities.map((wmm) => {
            wmm.languagedTitle = this.languagedStringService.getEntityWithMap(
              wmm.languagedTitle
            );
            wmm.webpageCategoryMain.title =
              this.languagedStringService.getEntityWithMap(
                wmm.webpageCategoryMain.title
              );
            wmm.webpageCategoryMain.content =
              this.languagedStringService.getEntityWithMap(
                wmm.webpageCategoryMain.content
              );
            return wmm;
          });
        }
        return res;
      })
    );
  }
}
