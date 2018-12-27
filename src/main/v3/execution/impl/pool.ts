import * as mysql from "mysql";
import {IPool, ConnectionCallback, TransactionCallback} from "../pool";
import {CharSet} from "../../data-type";
import {
    IConnection,
    ITransactionConnection,
    RawQueryResult,
    SelectResult,
    InsertResult
} from "../connection";

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

    rawQuery (sql : string) : Promise<RawQueryResult> {
        return new Promise<RawQueryResult>((resolve, reject) => {
            const query = this.connection.query(
                sql,
                (err, results, fieldArr) => {
                    if (err != undefined) {
                        reject(err);
                        return;
                    }
                    if (fieldArr == undefined) {
                        resolve({
                            query,
                            results,
                            fields : undefined,
                        });
                    } else {
                        const fieldObj : any = {};
                        for (let f of fieldArr) {
                            fieldObj[f.name] = f;
                        }
                        resolve({
                            query,
                            results,
                            fields : fieldObj,
                        });
                    }
                }
            );
        });
    }
    select (sql : string) : Promise<SelectResult> {
        return new Promise<SelectResult>((resolve, reject) => {
            const query = this.connection.query(
                sql,
                (err, results, fieldArr) => {
                    if (err != undefined) {
                        reject(err);
                        return;
                    }
                    if (results == undefined) {
                        reject(new Error(`Expected results`));
                        return;
                    }
                    if (fieldArr == undefined) {
                        reject(new Error(`Expected fields`));
                        return;
                    }
                    if (!(results instanceof Array)) {
                        reject(new Error(`Expected results to be an array`));
                        return;
                    }
                    if (!(fieldArr instanceof Array)) {
                        reject(new Error(`Expected fields to be an array`));
                        return;
                    }
                    const fieldObj : any = {};
                    for (let f of fieldArr) {
                        fieldObj[f.name] = f;
                    }
                    resolve({
                        query,
                        rows   : results,
                        fields : fieldObj,
                    });
                }
            );
        });
    }
    insert (sql : string) : Promise<InsertResult> {
        return new Promise<InsertResult>((resolve, reject) => {
            this.connection.query(
                sql,
                (err, results) => {
                    if (err != undefined) {
                        reject(err);
                        return;
                    }
                    if (results == undefined) {
                        reject(new Error(`Expected results`));
                        return;
                    }
                    resolve(results);
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
                connection.rawQuery("SET @@session.time_zone = '+00:00'")
                    .then(() => {
                        callback(connection)
                            .then((result) => {
                                rawConnection.release();
                                resolve(result);
                            })
                            .catch((err) => {
                                rawConnection.release();
                                reject(err);
                            });
                    })
                    .catch((err) => {
                        rawConnection.release();
                        reject(err);
                    });
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

    disconnect () : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.pool.end((err) => {
                if (err == undefined) {
                    resolve();
                } else {
                    reject(err);
                }
            });
        });
    }
}