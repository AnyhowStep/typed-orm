import {IConnection, ITransactionConnection} from "../connection";
import {EventImpl} from "../../event";
import {ITable} from "../../table";

export type ConnectionCallback<ResultT> = (
    (connection : IConnection) => Promise<ResultT>
);
export type TransactionCallback<ResultT> = (
    (connection : ITransactionConnection) => Promise<ResultT>
);
/*
    All connections must set @@SESSION.time_zone to "+00:00"
*/
export interface IPool {
    acquire<ResultT> (
        callback : ConnectionCallback<ResultT>
    ) : Promise<ResultT>;

    acquireTransaction<ResultT> (
        callback : TransactionCallback<ResultT>
    ) : Promise<ResultT>;

    disconnect () : Promise<void>;

    /**
     * Quick and dirty event system.
     */
    readonly onInsertAndFetch : EventImpl<{
        type : "insertAndFetch",
        table : ITable,
        connection : IConnection,
        row : Record<string, unknown>,
    }>;
    readonly onUpdateAndFetch : EventImpl<{
        type : "updateAndFetch",
        table : ITable,
        connection : IConnection,
        row : Record<string, unknown>,
    }>;
}