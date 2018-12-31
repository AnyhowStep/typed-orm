"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class Connection {
    constructor(connection) {
        this.inTransaction = false;
        this.connection = connection;
    }
    rollback() {
        if (!this.isInTransaction()) {
            return Promise.reject(new Error("Not in transaction; cannot rollback"));
        }
        return new Promise((resolve, reject) => {
            this.connection.rollback((err) => {
                if (err == undefined) {
                    this.inTransaction = false;
                    resolve();
                }
                else {
                    reject(err);
                }
            });
        });
    }
    commit() {
        if (!this.isInTransaction()) {
            return Promise.reject(new Error("Not in transaction; cannot commit"));
        }
        return new Promise((resolve, reject) => {
            this.connection.commit((err) => {
                if (err == undefined) {
                    this.inTransaction = false;
                    resolve();
                }
                else {
                    reject(err);
                }
            });
        });
    }
    isInTransaction() {
        return this.inTransaction;
    }
    transaction(callback) {
        if (this.inTransaction) {
            return Promise.reject("Transaction already started");
        }
        this.inTransaction = true;
        return new Promise((resolve, reject) => {
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
                    }
                    else {
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
                    }
                    else {
                        reject(err);
                    }
                });
            });
        });
    }
    transactionIfNotInOne(callback) {
        if (this.inTransaction) {
            return callback(this);
        }
        else {
            return this.transaction(callback);
        }
    }
    rawQuery(sql) {
        return new Promise((resolve, reject) => {
            const query = this.connection.query(sql, (err, results, fieldArr) => {
                if (err != undefined) {
                    reject(err);
                    return;
                }
                if (fieldArr == undefined) {
                    resolve({
                        query,
                        results,
                        fields: undefined,
                    });
                }
                else {
                    const fieldObj = {};
                    for (let f of fieldArr) {
                        fieldObj[f.name] = f;
                    }
                    resolve({
                        query,
                        results,
                        fields: fieldObj,
                    });
                }
            });
        });
    }
    select(sql) {
        return new Promise((resolve, reject) => {
            const query = this.connection.query(sql, (err, results, fieldArr) => {
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
                const fieldObj = {};
                for (let f of fieldArr) {
                    fieldObj[f.name] = f;
                }
                resolve({
                    query,
                    rows: results,
                    fields: fieldObj,
                });
            });
        });
    }
    insert(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, results) => {
                if (err != undefined) {
                    reject(err);
                    return;
                }
                if (results == undefined) {
                    reject(new Error(`Expected results`));
                    return;
                }
                resolve({
                    ...results,
                    insertId: BigInt(results.insertId),
                    insertedRowCount: results.affectedRows,
                });
            });
        });
    }
    update(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, results) => {
                if (err != undefined) {
                    reject(err);
                    return;
                }
                if (results == undefined) {
                    reject(new Error(`Expected results`));
                    return;
                }
                resolve({
                    ...results,
                    rawFoundRowCount: results.affectedRows,
                    rawUpdatedRowCount: results.changedRows,
                });
            });
        });
    }
    delete(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, results) => {
                if (err != undefined) {
                    reject(err);
                    return;
                }
                if (results == undefined) {
                    reject(new Error(`Expected results`));
                    return;
                }
                resolve({
                    ...results,
                    foundRowCount: results.affectedRows + results.warningCount,
                    deletedRowCount: results.affectedRows,
                });
            });
        });
    }
}
exports.Connection = Connection;
class Pool {
    constructor(args) {
        this.pool = mysql.createPool({
            ...args,
            supportBigNumbers: true,
            /*
                Enabling both supportBigNumbers and bigNumberStrings
                forces big numbers (BIGINT and DECIMAL columns) to
                be always returned as JavaScript String objects.
            */
            bigNumberStrings: true,
            /*
                Force date types (TIMESTAMP, DATETIME, DATE) to be returned
                as strings rather than inflated into JavaScript Date objects.
            */
            dateStrings: true,
        });
    }
    acquire(callback) {
        return new Promise((resolve, reject) => {
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
    acquireTransaction(callback) {
        return this.acquire((connection) => {
            return connection.transaction((transactionConnection) => {
                return callback(transactionConnection);
            });
        });
    }
    disconnect() {
        return new Promise((resolve, reject) => {
            this.pool.end((err) => {
                if (err == undefined) {
                    resolve();
                }
                else {
                    reject(err);
                }
            });
        });
    }
}
exports.Pool = Pool;
//# sourceMappingURL=pool.js.map