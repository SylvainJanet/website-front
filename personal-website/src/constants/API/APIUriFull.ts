import { staticImplements } from 'src/model/entity';
import { APIUriCRUD } from './APIUriCRUD';
import {
  APIURIController,
  APIURILocalizedString,
  APIURIPage,
  APIURIMenu,
  APIURIMenuItem,
} from './APIUriEntities';
import { APIUrisInitDB } from './APIUriOther';

function clean(uri: string) {
  if (uri.length == 0) {
    return uri;
  }
  if (uri[0] == '/') {
    uri = uri.substr(1);
  }
  if (uri[uri.length - 1] == '/') {
    uri = uri.substr(0, uri.length - 1);
  }
  return uri;
}

export class APIFullUriInitDB {
  static readonly RESET_DB = clean(
    APIUrisInitDB.CONTROLLER + '/' + APIUrisInitDB.RESET_DB
  );
}

class APIFullUriGeneric {
  static getAll(uri: APIURIController): string {
    return clean(uri.CONTROLLER + '/' + APIUriCRUD.GETALL);
  }
}

// see APIURiEntities.ts
interface APIFullURICRUDInstance {
  //myInstanceMethod(): any;
}
export interface APIFullURICRUD {
  new (): APIFullURICRUDInstance;
  GETALL: string;
}

@staticImplements<APIFullURICRUD>()
export class APIFullURILocalizedString {
  static readonly GETALL = APIFullUriGeneric.getAll(APIURILocalizedString);
}

@staticImplements<APIFullURICRUD>()
export class APIFullURIPage {
  static readonly GETALL = APIFullUriGeneric.getAll(APIURIPage);
}

@staticImplements<APIFullURICRUD>()
export class APIFullURIMenu {
  static readonly GETALL = APIFullUriGeneric.getAll(APIURIMenu);
}

@staticImplements<APIFullURICRUD>()
export class APIFullURIMenuItem {
  static readonly GETALL = APIFullUriGeneric.getAll(APIURIMenuItem);

  static readonly GETALL_LEVEL1 = clean(
    APIURIMenuItem.CONTROLLER + '/' + APIURIMenuItem.GETALL_LEVEL1
  );

  static readonly GETALL_LEVEL2 = clean(
    APIURIMenuItem.CONTROLLER + '/' + APIURIMenuItem.GETALL_LEVEL2
  );
}
