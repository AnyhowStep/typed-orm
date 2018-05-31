import {TableParentCollection} from "./table-parent-collection";
import {TupleKeys} from "../tuple";
import {Table, AnyTable} from "../table";
import {ColumnCollectionUtil} from "../column-collection";
import {Column, AnyColumn} from "../column";
import * as sd from "schema-decorator";

export namespace TableParentCollectionUtil {
    export type InheritedColumnNames<ParentsT extends TableParentCollection> = (
        {
            [index in TupleKeys<ParentsT>] : (
                ParentsT[index] extends AnyTable ?
                    ColumnCollectionUtil.ColumnNames<ParentsT[index]["columns"]> :
                    never
            )
        }[TupleKeys<ParentsT>]
    );
    export function setInheritedColumnNames (parents : TableParentCollection, names : Set<string>) {
        for (let p of parents) {
            const columnNames = Object.keys(p.columns)
                .filter(name => p.columns.hasOwnProperty(name));
            for (let name of columnNames) {
                names.add(name);
            }
        }
    }
    //If at least one parent has it as generated, the column is generated
    //true extends IsGenerated<> ?
    //  column is generated :
    //  column is not generated
    export type InheritedIsGenerated<
        ParentsT extends TableParentCollection,
        ColumnNameT extends string
    > = (
        {
            [index in TupleKeys<ParentsT>] : (
                ParentsT[index] extends Table<any, any, any, infer DataT> ?
                    (
                        ColumnNameT extends keyof DataT["isGenerated"] ?
                            true :
                            false
                    ) :
                    false
            )
        }[TupleKeys<ParentsT>]
    );
    export function inheritedIsGenerated (parents : TableParentCollection, columnName : string) : boolean {
        for (let p of parents) {
            if (p.data.isGenerated[columnName] === true) {
                return true;
            }
        }
        return false;
    }
    export function tryGetInheritedGeneratedNonAutoIncrementColumn (parents : TableParentCollection, columnName : string) : AnyColumn|undefined {
        for (let p of parents) {
            if (
                p.data.isGenerated[columnName] === true &&
                (
                    p.data.autoIncrement == undefined ||
                    p.data.autoIncrement.name != columnName
                )
            ) {
                return p.columns[columnName];
            }
        }
        return undefined;
    }
    //If all parents have a default value, then the column has a default value
    //HasDefaultValue<> extends true ?
    //  column has default value :
    //  column is required, no default value
    export type InheritedHasDefaultValue<
        ParentsT extends TableParentCollection,
        ColumnNameT extends string
    > = (
        true extends InheritedIsGenerated<ParentsT, ColumnNameT> ?
            //If the column is generated, then it has a default value
            true :
            {
                [index in TupleKeys<ParentsT>] : (
                    ParentsT[index] extends Table<any, any, infer ColumnsT, infer DataT> ?
                        (
                            ColumnNameT extends keyof ColumnsT ?
                                (
                                    ColumnNameT extends keyof DataT["hasDefaultValue"] ?
                                        true :
                                        false
                                ) :
                                //This parent doesn't even have this column.
                                //We just mark it as having a default value, anyway
                                true
                        ) :
                        //Not a table?
                        false
                )
            }[TupleKeys<ParentsT>]
    );
    export function inheritedHasDefaultValue (parents : TableParentCollection, columnName : string) : boolean {
        if (inheritedIsGenerated(parents, columnName)) {
            return true;
        }
        for (let p of parents) {
            if ((p.columns[columnName] instanceof Column) && p.data.hasDefaultValue[columnName] !== true) {
                return false;
            }
        }
        return true;
    }
    //If all parents say the column is mutable, then the column is mutable
    //IsMutable<> extends true ?
    //  column is mutable :
    //  column is not mutable
    export type InheritedIsMutable<
        ParentsT extends TableParentCollection,
        ColumnNameT extends string
    > = (
        {
            [index in TupleKeys<ParentsT>] : (
                ParentsT[index] extends Table<any, any, infer ColumnsT, infer DataT> ?
                    (
                        ColumnNameT extends keyof ColumnsT ?
                            (
                                ColumnNameT extends keyof DataT["isMutable"] ?
                                    true :
                                    false
                            ) :
                            //This parent doesn't even have this column.
                            //We just mark it as mutable, anyway
                            true
                    ) :
                    //Not a table?
                    false
            )
        }[TupleKeys<ParentsT>]
    );
    export function inheritedIsMutable (parents : TableParentCollection, columnName : string) : boolean {
        for (let p of parents) {
            if ((p.columns[columnName] instanceof Column) && p.data.isMutable[columnName] !== true) {
                return false;
            }
        }
        return true;
    }
    export type InheritedGeneratedColumnNames<ParentsT extends TableParentCollection> = (
        {
            [name in InheritedColumnNames<ParentsT>] : (
                true extends InheritedIsGenerated<ParentsT, name> ?
                    name :
                    never
            )
        }[InheritedColumnNames<ParentsT>]
    );
    export function setInheritedGeneratedColumnNames (parents : TableParentCollection, names : Set<string>) {
        for (let p of parents) {
            const columnNames = Object.keys(p.columns)
                .filter(name => p.columns.hasOwnProperty(name))
                .filter(name => inheritedIsGenerated(parents, name));
            for (let name of columnNames) {
                names.add(name);
            }
        }
    }
    export type InheritedHasDefaultValueColumnNames<ParentsT extends TableParentCollection> = (
        {
            [name in InheritedColumnNames<ParentsT>] : (
                InheritedHasDefaultValue<ParentsT, name> extends true ?
                    name :
                    never
            )
        }[InheritedColumnNames<ParentsT>]
    );
    export function setInheritedHasDefaultValueColumnNames (parents : TableParentCollection, names : Set<string>) {
        for (let p of parents) {
            const columnNames = Object.keys(p.columns)
                .filter(name => p.columns.hasOwnProperty(name))
                .filter(name => inheritedHasDefaultValue(parents, name));
            for (let name of columnNames) {
                names.add(name);
            }
        }
    }
    export type InheritedMutableColumnNames<ParentsT extends TableParentCollection> = (
        {
            [name in InheritedColumnNames<ParentsT>] : (
                InheritedIsMutable<ParentsT, name> extends true ?
                    name :
                    never
            )
        }[InheritedColumnNames<ParentsT>]
    );
    export function setInheritedMutableColumnNames (parents : TableParentCollection, names : Set<string>) {
        for (let p of parents) {
            const columnNames = Object.keys(p.columns)
                .filter(name => p.columns.hasOwnProperty(name))
                .filter(name => inheritedIsMutable(parents, name));
            for (let name of columnNames) {
                names.add(name);
            }
        }
    }

