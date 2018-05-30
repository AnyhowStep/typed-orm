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
const table_parent_collection_1 = require("./table-parent-collection");
const sd = require("schema-decorator");
function polymorphicInsertValueAndFetch(db, table, row) {
    return __awaiter(this, void 0, void 0, function* () {
        if (table.data.parentTables == undefined) {
            //No parents, just a regular insertion
            return db.insertValueAndFetch(table, row);
        }
        else {
            row = Object.assign({}, row);
            //Find all values of generated columns
            //They must be numeric natural number strings, because they
            //must represent enum values
            for (let g of table_parent_collection_1.TableParentCollectionUtil.generatedColumnNames(table)) {
                const column = table_parent_collection_1.TableParentCollectionUtil.tryGetGeneratedNonAutoIncrementColumn(table, g);
                if (column == undefined) {
                    //TODO insert a check for auto-increment columns
                    //If it is an auto-increment column, we don't want the column.
                    //If it is not auto-increment, it is an error to not have a value.
                    //For now, the lack of a value will cause insertion to fail anyway
                    continue;
                }
                const expression = yield db.getGenerationExpression(column);
                console.log(expression);
                console.log(column.tableAlias, column.name);
                row[g] = sd.stringToNaturalNumber()(g, expression);
            }
            return db.transaction((db) => __awaiter(this, void 0, void 0, function* () {
                //In the event of diamond inheritance,
                //don't insert multiple rows for the base type
                const alreadyInserted = new Set();
                for (let p of table.data.parentTables) {
                    if (alreadyInserted.has(p.alias)) {
                        continue;
                    }
                    alreadyInserted.add(p.alias);
                    const result = yield db.insertValueAndFetch(p, row);
                    row = Object.assign({}, row, result);
                }
                //We *should* have gotten rid of any Expr<> instances by now
                const result = Object.assign({}, row, (yield db.insertValueAndFetch(table, row)));
                //One final effort to check we really have all the correct values
                return table_parent_collection_1.TableParentCollectionUtil.assertDelegate(table)(`${table.alias}`, result);
            }));
        }
    });
}
exports.polymorphicInsertValueAndFetch = polymorphicInsertValueAndFetch;
//# sourceMappingURL=polymorphic-insert-value-and-fetch.js.map