import * as mysql from "mysql";
import { IPool, ConnectionCallback, TransactionCallback } from "../pool";
import { CharSet } from "../../data-type";
import { IConnection, ITransactionConnection, SelectResult } from "../connection";
export declare class Connection implements IConnection, ITransactionConnection {
    private readonly connection;
    constructor(connection: mysql.PoolConnection);
    rollback(): Promise<void>;
    commit(): Promise<void>;
    private inTransaction;
    isInTransaction(): this is ITransactionConnection;
    transaction<ResultT>(callback: TransactionCallback<ResultT>): Promise<ResultT>;
    transactionIfNotInOne<ResultT>(callback: TransactionCallback<ResultT>): Promise<ResultT>;
    select(sql: string): Promise<SelectResult>;
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
}
//# sourceMappingURL=pool.d.ts.map