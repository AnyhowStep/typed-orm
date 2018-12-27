import * as sd from "schema-decorator";
import {ITable} from "../../../table";
import {ColumnNames, uniqueColumnNames} from "./column-names";
import {ColumnType} from "./column-type";
import { getColumnsWithName } from "./get-columns-with-name";

export type TypeMap<TableT extends ITable> = (
    {
        [columnName in ColumnNames<TableT>] : (
            ColumnType<TableT, columnName>
        )
    }
);
export function assertDelegate<TableT extends ITable> (
    table : TableT
) : sd.AssertDelegate<TypeMap<TableT>> {
    const assertMap : any = {};
    for (let columnName of uniqueColumnNames(table)) {
        const columns = getColumnsWithName(table, columnName);
        if (columns.length == 0) {
            throw new Error(`No columns found for ${table.alias}.${columnName}`);
        }
        assertMap[columnName] = sd.and(
            ...columns.map(c => c.assertDelegate)
        );
    }
    return sd.toSchema(assertMap);
}
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