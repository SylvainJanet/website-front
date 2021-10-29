import { staticImplements } from 'src/model/entity';
import { APIUriCRUD } from './APIUriCRUD';
import {
  APIURIController,
  APIURILanguagedString,
  APIURIWebpageCategoryMain,
  APIURIWebsiteMainMenu,
  APIURIWebsiteMainMenuItem,
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
export class APIFullURILanguagedString {
  static readonly GETALL = APIFullUriGeneric.getAll(APIURILanguagedString);
}

@staticImplements<APIFullURICRUD>()
export class APIFullURIWebpageCategoryMain {
  static readonly GETALL = APIFullUriGeneric.getAll(APIURIWebpageCategoryMain);
}

@staticImplements<APIFullURICRUD>()
export class APIFullURIWebsiteMainMenu {
  static readonly GETALL = APIFullUriGeneric.getAll(APIURIWebsiteMainMenu);
}

@staticImplements<APIFullURICRUD>()
export class APIFullURIWebsiteMainMenuItem {
  static readonly GETALL = APIFullUriGeneric.getAll(APIURIWebsiteMainMenuItem);

  static readonly GETALL_LEVEL1 = clean(
    APIURIWebsiteMainMenuItem.CONTROLLER +
      '/' +
      APIURIWebsiteMainMenuItem.GETALL_LEVEL1
  );

  static readonly GETALL_LEVEL2 = clean(
    APIURIWebsiteMainMenuItem.CONTROLLER +
      '/' +
      APIURIWebsiteMainMenuItem.GETALL_LEVEL2
  );
}
