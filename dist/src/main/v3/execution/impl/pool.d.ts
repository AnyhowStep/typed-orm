import * as mysql from "mysql";
import { IPool, ConnectionCallback, TransactionCallback } from "../pool";
import { CharSet } from "../../data-type";
import { IConnection, ITransactionConnection, RawQueryResult, SelectResult, InsertResult, UpdateResult, DeleteResult } from "../connection";
export declare class Connection implements IConnection, ITransactionConnection {
    private readonly connection;
    constructor(connection: mysql.PoolConnection);
    rollback(): Promise<void>;
    commit(): Promise<void>;
    private inTransaction;
    isInTransaction(): this is ITransactionConnection;
    transaction<ResultT>(callback: TransactionCallback<ResultT>): Promise<ResultT>;
    transactionIfNotInOne<ResultT>(callback: TransactionCallback<ResultT>): Promise<ResultT>;
    rawQuery(sql: string): Promise<RawQueryResult>;
    select(sql: string): Promise<SelectResult>;
    insert(sql: string): Promise<InsertResult>;
    update(sql: string): Promise<UpdateResult>;
    delete(sql: string): Promise<DeleteResult>;
}
export interface PoolArgs {
    host: string;
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
}
//# sourceMappingURL=pool.d.ts.map