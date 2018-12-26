import { IConnection, ITransactionConnection } from "../connection";
export declare type ConnectionCallback<ResultT> = ((connection: IConnection) => Promise<ResultT>);
export declare type TransactionCallback<ResultT> = ((connection: ITransactionConnection) => Promise<ResultT>);
export interface IPool {
    acquire<ResultT>(callback: ConnectionCallback<ResultT>): Promise<ResultT>;
    acquireTransaction<ResultT>(callback: TransactionCallback<ResultT>): Promise<ResultT>;
    disconnect(): Promise<void>;
}
//# sourceMappingURL=pool.d.ts.map