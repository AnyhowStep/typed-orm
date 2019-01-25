import { IConnection, UpdateOneResult } from "../../../execution";
import { ExecutableUpdate } from "../query";
export declare function executeUpdateOne(update: ExecutableUpdate, connection: IConnection): (Promise<UpdateOneResult>);
