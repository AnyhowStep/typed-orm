import { TransactionCallback, IPool } from "../pool";
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
export interface RawQueryResult {
    query: {
        sql: string;
    };
    results: any | undefined;
    fields: {
        [name: string]: IFieldInfo;
    } | undefined;
}
export interface SelectResult {
    query: {
        sql: string;
    };
    rows: any[];
    fields: {
        [name: string]: IFieldInfo;
    };
}
export interface InsertResult {
    fieldCount: number;
    affectedRows: number;
    insertId: bigint;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
    insertedRowCount: number;
}
export interface RawUpdateResult {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
    rawFoundRowCount: number;
    rawUpdatedRowCount: number;
}
export interface UpdateResult extends RawUpdateResult {
    updatedTableCount: number;
    foundRowCount: number;
}
export declare type UpdateZeroOrOneResult = (UpdateResult & ({
    foundRowCount: 0;
    updatedRowCount: 0;
} | {
    foundRowCount: 1;
    updatedRowCount: 0 | 1;
}));
export declare type UpdateOneResult = (UpdateResult & {
    foundRowCount: 1;
    updatedRowCount: 0 | 1;
});
export interface RawDeleteResult {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
    rawFoundRowCount: number;
    rawDeletedRowCount: number;
}
export interface DeleteResult extends RawDeleteResult {
    deletedTableCount: number;
}
export declare type DeleteZeroOrOneResult = (DeleteResult & ({
    foundRowCount: 0;
    deletedRowCount: 0;
} | {
    foundRowCount: 1;
    deletedRowCount: 1;
}));
export declare type DeleteOneResult = (DeleteResult & {
    foundRowCount: 1;
    deletedRowCount: 1;
});
export interface IConnection {
    readonly pool: IPool;
    isInTransaction(): this is ITransactionConnection;
    transaction<ResultT>(callback: TransactionCallback<ResultT>): Promise<ResultT>;
    transactionIfNotInOne<ResultT>(callback: TransactionCallback<ResultT>): Promise<ResultT>;
    rawQuery(sql: string): Promise<RawQueryResult>;
    select(sql: string): Promise<SelectResult>;
    insert(sql: string): Promise<InsertResult>;
    update(sql: string): Promise<RawUpdateResult>;
    delete(sql: string): Promise<RawDeleteResult>;
}
export interface ITransactionConnection extends IConnection {
    rollback(): Promise<void>;
    commit(): Promise<void>;
}
