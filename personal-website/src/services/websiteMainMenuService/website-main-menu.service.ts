import { LanguagedStringService } from './../languagedStringService/languaged-string.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIFullURIWebsiteMainMenu } from 'src/constants/API/APIUriFull';
import { EntitiesDto } from 'src/interfaces/entitiesDto';
import { WebsiteMainMenuDto } from 'src/interfaces/websiteMainMenuDto';
import { GenericCrudService } from '../genericCrudService/genericCrudService';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root',
})
export class WebsiteMainMenuService extends GenericCrudService<WebsiteMainMenuDto> {
  log: LogService;
  constructor(
    protected http: HttpClient,
    protected logService: LogService,
    private languagedStringService: LanguagedStringService
  ) {
    super(APIFullURIWebsiteMainMenu, logService, http);
    this.log = logService.withClassName(WebsiteMainMenuService.name);
  }

  public getAll(): Observable<EntitiesDto<WebsiteMainMenuDto>> {
    this.log.debug('getAllByEntity()');
    let url = this.apiUrl + '/' + APIFullURIWebsiteMainMenu.GETALL;
    this.log.debug('url', url);
    return this.http.get<EntitiesDto<WebsiteMainMenuDto>>(url).pipe(
      map((res: EntitiesDto<WebsiteMainMenuDto>) => {
        if (res && res.entities) {
          res.entities = res.entities.map((wmm) => {
            wmm.items = wmm.items.map((wmmi) => {
              wmmi.languagedTitle =
                this.languagedStringService.getEntityWithMap(
                  wmmi.languagedTitle
                );
              wmmi.webpageCategoryMain.title =
                this.languagedStringService.getEntityWithMap(
                  wmmi.webpageCategoryMain.title
                );
              wmmi.webpageCategoryMain.content =
                this.languagedStringService.getEntityWithMap(
                  wmmi.webpageCategoryMain.content
                );
              return wmmi;
            });
            return wmm;
          });
        }
        return res;
      })
    );
  }
}
