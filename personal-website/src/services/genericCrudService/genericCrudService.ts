import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIFullURICRUD } from 'src/constants/API/APIUriFull';
import { environment } from 'src/environments/environment';
import { EntitiesDto } from 'src/interfaces/entitiesDto';
import { LogService } from '../log/log.service';

export class GenericCrudService<T> {
  log: LogService;

  apiUrl = environment.API;

  constructor(
    protected entityUri: APIFullURICRUD,
    protected logService: LogService,
    protected http: HttpClient
  ) {
    this.log = logService.withClassName(GenericCrudService.name);
  }

  public getAll(): Observable<EntitiesDto<T>> {
    this.log.debug('getAllByEntity()');
    let url = this.apiUrl + '/' + this.entityUri.GETALL;
    this.log.debug('url', url);
    return this.http.get<EntitiesDto<T>>(url);
  }
}
