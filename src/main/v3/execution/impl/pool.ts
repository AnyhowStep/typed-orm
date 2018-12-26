import * as mysql from "mysql";
import {IPool, ConnectionCallback, TransactionCallback} from "../pool";
import {CharSet} from "../../data-type";
import {IConnection, ITransactionConnection, SelectResult} from "../connection";

export class Connection implements IConnection, ITransactionConnection {
    private readonly connection : mysql.PoolConnection;
    constructor (connection : mysql.PoolConnection) {
        this.connection = connection;
    }

    rollback () : Promise<void> {
        if (!this.isInTransaction()) {
            return Promise.reject(new Error("Not in transaction; cannot rollback"));
        }
        return new Promise<void>((resolve, reject) => {
            this.connection.rollback((err) => {
                if (err == undefined) {
                    this.inTransaction = false;
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }
    commit () : Promise<void> {
        if (!this.isInTransaction()) {
            return Promise.reject(new Error("Not in transaction; cannot commit"));
        }
        return new Promise<void>((resolve, reject) => {
            this.connection.commit((err) => {
                if (err == undefined) {
                    this.inTransaction = false;
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }

    private inTransaction = false;
    isInTransaction () : this is ITransactionConnection {
        return this.inTransaction;
    }
    transaction<ResultT> (
        callback : TransactionCallback<ResultT>
    ) : Promise<ResultT> {
        if (this.inTransaction) {
            return Promise.reject("Transaction already started");
        }
        this.inTransaction = true;
        return new Promise<ResultT>((resolve, reject) => {
            this.connection.beginTransaction((err) => {
                if (err != undefined) {
                    this.inTransaction = false;
                    reject(err);
                    return;
                }
                callback(this)
                    .then((result) => {
                        if (this.isInTransaction()) {
                            this.commit()
                                .then(() => {
                                    resolve(result);
                                })
                                .catch((commitErr) => {
                                    this.rollback()
                                        .then(() => {
                                            reject(commitErr);
                                        })
                                        .catch((rollBackErr) => {
                                            commitErr.rollBackErr = rollBackErr;
                                            reject(commitErr);
                                        });
                                });
                        } else {
                            resolve(result);
                        }
                    })
                    .catch((err) => {
                        if (this.isInTransaction()) {
                            this.rollback()
                                .then(() => {
                                    reject(err);
                                })
                                .catch((rollBackErr) => {
                                    err.rollBackErr = rollBackErr;
                                    reject(err);
                                });
                        } else {
                            reject(err);
                        }
                    });
            });
        });
    }
    transactionIfNotInOne<ResultT> (
        callback : TransactionCallback<ResultT>
    ) : Promise<ResultT> {
        if (this.inTransaction) {
            return callback(this);
        } else {
            return this.transaction(callback);
        }
    }

    select (sql : string) : Promise<SelectResult> {
        return new Promise<SelectResult>((resolve, reject) => {
            const query = this.connection.query(
                sql,
                (err, results, fields) => {
                    if (err != undefined) {
                        reject(err);
                        return;
                    }
                    if (results == undefined) {
                        reject(new Error(`Expected results`));
                        return;
                    }
                    if (fields == undefined) {
                        reject(new Error(`Expected fields`));
                        return;
                    }
                    if (!(results instanceof Array)) {
                        reject(new Error(`Expected results to be an array`));
                        return;
                    }
                    if (!(fields instanceof Array)) {
                        reject(new Error(`Expected fields to be an array`));
                        return;
                    }
                    resolve({
                        query,
                        rows   : results,
                        fields : fields as any,
                    });
                }
            );
        });
    }
}

export interface PoolArgs {
    host      : string;
    database  : string;
    user      : string;
    password  : string;
    charset   : CharSet;
}
export class Pool implements IPool {
    private readonly pool : mysql.Pool;
    constructor (args : PoolArgs) {
        this.pool = mysql.createPool({
            ...args,
            supportBigNumbers : true,
            /*
                Enabling both supportBigNumbers and bigNumberStrings
                forces big numbers (BIGINT and DECIMAL columns) to
                be always returned as JavaScript String objects.
            */
            bigNumberStrings : true,
            /*
                Force date types (TIMESTAMP, DATETIME, DATE) to be returned
                as strings rather than inflated into JavaScript Date objects.
            */
            dateStrings : true,
        });
    }
    acquire<ResultT> (
        callback : ConnectionCallback<ResultT>
    ) : Promise<ResultT> {
        return new Promise<ResultT>((resolve, reject) => {
            this.pool.getConnection((err, rawConnection) => {
                if (err != undefined) {
                    reject(err);
                    return;
                }
                const connection = new Connection(rawConnection);
                const result = callback(connection);
                rawConnection.release();
                resolve(result);
            });
        });
    }

    acquireTransaction<ResultT> (
        callback : TransactionCallback<ResultT>
    ) : Promise<ResultT> {
        return this.acquire((connection) => {
            return connection.transaction((transactionConnection) => {
                return callback(transactionConnection);
            })
        });
    }
}