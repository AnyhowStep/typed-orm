import { IConnection, UpdateResult } from "../../../execution";
import { ExecutableUpdate } from "../query";
export declare function execute(update: ExecutableUpdate, connection: IConnection): (Promise<UpdateResult>);
