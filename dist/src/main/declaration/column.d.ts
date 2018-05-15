import * as sd from "schema-decorator";
import { ColumnToReference } from "./column-operation";
import { IColumnExpr } from "./expr";
import { Querify } from "./querify";
export interface IColumn<TableNameT extends string, NameT extends string, TypeT> extends Querify {
    readonly table: TableNameT;
    readonly name: NameT;
    readonly assertDelegate: sd.AssertDelegate<TypeT>;
    as<AliasT extends string>(alias: AliasT): IColumnExpr<ColumnToReference<IColumn<TableNameT, NameT, TypeT>>, "__expr", AliasT, TypeT>;
}
export declare type AnyColumn = IColumn<any, any, any>;
