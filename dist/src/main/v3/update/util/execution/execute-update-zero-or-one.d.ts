import { IConnection, UpdateZeroOrOneResult } from "../../../execution";
import { ExecutableUpdate } from "../query";
export declare function executeUpdateZeroOrOne(update: ExecutableUpdate, connection: IConnection): (Promise<UpdateZeroOrOneResult>);
