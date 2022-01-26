import { LocalizedStringService } from '../localizedStringService/localized-string.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIFullURIMenu } from 'src/constants/API/APIUriFull';
import { EntitiesDto } from 'src/interfaces/entitiesDto';
import { MenuDto } from 'src/interfaces/menuDto';
import { GenericCrudService } from '../genericCrudService/genericCrudService';
import { LogService } from '../log/log.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService extends GenericCrudService<MenuDto> {
  log: LogService;
  constructor(
    protected http: HttpClient,
    protected logService: LogService,
    private languagedStringService: LocalizedStringService
  ) {
    super(APIFullURIMenu, logService, http);
    this.log = logService.withClassName(MenuService.name);
  }

  public getAll(): Observable<EntitiesDto<MenuDto>> {
    this.log.debug('getAllByEntity()');
    let url = this.apiUrl + '/' + APIFullURIMenu.GETALL;
    this.log.debug('url', url);
    return this.http.get<EntitiesDto<MenuDto>>(url).pipe(
      map((res: EntitiesDto<MenuDto>) => {
        if (res && res.entities) {
          res.entities = res.entities.map((wmm) => {
            wmm.items = wmm.items.map((wmmi) => {
              wmmi.title = this.languagedStringService.getEntityWithMap(
                wmmi.title
              );
              wmmi.page.title = this.languagedStringService.getEntityWithMap(
                wmmi.page.title
              );
              wmmi.page.content = this.languagedStringService.getEntityWithMap(
                wmmi.page.content
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
