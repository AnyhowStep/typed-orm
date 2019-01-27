import * as sd from "schema-decorator";
import { IColumn } from "../column";
import { QueryTree } from "../query-tree";
import { SortDirection } from "../order";
import * as ExprUtil from "./util";
export interface ExprData {
    readonly usedColumns: IColumn[];
    readonly assertDelegate: sd.AssertDelegate<any>;
}
export interface IExpr<DataT extends ExprData = ExprData> {
    readonly usedColumns: DataT["usedColumns"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly queryTree: QueryTree;
}
export declare class Expr<DataT extends ExprData> implements IExpr<DataT> {
    readonly usedColumns: DataT["usedColumns"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly queryTree: QueryTree;
    constructor(data: DataT, queryTree: QueryTree);
    as<AliasT extends string>(alias: AliasT): ExprUtil.As<this, AliasT>;
    asc(): ExprUtil.Asc<this>;
    desc(): ExprUtil.Desc<this>;
    sort(sortDirection: SortDirection): ExprUtil.Sort<this>;
}
export declare type IAnonymousTypedExpr<TypeT> = (IExpr<{
    usedColumns: IColumn[];
    assertDelegate: sd.AssertDelegate<TypeT>;
}>);
