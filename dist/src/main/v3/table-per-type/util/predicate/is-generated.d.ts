import { ITable } from "../../../table";
import { GeneratedColumnNames } from "../query";
export declare type IsGenerated<TableT extends ITable, NameT extends string> = (NameT extends GeneratedColumnNames<TableT> ? true : false);
export declare function isGenerated<TableT extends ITable, NameT extends string>(table: TableT, name: NameT): IsGenerated<TableT, NameT>;
