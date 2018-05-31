import { TableParentCollection } from "./table-parent-collection";
import { TupleKeys } from "../tuple";
import { Table, AnyTable } from "../table";
import { ColumnCollectionUtil } from "../column-collection";
import { AnyColumn } from "../column";
import * as sd from "schema-decorator";
export declare namespace TableParentCollectionUtil {
    type InheritedColumnNames<ParentsT extends TableParentCollection> = ({
        [index in TupleKeys<ParentsT>]: (ParentsT[index] extends AnyTable ? ColumnCollectionUtil.ColumnNames<ParentsT[index]["columns"]> : never);
    }[TupleKeys<ParentsT>]);
    function setInheritedColumnNames(parents: TableParentCollection, names: Set<string>): void;
    type InheritedIsGenerated<ParentsT extends TableParentCollection, ColumnNameT extends string> = ({
        [index in TupleKeys<ParentsT>]: (ParentsT[index] extends Table<any, any, any, infer DataT> ? (ColumnNameT extends keyof DataT["isGenerated"] ? true : false) : false);
    }[TupleKeys<ParentsT>]);
    function inheritedIsGenerated(parents: TableParentCollection, columnName: string): boolean;
    function tryGetInheritedGeneratedNonAutoIncrementColumn(parents: TableParentCollection, columnName: string): AnyColumn | undefined;
    type InheritedHasDefaultValue<ParentsT extends TableParentCollection, ColumnNameT extends string> = (true extends InheritedIsGenerated<ParentsT, ColumnNameT> ? true : {
        [index in TupleKeys<ParentsT>]: (ParentsT[index] extends Table<any, any, infer ColumnsT, infer DataT> ? (ColumnNameT extends keyof ColumnsT ? (ColumnNameT extends keyof DataT["hasDefaultValue"] ? true : false) : true) : false);
    }[TupleKeys<ParentsT>]);
    function inheritedHasDefaultValue(parents: TableParentCollection, columnName: string): boolean;
    type InheritedIsMutable<ParentsT extends TableParentCollection, ColumnNameT extends string> = ({
        [index in TupleKeys<ParentsT>]: (ParentsT[index] extends Table<any, any, infer ColumnsT, infer DataT> ? (ColumnNameT extends keyof ColumnsT ? (ColumnNameT extends keyof DataT["isMutable"] ? true : false) : true) : false);
    }[TupleKeys<ParentsT>]);
    function inheritedIsMutable(parents: TableParentCollection, columnName: string): boolean;
    type InheritedGeneratedColumnNames<ParentsT extends TableParentCollection> = ({
        [name in InheritedColumnNames<ParentsT>]: (true extends InheritedIsGenerated<ParentsT, name> ? name : never);
    }[InheritedColumnNames<ParentsT>]);
    function setInheritedGeneratedColumnNames(parents: TableParentCollection, names: Set<string>): void;
    type InheritedHasDefaultValueColumnNames<ParentsT extends TableParentCollection> = ({
        [name in InheritedColumnNames<ParentsT>]: (InheritedHasDefaultValue<ParentsT, name> extends true ? name : never);
    }[InheritedColumnNames<ParentsT>]);
    function setInheritedHasDefaultValueColumnNames(parents: TableParentCollection, names: Set<string>): void;
    type InheritedMutableColumnNames<ParentsT extends TableParentCollection> = ({
        [name in InheritedColumnNames<ParentsT>]: (InheritedIsMutable<ParentsT, name> extends true ? name : never);
    }[InheritedColumnNames<ParentsT>]);
    function setInheritedMutableColumnNames(parents: TableParentCollection, names: Set<string>): void;
    type ColumnNames<TableT extends AnyTable> = (TableT["data"]["parentTables"] extends TableParentCollection ? (Extract<keyof TableT["columns"], string> | InheritedColumnNames<TableT["data"]["parentTables"]>) : (Extract<keyof TableT["columns"], string>));
    function columnNames(table: AnyTable): Set<string>;
    type IsGenerated<TableT extends AnyTable, ColumnNameT extends string> = (ColumnNameT extends keyof TableT["data"]["isGenerated"] ? true : TableT["data"]["parentTables"] extends TableParentCollection ? InheritedIsGenerated<TableT["data"]["parentTables"], ColumnNameT> : false);
    function isGenerated(table: AnyTable, columnName: string): boolean;
    function tryGetGeneratedNonAutoIncrementColumn(table: AnyTable, columnName: string): AnyColumn | undefined;
    type HasDefaultValue<TableT extends AnyTable, ColumnNameT extends string> = (true extends IsGenerated<TableT, ColumnNameT> ? true : TableT["data"]["parentTables"] extends TableParentCollection ? ((ColumnNameT extends keyof TableT["columns"] ? (ColumnNameT extends keyof TableT["data"]["hasDefaultValue"] ? true : false) : true) | InheritedHasDefaultValue<TableT["data"]["parentTables"], ColumnNameT>) : ColumnNameT extends keyof TableT["columns"] ? (ColumnNameT extends keyof TableT["data"]["hasDefaultValue"] ? true : false) : true);
    function hasDefaultValue(table: AnyTable, columnName: string): boolean;
    type IsMutable<TableT extends AnyTable, ColumnNameT extends string> = (TableT["data"]["parentTables"] extends TableParentCollection ? ((ColumnNameT extends keyof TableT["columns"] ? (ColumnNameT extends keyof TableT["data"]["isMutable"] ? true : false) : true) | InheritedIsMutable<TableT["data"]["parentTables"], ColumnNameT>) : ColumnNameT extends keyof TableT["columns"] ? (ColumnNameT extends keyof TableT["data"]["isMutable"] ? true : false) : true);
    function isMutable(table: AnyTable, columnName: string): boolean;
    type GeneratedColumnNames<TableT extends AnyTable> = ({
        [name in ColumnNames<TableT>]: (true extends IsGenerated<TableT, name> ? name : never);
    }[ColumnNames<TableT>]);
    function generatedColumnNames(table: AnyTable): string[];
    type HasDefaultValueColumnNames<TableT extends AnyTable> = ({
        [name in ColumnNames<TableT>]: (HasDefaultValue<TableT, name> extends true ? name : never);
    }[ColumnNames<TableT>]);
    function hasDefaultValueColumnNames(table: AnyTable): string[];
    type MutableColumnNames<TableT extends AnyTable> = ({
        [name in ColumnNames<TableT>]: (IsMutable<TableT, name> extends true ? name : never);
    }[ColumnNames<TableT>]);
    function mutableColumnNames(table: AnyTable): string[];
    type RequiredColumnNames<TableT extends AnyTable> = (Exclude<ColumnNames<TableT>, HasDefaultValueColumnNames<TableT>>);
    function requiredColumnNames(table: AnyTable): string[];
    type OptionalColumnNames<TableT extends AnyTable> = (Exclude<HasDefaultValueColumnNames<TableT>, GeneratedColumnNames<TableT>>);
    function optionalColumnNames(table: AnyTable): string[];
    type InheritedColumnTypeImpl<ParentsT extends TableParentCollection, ColumnNameT extends string, IndexT extends string> = (IndexT extends keyof ParentsT ? (ParentsT[IndexT] extends Table<any, any, infer ColumnsT, any> ? (ColumnNameT extends keyof ColumnsT ? ReturnType<ColumnsT[ColumnNameT]["assertDelegate"]> : never) : never) : never);
    type InheritedColumnType<ParentsT extends TableParentCollection, ColumnNameT extends string> = (InheritedColumnTypeImpl<ParentsT, ColumnNameT, "9"> extends never ? (InheritedColumnTypeImpl<ParentsT, ColumnNameT, "8"> extends never ? (InheritedColumnTypeImpl<ParentsT, ColumnNameT, "7"> extends never ? (InheritedColumnTypeImpl<ParentsT, ColumnNameT, "6"> extends never ? (InheritedColumnTypeImpl<ParentsT, ColumnNameT, "5"> extends never ? (InheritedColumnTypeImpl<ParentsT, ColumnNameT, "4"> extends never ? (InheritedColumnTypeImpl<ParentsT, ColumnNameT, "3"> extends never ? (InheritedColumnTypeImpl<ParentsT, ColumnNameT, "2"> extends never ? (InheritedColumnTypeImpl<ParentsT, ColumnNameT, "1"> extends never ? (InheritedColumnTypeImpl<ParentsT, ColumnNameT, "0"> extends never ? (never) : InheritedColumnTypeImpl<ParentsT, ColumnNameT, "0">) : InheritedColumnTypeImpl<ParentsT, ColumnNameT, "1">) : InheritedColumnTypeImpl<ParentsT, ColumnNameT, "2">) : InheritedColumnTypeImpl<ParentsT, ColumnNameT, "3">) : InheritedColumnTypeImpl<ParentsT, ColumnNameT, "4">) : InheritedColumnTypeImpl<ParentsT, ColumnNameT, "5">) : InheritedColumnTypeImpl<ParentsT, ColumnNameT, "6">) : InheritedColumnTypeImpl<ParentsT, ColumnNameT, "7">) : InheritedColumnTypeImpl<ParentsT, ColumnNameT, "8">) : InheritedColumnTypeImpl<ParentsT, ColumnNameT, "9">);
    type ColumnType<TableT extends AnyTable, ColumnNameT extends string> = (ColumnNameT extends keyof TableT["columns"] ? (ReturnType<TableT["columns"][ColumnNameT]["assertDelegate"]>) : (TableT["data"]["parentTables"] extends TableParentCollection ? InheritedColumnType<TableT["data"]["parentTables"], ColumnNameT> : never));
    function columnAssertDelegate(table: AnyTable, columnName: string): sd.AssertDelegate<any>;
    type TableRow<TableT extends AnyTable> = ({
        [name in TableParentCollectionUtil.ColumnNames<TableT>]: (TableParentCollectionUtil.ColumnType<TableT, name>);
    });
    function assertDelegate<TableT extends AnyTable>(table: TableT): sd.AssertDelegate<TableRow<TableT>>;
    type FindWithTableAlias<ParentsT extends TableParentCollection, TableAliasT extends string> = ({
        [index in TupleKeys<ParentsT>]: (ParentsT[index] extends AnyTable ? (ParentsT[index]["alias"] extends TableAliasT ? ParentsT[index] : never) : never);
    }[TupleKeys<ParentsT>]);
    type ToInheritedColumnReferences<ParentsT extends TableParentCollection> = (ParentsT[TupleKeys<ParentsT>] extends AnyTable ? {
        readonly [tableAlias in ParentsT[TupleKeys<ParentsT>]["alias"]]: (FindWithTableAlias<ParentsT, tableAlias>["columns"]);
    } : {});
    type ToColumnReferences<TableT extends AnyTable> = (ColumnCollectionUtil.ToColumnReferences<TableT["columns"]> & (TableT["data"]["parentTables"] extends TableParentCollection ? ToInheritedColumnReferences<TableT["data"]["parentTables"]> : {}));
}
