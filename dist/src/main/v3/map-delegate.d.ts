import { IConnection } from "./execution";
export declare type MapDelegate<RowT = any, OriginalRowT = any, ReturnT = any> = ((row: RowT, connection: IConnection, originalRow: OriginalRowT) => ReturnT);
