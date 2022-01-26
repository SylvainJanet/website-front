import { LocalizedStringService } from '../localizedStringService/localized-string.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIFullURIMenuItem } from 'src/constants/API/APIUriFull';
import { MenuItemDto } from 'src/interfaces/menuItemDto';
import { GenericCrudService } from '../genericCrudService/genericCrudService';
import { LogService } from '../log/log.service';
import { Observable } from 'rxjs';
import { EntitiesDto } from 'src/interfaces/entitiesDto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MenuItemService extends GenericCrudService<MenuItemDto> {
  log: LogService;
  constructor(
    protected http: HttpClient,
    protected logService: LogService,
    private languagedStringService: LocalizedStringService
  ) {
    super(APIFullURIMenuItem, logService, http);
    this.log = logService.withClassName(MenuItemService.name);
  }

  public getAll(): Observable<EntitiesDto<MenuItemDto>> {
    this.log.debug('getAllByEntity()');
    let url = this.apiUrl + '/' + APIFullURIMenuItem.GETALL;
    this.log.debug('url', url);
    return this.http.get<EntitiesDto<MenuItemDto>>(url).pipe(
      map((res: EntitiesDto<MenuItemDto>) => {
        if (res && res.entities) {
          res.entities = res.entities.map((wmm) => {
            wmm.title = this.languagedStringService.getEntityWithMap(wmm.title);
            wmm.page.title = this.languagedStringService.getEntityWithMap(
              wmm.page.title
            );
            wmm.page.content = this.languagedStringService.getEntityWithMap(
              wmm.page.content
            );
            return wmm;
          });
        }
        return res;
      })
    );
  }
}
