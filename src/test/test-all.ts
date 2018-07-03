import "./add";
import "./aggregate-multi-promise";
import "./aggregate-multi";
import "./delete-zero-or-one-by-unique-key";
import "./exists";
import "./fetch-value-by-unique-key";
import "./if";
import "./insert-and-fetch-with-unique-key";
import "./insert-ignore";
import "./log-table";
import "./log";
import "./multi-column-join-using";
import "./negate-if-false";
import "./polymorphic-insert-and-fetch";
import "./polymorphic-update-zero-or-one-by-unique-key";
import "./sub";
import "./timestamp-add";
import "./timestamp-diff";
import {dbTest} from "./db";
dbTest("free pool", async (t, db) => {
    await new Promise((resolve, reject) => {
        db.getPool().end((err) => {
            if (err != undefined) {
                reject(err);
            } else {
                t.ok(true, "Ended connection");
                resolve();
            }
        })
    });
})