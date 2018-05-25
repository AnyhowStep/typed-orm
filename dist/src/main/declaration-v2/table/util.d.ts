import { Table, AnyTable } from "./table";
import { JoinCollection } from "../join-collection";
import { Column } from "../column";
import { TableData } from "../table-data";
export declare namespace TableUtil {
    type RequiredColumnNames<TableT extends AnyTable> = (Exclude<Extract<keyof TableT["columns"], string>, keyof TableT["data"]["hasDefaultValue"] | keyof TableT["data"]["isGenerated"]>);
    type OptionalColumnNames<TableT extends AnyTable> = (Exclude<Extract<keyof TableT["data"]["hasDefaultValue"], string>, keyof TableT["data"]["isGenerated"]>);
    type MutableColumnNames<TableT extends AnyTable> = (Extract<Extract<keyof TableT["columns"], string>, keyof TableT["data"]["isMutable"]>);
    function validateInsertRow(table: AnyTable, row: any): void;
    function validateInsertRows(table: AnyTable, rows: any[]): void;
    function validateUpdateAssignmentReferences(joins: JoinCollection, assignmentReferences: any): void;
    type ToGeneric<TableT extends AnyTable> = (Table<any, any, {
        [columnName in Extract<keyof TableT["columns"], string>]: (Column<any, columnName, ReturnType<TableT["columns"][columnName]["assertDelegate"]>>);
    }, TableData>);
}
