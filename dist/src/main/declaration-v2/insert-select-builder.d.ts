import { AnyTable, TableUtil } from "./table";
import { Querify } from "./querify";
import * as mysql from "typed-mysql";
import { Column, AnyColumn } from "./column";
import { StringBuilder } from "./StringBuilder";
import { AllowedExprConstant } from "./raw-expr";
import { PooledDatabase } from "./PooledDatabase";
import { AnySelectBuilder } from "./select-builder";
import { ColumnReferencesUtil } from "./column-references";
import { SelectCollectionUtil } from "./select-collection";
export declare type RawInsertSelectAssignmentType<TableT extends AnyTable, ColumnNameT extends keyof TableT["columns"]> = (Extract<ReturnType<TableT["columns"][ColumnNameT]["assertDelegate"]>, AllowedExprConstant>);
export declare type RawInsertSelectAssignment<TableT extends AnyTable, SelectBuilderT extends AnySelectBuilder, ColumnNameT extends keyof TableT["columns"]> = (RawInsertSelectAssignmentType<TableT, ColumnNameT> | Extract<ColumnReferencesUtil.Columns<SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>>, Column<any, any, RawInsertSelectAssignmentType<TableT, ColumnNameT>>>);
export declare type RawInsertSelectAssignmentCollection<TableT extends AnyTable, SelectBuilderT extends AnySelectBuilder> = ({
    [columnName in TableUtil.RequiredColumnNames<TableT>]: (RawInsertSelectAssignment<TableT, SelectBuilderT, columnName>);
} & {
    [columnName in TableUtil.OptionalColumnNames<TableT>]?: (RawInsertSelectAssignment<TableT, SelectBuilderT, columnName>);
});
export declare type InsertAssignmentCollectionDelegate<TableT extends AnyTable, SelectBuilderT extends AnySelectBuilder> = ((s: ColumnReferencesUtil.ToConvenient<SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>>) => (RawInsertSelectAssignmentCollection<TableT, SelectBuilderT>));
export declare class InsertSelectBuilder<TableT extends AnyTable, SelectBuilderT extends AnySelectBuilder, AssignmentsT extends undefined | (RawInsertSelectAssignmentCollection<TableT, SelectBuilderT>), InsertModeT extends "IGNORE" | "REPLACE" | "NORMAL"> implements Querify {
    readonly table: TableT;
    readonly selectBuilder: SelectBuilderT;
    readonly assignments: AssignmentsT;
    readonly insertMode: InsertModeT;
    readonly db: PooledDatabase;
    constructor(table: TableT, selectBuilder: SelectBuilderT, assignments: AssignmentsT, insertMode: InsertModeT, db: PooledDatabase);
    ignore(): InsertSelectBuilder<TableT, SelectBuilderT, AssignmentsT, "IGNORE">;
    replace(): InsertSelectBuilder<TableT, SelectBuilderT, AssignmentsT, "REPLACE">;
    set(delegate: InsertAssignmentCollectionDelegate<TableT, SelectBuilderT>): (InsertSelectBuilder<TableT, SelectBuilderT, RawInsertSelectAssignmentCollection<TableT, SelectBuilderT>, InsertModeT>);
    execute(this: InsertSelectBuilder<TableT, SelectBuilderT, RawInsertSelectAssignmentCollection<TableT, SelectBuilderT>, InsertModeT>): (Promise<mysql.MysqlInsertResult & (TableT["data"]["autoIncrement"] extends AnyColumn ? {
        [name in TableT["data"]["autoIncrement"]["name"]]: ("IGNORE" extends InsertModeT ? number | undefined : number);
    } : {})>);
    querify(sb: StringBuilder): void;
    getQuery(): string;
    printQuery(): this;
}
