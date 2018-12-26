import { TransactionCallback } from "../pool";
export declare const enum Types {
    DECIMAL = 0,
    TINY = 1,
    SHORT = 2,
    LONG = 3,
    FLOAT = 4,
    DOUBLE = 5,
    NULL = 6,
    TIMESTAMP = 7,
    LONGLONG = 8,
    INT24 = 9,
    DATE = 10,
    TIME = 11,
    DATETIME = 12,
    YEAR = 13,
    NEWDATE = 14,
    VARCHAR = 15,
    BIT = 16,
    TIMESTAMP2 = 17,
    DATETIME2 = 18,
    TIME2 = 19,
    JSON = 245,
    NEWDECIMAL = 246,
    ENUM = 247,
    SET = 248,
    TINY_BLOB = 249,
    MEDIUM_BLOB = 250,
    LONG_BLOB = 251,
    BLOB = 252,
    VAR_STRING = 253,
    STRING = 254,
    GEOMETRY = 255
}
export interface IFieldInfo {
    catalog: string;
    db: string;
    table: string;
    orgTable: string;
    name: string;
    orgName: string;
    charsetNr: number;
    length: number;
    type: Types;
    flags: number;
    decimals: number;
    default?: string;
    zeroFill: boolean;
    protocol41: boolean;
}
export interface SelectResult {
    query: {
        sql: string;
    };
    rows: any[];
    fields: IFieldInfo[];
}
export interface IConnection {
    isInTransaction(): this is ITransactionConnection;
    transaction<ResultT>(callback: TransactionCallback<ResultT>): Promise<ResultT>;
    transactionIfNotInOne<ResultT>(callback: TransactionCallback<ResultT>): Promise<ResultT>;
    select(sql: string): Promise<SelectResult>;
}
export interface ITransactionConnection extends IConnection {
    rollback(): Promise<void>;
    commit(): Promise<void>;
}
//# sourceMappingURL=connection.d.ts.map