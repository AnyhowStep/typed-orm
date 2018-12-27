"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const column_names_1 = require("./column-names");
const get_columns_with_name_1 = require("./get-columns-with-name");
function assertDelegate(table) {
    const assertMap = {};
    for (let columnName of column_names_1.uniqueColumnNames(table)) {
        const columns = get_columns_with_name_1.getColumnsWithName(table, columnName);
        if (columns.length == 0) {
            throw new Error(`No columns found for ${table.alias}.${columnName}`);
        }
        assertMap[columnName] = sd.and(...columns.map(c => c.assertDelegate));
    }
    return sd.toSchema(assertMap);
}
exports.assertDelegate = assertDelegate;
/*
TODO Move this to compile-time-tests
import * as o from "../../../index";
const table = o.table(
    "table",
    {
        x : () : 3n => 3n,
        y : o.dateTime(),
        z : o.boolean(),
        w : o.boolean(),
    }
).addCandidateKey(c => [c.x]);
const parent2 = o.table(
    "parent2",
    {
        x : o.bigint(),
        y : o.dateTime(),
        w : () : true => true,
    }
).addCandidateKey(c => [c.x]);
const parent = o.table(
    "parent",
    {
        x : o.bigint(),
        y : o.dateTime(),
        z : o.boolean(),
    }
).addCandidateKey(c => [c.x])
.addParent(parent2);

const t2 = table.addParent(parent);
const ct : ColumnType<typeof t2, "x">
const ct2 : ColumnType<typeof table, "x">
const ct3 : ColumnType<typeof parent, "x">

const ctw : ColumnType<typeof t2, "w">
const ctw2 : ColumnType<typeof table, "w">
const ctw3 : ColumnType<typeof parent, "w">

const tm : TypeMap<typeof table>;
const tm2 : TypeMap<typeof parent2>;
const tm3 : TypeMap<typeof parent>;
const tm4 : TypeMap<typeof t2>;*/ 
//# sourceMappingURL=type-map.js.map