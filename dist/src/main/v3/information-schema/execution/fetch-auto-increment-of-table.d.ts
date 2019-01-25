import { IConnection } from "../../execution";
export declare function fetchAutoIncrementOfTable(connection: IConnection, tableName: string): Promise<bigint | null>;
