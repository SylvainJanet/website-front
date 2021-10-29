import { staticImplements } from 'src/model/entity';
import { APIURIController } from './APIUriEntities';

@staticImplements<APIURIController>()
export class APIUrisInitDB {
  static readonly CONTROLLER = 'api/initDb';
  static readonly RESET_DB = 'reset';
}
