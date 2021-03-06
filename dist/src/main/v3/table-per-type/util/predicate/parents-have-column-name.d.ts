import { ITable } from "../../../table";
import { ParentColumnNames, ColumnNames } from "../query";
export declare type ParentsHaveColumnName<TableT extends ITable, NameT extends string> = (NameT extends ParentColumnNames<TableT> ? true : false);
export declare function parentsHaveColumnName<TableT extends ITable, NameT extends string>(table: TableT, columnName: NameT): ParentsHaveColumnName<TableT, NameT>;
export declare type HasColumnName<TableT extends ITable, NameT extends string> = (NameT extends ColumnNames<TableT> ? true : false);
export declare function hasColumnName<TableT extends ITable, NameT extends string>(table: TableT, columnName: NameT): HasColumnName<TableT, NameT>;