    export type ColumnNames<
        TableT extends AnyTable
    > = (
        TableT["data"]["parentTables"] extends TableParentCollection ?
            (
                Extract<keyof TableT["columns"], string> |
                InheritedColumnNames<TableT["data"]["parentTables"]>
            ) :
            (
                Extract<keyof TableT["columns"], string>
            )
    );
    export function columnNames (table : AnyTable) : Set<string> {
        const result = new Set<string>();
        for (let name of Object.keys(table.columns)) {
            result.add(name);
        }
        if (table.data.parentTables != undefined) {
            setInheritedColumnNames(table.data.parentTables, result);
        }
        return result;
    }
    //true extends IsGenerated<> ?
    //  column is generated :
    //  column is not generated
    export type IsGenerated<
        TableT extends AnyTable,
        ColumnNameT extends string
    > = (
        ColumnNameT extends keyof TableT["data"]["isGenerated"] ?
            true :
            TableT["data"]["parentTables"] extends TableParentCollection ?
                InheritedIsGenerated<TableT["data"]["parentTables"], ColumnNameT> :
                false
    );
    export function isGenerated (table : AnyTable, columnName : string) : boolean {
        if (table.data.isGenerated[columnName] === true) {
            return true;
        } else {
            if (table.data.parentTables == undefined) {
                return false;
            } else {
                return inheritedIsGenerated(table.data.parentTables, columnName);
            }
        }
    }
    export function tryGetGeneratedNonAutoIncrementColumn (table : AnyTable, columnName : string) : AnyColumn|undefined {
        if (
            table.data.isGenerated[columnName] === true &&
            (
                table.data.autoIncrement == undefined ||
                table.data.autoIncrement.name != columnName
            )
        ) {
            return table.columns[columnName];
        }

        if (table.data.parentTables == undefined) {
            return undefined;
        } else {
            return tryGetInheritedGeneratedNonAutoIncrementColumn(table.data.parentTables, columnName);
        }
    }
    //HasDefaultValue<> extends true ?
    //  column has default value :
    //  column is required, no default value
    export type HasDefaultValue<
        TableT extends AnyTable,
        ColumnNameT extends string
    > = (
        true extends IsGenerated<TableT, ColumnNameT> ?
            true :
            TableT["data"]["parentTables"] extends TableParentCollection ?
                (
                    (
                        ColumnNameT extends keyof TableT["columns"] ?
                            (
                                ColumnNameT extends keyof TableT["data"]["hasDefaultValue"] ?
                                    true :
                                    false
                            ) :
                            //TableT does not have ColumnNameT, we mark it has having
                            //a default value anyway
                            true
                    ) |
                    InheritedHasDefaultValue<TableT["data"]["parentTables"], ColumnNameT>
                ) :
                ColumnNameT extends keyof TableT["columns"] ?
                    (
                        ColumnNameT extends keyof TableT["data"]["hasDefaultValue"] ?
                            true :
                            false
                    ) :
                    //TableT does not have ColumnNameT, we mark it has having
                    //a default value anyway
                    true
    );
    export function hasDefaultValue (table : AnyTable, columnName : string) : boolean {
        if (isGenerated(table, columnName)) {
            return true;
        }

        if (
            (table.columns[columnName] instanceof Column) &&
            table.data.hasDefaultValue[columnName] !== true
        ) {
            return false;
        }

        //The current table either doesn't have the column, or has a default value for it
        if (table.data.parentTables == undefined) {
            //No parents, so we have the final say
            return true;
        } else {
            //The parents must also have it as a default
            return inheritedHasDefaultValue(table.data.parentTables, columnName);
        }
    }
    //IsMutable<> extends true ?
    //  column is mutable :
    //  column is not mutable
    export type IsMutable<
        TableT extends AnyTable,
        ColumnNameT extends string
    > = (
        TableT["data"]["parentTables"] extends TableParentCollection ?
            (
                (
                    ColumnNameT extends keyof TableT["columns"] ?
                        (
                            ColumnNameT extends keyof TableT["data"]["isMutable"] ?
                                true :
                                false
                        ) :
                        //TableT does not have ColumnNameT, we mark it as mutable anyway
                        true
                ) |
                InheritedIsMutable<TableT["data"]["parentTables"], ColumnNameT>
            ) :
            ColumnNameT extends keyof TableT["columns"] ?
                (
                    ColumnNameT extends keyof TableT["data"]["isMutable"] ?
                        true :
                        false
                ) :
                //TableT does not have ColumnNameT, we mark it as mutable anyway
                true
    );
    export function isMutable (table : AnyTable, columnName : string) : boolean {
        if (
            (table.columns[columnName] instanceof Column) &&
            table.data.isMutable[columnName] !== true
        ) {
            return false;
        }

        //The current table either doesn't have the column, or it is mutable
        if (table.data.parentTables == undefined) {
            //No parents, so we have the final say
            return true;
        } else {
            //The parents must also have it as a default
            return inheritedIsMutable(table.data.parentTables, columnName);
        }
    }
    export type GeneratedColumnNames<TableT extends AnyTable> = (
        {
            [name in ColumnNames<TableT>] : (
                true extends IsGenerated<TableT, name> ?
                    name :
                    never
            )
        }[ColumnNames<TableT>]
    );
    export function generatedColumnNames (table : AnyTable) {
        return [...columnNames(table)]
            .filter(name => isGenerated(table, name));
    }
    export type HasDefaultValueColumnNames<TableT extends AnyTable> = (
        {
            [name in ColumnNames<TableT>] : (
                HasDefaultValue<TableT, name> extends true ?
                    name :
                    never
            )
        }[ColumnNames<TableT>]
    );
    export function hasDefaultValueColumnNames (table : AnyTable) {
        return [...columnNames(table)]
            .filter(name => hasDefaultValue(table, name));
    }
    export type MutableColumnNames<TableT extends AnyTable> = (
        {
            [name in ColumnNames<TableT>] : (
                IsMutable<TableT, name> extends true ?
                    name :
                    never
            )
        }[ColumnNames<TableT>]
    );
    export function mutableColumnNames (table : AnyTable) {
        return [...columnNames(table)]
            .filter(name => isMutable(table, name));
    }
    export type RequiredColumnNames<TableT extends AnyTable> = (
        Exclude<
            ColumnNames<TableT>,
            HasDefaultValueColumnNames<TableT>
        >
    );
    export function requiredColumnNames (table : AnyTable) {
        return [...columnNames(table)]
            .filter(name => !hasDefaultValue(table, name));
    }
    export type OptionalColumnNames<TableT extends AnyTable> = (
        Exclude<
            HasDefaultValueColumnNames<TableT>,
            GeneratedColumnNames<TableT>
        >
    );
    export function optionalColumnNames (table : AnyTable) {
        return hasDefaultValueColumnNames(table)
            .filter(name => !isGenerated(table, name));
    }

