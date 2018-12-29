import {TransactionCallback} from "../pool";

//From "@types/mysql"
export const enum Types {
    DECIMAL = 0x00, // aka DECIMAL (http://dev.mysql.com/doc/refman/5.0/en/precision-math-decimal-changes.html)
    TINY = 0x01, // aka TINYINT, 1 byte
    SHORT = 0x02, // aka SMALLINT, 2 bytes
    LONG = 0x03, // aka INT, 4 bytes
    FLOAT = 0x04, // aka FLOAT, 4-8 bytes
    DOUBLE = 0x05, // aka DOUBLE, 8 bytes
    NULL = 0x06, // NULL (used for prepared statements, I think)
    TIMESTAMP = 0x07, // aka TIMESTAMP
    LONGLONG = 0x08, // aka BIGINT, 8 bytes
    INT24 = 0x09, // aka MEDIUMINT, 3 bytes
    DATE = 0x0a, // aka DATE
    TIME = 0x0b, // aka TIME
    DATETIME = 0x0c, // aka DATETIME
    YEAR = 0x0d, // aka YEAR, 1 byte (don't ask)
    NEWDATE = 0x0e, // aka ?
    VARCHAR = 0x0f, // aka VARCHAR (?)
    BIT = 0x10, // aka BIT, 1-8 byte
    TIMESTAMP2 = 0x11, // aka TIMESTAMP with fractional seconds
    DATETIME2 = 0x12, // aka DATETIME with fractional seconds
    TIME2 = 0x13, // aka TIME with fractional seconds
    JSON = 0xf5, // aka JSON
    NEWDECIMAL = 0xf6, // aka DECIMAL
    ENUM = 0xf7, // aka ENUM
    SET = 0xf8, // aka SET
    TINY_BLOB = 0xf9, // aka TINYBLOB, TINYTEXT
    MEDIUM_BLOB = 0xfa, // aka MEDIUMBLOB, MEDIUMTEXT
    LONG_BLOB = 0xfb, // aka LONGBLOG, LONGTEXT
    BLOB = 0xfc, // aka BLOB, TEXT
    VAR_STRING = 0xfd, // aka VARCHAR, VARBINARY
    STRING = 0xfe, // aka CHAR, BINARY
    GEOMETRY = 0xff, // aka GEOMETRY
}

//From "@types/mysql"
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
    query  : { sql : string },
    results : any|undefined,
    fields : {
        [name : string] : IFieldInfo
    }|undefined,
}
export interface SelectResult {
    query  : { sql : string },
    rows   : any[],
    fields : {
        [name : string] : IFieldInfo
    },
}
export interface InsertResult {
    fieldCount   : number;
    affectedRows : number;
    insertId     : bigint;
    serverStatus : number;
    warningCount : number;
    message      : string;
    protocol41   : boolean;
    changedRows  : number;
}
export interface UpdateResult {
    fieldCount   : number;
    affectedRows : number;
    insertId     : bigint;
    serverStatus : number;
    warningCount : number;
    message      : string;
    protocol41   : boolean;
    changedRows  : number;

    foundRowCount : number;
    updatedRowCount : number;
}

export interface IConnection {
    isInTransaction () : this is ITransactionConnection;
    transaction<ResultT> (
        callback : TransactionCallback<ResultT>
    ) : Promise<ResultT>;
    transactionIfNotInOne<ResultT> (
        callback : TransactionCallback<ResultT>
    ) : Promise<ResultT>;

    rawQuery (sql : string) : Promise<RawQueryResult>;
    select (sql : string) : Promise<SelectResult>;
    insert (sql : string) : Promise<InsertResult>;
    update (sql : string) : Promise<UpdateResult>;
    //TODO delete
}
export interface ITransactionConnection extends IConnection {
    rollback () : Promise<void>;
    commit () : Promise<void>;
}