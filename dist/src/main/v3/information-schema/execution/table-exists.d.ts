import { IConnection } from "../../execution";
export declare function tableExists(connection: IConnection, tableName: string): Promise<boolean>;
