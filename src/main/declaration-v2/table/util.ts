import {Table, AnyTable} from "./table";
import {JoinCollection} from "../join-collection";
import {Column, AnyColumn} from "../column";
import {TableDataUtil} from "../table-data";
import * as sd from "schema-decorator";
import {UniqueKeyCollection, UniqueKeyCollectionUtil} from "../unique-key-collection";

export namespace TableUtil {
    export type RequiredColumnNames<
        TableT extends AnyTable
    > = (
        Exclude<
            Extract<keyof TableT["columns"], string>,
            keyof TableT["data"]["hasDefaultValue"] | keyof TableT["data"]["isGenerated"]
        >
    );
    export type OptionalColumnNames<
        TableT extends AnyTable
    > = (
        Exclude<
            Extract<keyof TableT["data"]["hasDefaultValue"], string>,
            keyof TableT["data"]["isGenerated"]
        >
    );
    export type MutableColumnNames<
        TableT extends AnyTable
    > = (
        Extract<
            Extract<keyof TableT["columns"], string>,
            keyof TableT["data"]["isMutable"]
        >
    );
    export type ColumnNames<
        TableT extends AnyTable
    > = (
        Extract<keyof TableT["columns"], string>
    );
    //TODO Move these elsewhere, they do not belong here
    export function validateInsertRow (table : AnyTable, row : any) {
        for (let name in row) {
            if (!table.columns.hasOwnProperty(name)) {
                //throw new Error(`Unexpected column ${name}; it does not exist on table ${table.alias}`);
                //Silently ignore extra columns
                continue;
            }
            if (table.data.isGenerated.hasOwnProperty(name)) {
                //throw new Error(`Unexpected column ${name}; it is a generated column on table ${table.alias}, you cannot specify a value for it`);
                //Silently ignore extra columns
                continue;
            }
            const value = (row as any)[name];
            if (value === undefined && !table.data.hasDefaultValue.hasOwnProperty(name)) {
                throw new Error(`Expected a value for column ${name} on table ${table.alias}; received undefined`);
            }
            //If we specify a value, it better match our assertion
            if (!(value instanceof Object) || (value instanceof Date)) {
                (row as any)[name] = table.columns[name].assertDelegate(name, value) as any;
            }
        }
    }
    export function validateInsertRows (table : AnyTable, rows : any[]) {
        for (let row of rows) {
            validateInsertRow(table, row);
        }
    }
    export function validateUpdateAssignmentReferences (
        joins : JoinCollection,
        assignmentReferences : any
    ) {
        for (let tableAlias in assignmentReferences) {
            const join = joins.find((join) => join.table.alias == tableAlias);
            if (join == undefined) {
                throw new Error(`Unknown table alias ${tableAlias} in assignment references`);
            }
            const assignmentCollection = assignmentReferences[tableAlias];
            for (let columnName in assignmentCollection) {
                const column = join.columns[columnName];
                if (!(column instanceof Column)) {
                    throw new Error(`Unknown column ${tableAlias}.${columnName} in assignment references`);
                }
                const assignmentValue = assignmentCollection[columnName];
                if (!(assignmentValue instanceof Object) || (assignmentValue instanceof Date)) {
                    assignmentCollection[columnName] = column.assertDelegate(columnName, assignmentValue) as any;
                }
            }
        }
    }

    export type ToGeneric<TableT extends AnyTable> = (
        TableT["data"]["id"] extends AnyColumn ?
            Table<
                any,
                any,
                {
                    [columnName in Extract<keyof TableT["columns"], string>] : (
                        Column<any, columnName, ReturnType<TableT["columns"][columnName]["assertDelegate"]>>
                    )
                },
                TableDataUtil.WithTableAliasGeneric<
                    TableT["data"],
                    any
                >
            >:
            (
                Table<
                    any,
                    any,
                    {
                        [columnName in Extract<keyof TableT["columns"], string>] : (
                            Column<any, columnName, ReturnType<TableT["columns"][columnName]["assertDelegate"]>>
                        )
                    },
                    //Had to resort to `any` hack
                    //Too many constraints confusing the type system
                    {
                        readonly autoIncrement : any,
                        readonly isGenerated : any,
                        readonly hasDefaultValue : any,
                        readonly isMutable : any,
                        readonly id : any,
                        readonly uniqueKeys : any,
                        readonly parentTables : any,
                    }
                >
            )
    );

    export type UniqueKeys<TableT extends AnyTable> = (
        TableT["data"]["uniqueKeys"] extends never ?
            any :
            TableT["data"]["uniqueKeys"] extends UniqueKeyCollection ?
                UniqueKeyCollectionUtil.WithType<
                    TableT["data"]["uniqueKeys"],
                    TableT["columns"]
                > :
                never
    )
    export function uniqueKeyAssertDelegate<
        TableT extends AnyTable
    > (table : TableT) : sd.AssertDelegate<UniqueKeys<TableT>> {
        if (table.data.uniqueKeys == undefined) {
            return ((name : string, _mixed : any) : never => {
                throw new Error(`${name} is not a unique key of ${table.alias}; the table has no unique keys`);
            }) as any;
        }
        return UniqueKeyCollectionUtil.assertDelegate(
            table.data.uniqueKeys,
            table.columns
        ) as any;
    }
}