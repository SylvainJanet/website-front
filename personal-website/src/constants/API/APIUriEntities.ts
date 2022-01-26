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
export class APIURILocalizedString {
  static readonly CONTROLLER = 'api/localizedstring';
}

@staticImplements<APIURIController>()
export class APIURIPage {
  static readonly CONTROLLER = 'api/page';
}

@staticImplements<APIURIController>()
export class APIURIMenu {
  static readonly CONTROLLER = 'api/menu';
}

@staticImplements<APIURIController>()
export class APIURIMenuItem {
  static readonly CONTROLLER = 'api/menuItem';
  static readonly GETALL_LEVEL1 = 'l1';
  static readonly GETALL_LEVEL2 = 'l2';
}