    export type InheritedColumnTypeImpl<
        ParentsT extends TableParentCollection,
        ColumnNameT extends string,
        IndexT extends string
    > = (
        IndexT extends keyof ParentsT ?
            (
                ParentsT[IndexT] extends Table<any, any, infer ColumnsT, any> ?
                    (
                        ColumnNameT extends keyof ColumnsT ?
                            ReturnType<ColumnsT[ColumnNameT]["assertDelegate"]> :
                            never
                    ) :
                    never
            ) :
            never
    );
    export type InheritedColumnType<ParentsT extends TableParentCollection, ColumnNameT extends string> = (
        InheritedColumnTypeImpl<ParentsT, ColumnNameT, "9"> extends never ?
        (
            InheritedColumnTypeImpl<ParentsT, ColumnNameT, "8"> extends never ?
            (
                InheritedColumnTypeImpl<ParentsT, ColumnNameT, "7"> extends never ?
                (
                    InheritedColumnTypeImpl<ParentsT, ColumnNameT, "6"> extends never ?
                    (
                        InheritedColumnTypeImpl<ParentsT, ColumnNameT, "5"> extends never ?
                        (
                            InheritedColumnTypeImpl<ParentsT, ColumnNameT, "4"> extends never ?
                            (
                                InheritedColumnTypeImpl<ParentsT, ColumnNameT, "3"> extends never ?
                                    (
                                        InheritedColumnTypeImpl<ParentsT, ColumnNameT, "2"> extends never ?
                                            (
                                                InheritedColumnTypeImpl<ParentsT, ColumnNameT, "1"> extends never ?
                                                    (
                                                        InheritedColumnTypeImpl<ParentsT, ColumnNameT, "0"> extends never ?
                                                            (
                                                                never
                                                            ) :
                                                            InheritedColumnTypeImpl<ParentsT, ColumnNameT, "0">
                                                    ) :
                                                    InheritedColumnTypeImpl<ParentsT, ColumnNameT, "1">
                                            ) :
                                            InheritedColumnTypeImpl<ParentsT, ColumnNameT, "2">
                                    ) :
                                    InheritedColumnTypeImpl<ParentsT, ColumnNameT, "3">
                            ) :
                            InheritedColumnTypeImpl<ParentsT, ColumnNameT, "4">
                        ) :
                        InheritedColumnTypeImpl<ParentsT, ColumnNameT, "5">
                    ) :
                    InheritedColumnTypeImpl<ParentsT, ColumnNameT, "6">
                ) :
                InheritedColumnTypeImpl<ParentsT, ColumnNameT, "7">
            ) :
            InheritedColumnTypeImpl<ParentsT, ColumnNameT, "8">
        ) :
        InheritedColumnTypeImpl<ParentsT, ColumnNameT, "9">
    );
    export type ColumnType<TableT extends AnyTable, ColumnNameT extends string> = (
        ColumnNameT extends keyof TableT["columns"] ?
            (
                ReturnType<TableT["columns"][ColumnNameT]["assertDelegate"]>
            ) :
            (
                TableT["data"]["parentTables"] extends TableParentCollection ?
                    InheritedColumnType<TableT["data"]["parentTables"], ColumnNameT> :
                    never
            )
    );
    export function columnAssertDelegate (table : AnyTable, columnName : string) {
        const assertDelegates : sd.AssertDelegate<any>[] = [];
        const column = table.columns[columnName];
        if (column instanceof Column) {
            assertDelegates.push(column.assertDelegate);
        }
        if (table.data.parentTables != undefined) {
            for (let p of table.data.parentTables) {
                const column = p.columns[columnName];
                if (column instanceof Column) {
                    assertDelegates.push(column.assertDelegate);
                }
            }
        }
        if (assertDelegates.length == 0) {
            throw new Error(`Table ${table.alias} does not have column ${columnName} and does not inherit it`);
        }
        return sd.and(
            ...assertDelegates
        );
    }
    export type TableRow<TableT extends AnyTable> = (
        {
            [name in TableParentCollectionUtil.ColumnNames<TableT>] : (
                TableParentCollectionUtil.ColumnType<TableT, name>
            )
        }
    );
    export function assertDelegate<TableT extends AnyTable> (
        table : TableT
    ) : sd.AssertDelegate<TableRow<TableT>> {
        const fields : sd.Field<any, any>[] = [];
        columnNames(table).forEach((columnName) => {
            fields.push(sd.field(columnName, columnAssertDelegate(table, columnName)));
        });
        return sd.schema(...fields);
    }

    export type FindWithTableAlias<ParentsT extends TableParentCollection, TableAliasT extends string> = (
        {
            [index in TupleKeys<ParentsT>] : (
                ParentsT[index] extends AnyTable ?
                    (
                        ParentsT[index]["alias"] extends TableAliasT ?
                            ParentsT[index] :
                            never
                    ) :
                    never
            )
        }[TupleKeys<ParentsT>]
    );
    export type ToInheritedColumnReferences<
        ParentsT extends TableParentCollection
    > = (
        ParentsT[TupleKeys<ParentsT>] extends AnyTable ?
            {
                readonly [tableAlias in ParentsT[TupleKeys<ParentsT>]["alias"]] : (
                    FindWithTableAlias<ParentsT, tableAlias>["columns"]
                )
            } :
            {}
    );
    export type ToColumnReferences<
        TableT extends AnyTable
    > = (
        ColumnCollectionUtil.ToColumnReferences<TableT["columns"]> &
        (
            TableT["data"]["parentTables"] extends TableParentCollection ?
                ToInheritedColumnReferences<TableT["data"]["parentTables"]> :
                {}
        )
    );
}
