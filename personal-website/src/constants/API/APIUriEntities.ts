// static interface
interface APIURIEntityInstance {
  // myInstanceMethod(): any;
  // myVar: any;
}
export interface APIURIController {
  new (): APIURIEntityInstance;
  CONTROLLER: string;
  // myStaticMethod(): void;
}
export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}

// to use it in another class
// export class TESTINTERFACE {
//   myVar: APIURIController;
//   constructor(myVar: APIURIController) {
//     this.myVar = myVar;
//     console.log(myVar.CONTROLLER);
//     let a = new myVar();
//     a.myInstanceMethod();
//   }
// }

@staticImplements<APIURIController>()
export class APIURILanguagedString {
  static readonly CONTROLLER = 'api/languagedstring';
}

@staticImplements<APIURIController>()
export class APIURIWebpageCategoryMain {
  static readonly CONTROLLER = 'api/webpageCategoryMain';
}

@staticImplements<APIURIController>()
export class APIURIWebsiteMainMenu {
  static readonly CONTROLLER = 'api/websiteMainMenu';
}

@staticImplements<APIURIController>()
export class APIURIWebsiteMainMenuItem {
  static readonly CONTROLLER = 'api/websiteMainMenuItem';
  static readonly GETALL_LEVEL1 = 'l1';
  static readonly GETALL_LEVEL2 = 'l2';
}
