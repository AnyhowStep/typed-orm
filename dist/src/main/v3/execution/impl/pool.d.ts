import * as mysql from "mysql";
import { IPool, ConnectionCallback, TransactionCallback } from "../pool";
import { CharSet } from "../../data-type";
import { IConnection, ITransactionConnection, RawQueryResult, SelectResult, InsertResult, RawUpdateResult, RawDeleteResult } from "../connection";
import { Omit } from "../../type";
import { EventImpl } from "../../event";
import { ITable } from "../../table";
export declare class Connection implements IConnection, ITransactionConnection {
    readonly pool: IPool;
    private readonly connection;
    constructor(pool: IPool, connection: mysql.PoolConnection);
    rollback(): Promise<void>;
    commit(): Promise<void>;
    private inTransaction;
    isInTransaction(): this is ITransactionConnection;
    transaction<ResultT>(callback: TransactionCallback<ResultT>): Promise<ResultT>;
    transactionIfNotInOne<ResultT>(callback: TransactionCallback<ResultT>): Promise<ResultT>;
    rawQuery(sql: string): Promise<RawQueryResult>;
    select(sql: string): Promise<SelectResult>;
    insert(sql: string): Promise<InsertResult>;
    update(sql: string): Promise<RawUpdateResult>;
    delete(sql: string): Promise<RawDeleteResult>;
}
export interface PoolArgs extends Omit<mysql.PoolConfig, "supportBigNumbers" | "bigNumberStrings" | "dateStrings"> {
    host: string;
    port?: number;
    database: string;
    user: string;
    password: string;
    charset: CharSet;
}
export declare class Pool implements IPool {
    private readonly pool;
    constructor(args: PoolArgs);
    acquire<ResultT>(callback: ConnectionCallback<ResultT>): Promise<ResultT>;
    acquireTransaction<ResultT>(callback: TransactionCallback<ResultT>): Promise<ResultT>;
    disconnect(): Promise<void>;
    readonly onInsertAndFetch: EventImpl<{
        type: "insertAndFetch";
        table: ITable<import("../../table").TableData>;
        connection: IConnection;
        row: Record<string, unknown>;
    }>;
    readonly onUpdateAndFetch: EventImpl<{
        type: "updateAndFetch";
        table: ITable<import("../../table").TableData>;
        connection: IConnection;
        row: Record<string, unknown>;
    }>;
}
