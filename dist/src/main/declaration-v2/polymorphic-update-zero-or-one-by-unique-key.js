"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const raw_expr_1 = require("./raw-expr");
const unique_key_collection_1 = require("./unique-key-collection");
function polymorphicUpdateZeroOrOneByUniqueKey(db, table, uniqueKey, setDelegate) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.transactionIfNotInOne((db) => __awaiter(this, void 0, void 0, function* () {
            let s = db.from(table);
            if (table.data.parentTables != undefined) {
                //So we don't join to the same table multiple times
                const alreadyJoined = new Set();
                alreadyJoined.add(table.alias);
                let prv = table;
                for (let i = table.data.parentTables.length - 1; i >= 0; --i) {
                    const cur = table.data.parentTables[i];
                    if (alreadyJoined.has(cur.alias)) {
                        continue;
                    }
                    alreadyJoined.add(cur.alias);
                    const prvUniqueKeys = prv.data.uniqueKeys;
                    const curUniqueKeys = cur.data.uniqueKeys;
                    if (prvUniqueKeys == undefined) {
                        throw new Error(`${prv.alias} has no unique keys`);
                    }
                    if (curUniqueKeys == undefined) {
                        throw new Error(`${cur.alias} has no unique keys`);
                    }
                    const commonUniqueKeys = unique_key_collection_1.UniqueKeyCollectionUtil.commonUniqueKeys(prvUniqueKeys, curUniqueKeys);
                    if (commonUniqueKeys.length == 0) {
                        throw new Error(`${prv.alias} and ${cur.alias} have no unique keys in common`);
                    }
                    const uniqueKey = commonUniqueKeys[0];
                    if (i == table.data.parentTables.length - 1) {
                        s = s.joinUsing(cur, (c) => Object.keys(uniqueKey)
                            .map((columnName) => c[columnName]));
                    }
                    else {
                        s = s.joinUsing(cur, (c) => Object.keys(uniqueKey)
                            .map((columnName) => {
                            //Find the best table to use for the join
                            if (table.columns.hasOwnProperty(columnName)) {
                                return c[table.alias][columnName];
                            }
                            else {
                                for (let j = table.data.parentTables.length - 1; j >= 0; --j) {
                                    const p = table.data.parentTables[j];
                                    if (p.columns.hasOwnProperty(columnName)) {
                                        return c[p.alias][columnName];
                                    }
                                }
                                throw new Error(`No table in the inheritance hierarchy of ${table.alias} has column ${columnName}`);
                            }
                        }));
                    }
                    prv = cur;
                }
            }
            s = s.where(() => raw_expr_1.RawExprUtil.toUniqueKeyEqualityCondition(table, uniqueKey));
            if (table.data.parentTables != undefined) {
                //So we don't check the same table multiple times
                const alreadyChecked = new Set();
                alreadyChecked.add(table.alias);
                for (let parent of table.data.parentTables) {
                    if (alreadyChecked.has(parent.alias)) {
                        continue;
                    }
                    alreadyChecked.add(parent.alias);
                    //We already have the unique row.
                    //If columns of the parent tables are supplied,
                    //That just means we want the unique row to satisfy
                    //some conditions, to update.
                    s = s.where(() => raw_expr_1.RawExprUtil.toEqualityCondition(parent, uniqueKey));
                }
            }
            const tablesToUpdate = new Set();
            const updateResult = yield s.set((c) => {
                const assignments = setDelegate(c);
                const result = {};
                const tables = [table];
                if (table.data.parentTables != undefined) {
                    tables.push(...table.data.parentTables);
                }
                for (let columnName in assignments) {
                    const value = assignments[columnName];
                    for (let t of tables) {
                        if (t.columns.hasOwnProperty(columnName)) {
                            if (result[t.alias] == undefined) {
                                result[t.alias] = {};
                            }
                            result[t.alias][columnName] = value;
                            if (value !== undefined) {
                                tablesToUpdate.add(t.alias);
                            }
                        }
                    }
                }
                return result;
            }).execute();
            const expectedFoundRowCount = tablesToUpdate.size;
            if (updateResult.foundRowCount > 0 &&
                updateResult.foundRowCount != expectedFoundRowCount) {
                //Should not be possible
                throw new Error(`Expected to find zero or ${expectedFoundRowCount} rows from the inheritance hierarchy of ${table.alias}, with unique key ${Object.keys(uniqueKey).join(", ")}; found ${updateResult.foundRowCount} rows`);
            }
            if (updateResult.foundRowCount < 0) {
                //No update was even attempted, probably an empty SET clause
                const exists = yield s.exists();
                if (exists) {
                    return Object.assign({}, updateResult, { exists: true });
                }
                else {
                    return Object.assign({}, updateResult, { exists: false });
                }
            }
            return Object.assign({}, updateResult, { exists: (updateResult.foundRowCount > 0) ?
                    true :
                    false });
        }));
    });
}
exports.polymorphicUpdateZeroOrOneByUniqueKey = polymorphicUpdateZeroOrOneByUniqueKey;
//# sourceMappingURL=polymorphic-update-zero-or-one-by-unique-key.js.map