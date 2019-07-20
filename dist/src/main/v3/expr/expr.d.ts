import * as sd from "type-mapping";
import { ColumnRef } from "../column-ref";
import { QueryTree } from "../query-tree";
import { SortDirection } from "../order";
import * as ExprUtil from "./util";
import { ColumnMap } from "../column-map";
import { Asc, Desc, Sort } from "./util";
import { ALIASED } from "../constants";
export interface ExprData {
    readonly usedRef: ColumnRef;
    readonly assertDelegate: sd.SafeMapper<any>;
}
export interface IExpr<DataT extends ExprData = ExprData> {
    readonly usedRef: DataT["usedRef"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly queryTree: QueryTree;
}
export declare class Expr<DataT extends ExprData> implements IExpr<DataT> {
    readonly usedRef: DataT["usedRef"];
    readonly assertDelegate: DataT["assertDelegate"];
    readonly queryTree: QueryTree;
    constructor(data: DataT, queryTree: QueryTree);
    as<AliasT extends string>(alias: AliasT): ExprUtil.As<DataT & {
        queryTree: QueryTree;
    }, AliasT>;
    asc(): ExprUtil.Asc<this>;
    desc(): ExprUtil.Desc<this>;
    sort(sortDirection: SortDirection): ExprUtil.Sort<this>;
}
export declare type IAnonymousTypedExpr<TypeT> = (IExpr<{
    usedRef: ColumnRef;
    assertDelegate: sd.SafeMapper<TypeT>;
}>);
export declare type TableExpr<TableT extends {
    alias: string;
    columns: ColumnMap;
}, TypeT> = Expr<{
    assertDelegate: sd.SafeMapper<TypeT>;
    usedRef: {
        [alias in TableT["alias"]]: TableT["columns"];
    };
}>;
export declare type TableExprSelectItem<TableT extends {
    alias: string;
    columns: ColumnMap;
}, TypeT, AliasT extends string> = ({
    readonly assertDelegate: sd.SafeMapper<TypeT>;
    readonly tableAlias: typeof ALIASED;
    readonly alias: AliasT;
    readonly usedRef: {
        [alias in TableT["alias"]]: TableT["columns"];
    };
    asc(): Asc<{
        assertDelegate: sd.SafeMapper<TypeT>;
        usedRef: {
            [alias in TableT["alias"]]: TableT["columns"];
        };
        queryTree: QueryTree;
    }>;
    desc(): Desc<{
        assertDelegate: sd.SafeMapper<TypeT>;
        usedRef: {
            [alias in TableT["alias"]]: TableT["columns"];
        };
        queryTree: QueryTree;
    }>;
    sort(sortDirection: SortDirection): Sort<{
        assertDelegate: sd.SafeMapper<TypeT>;
        usedRef: {
            [alias in TableT["alias"]]: TableT["columns"];
        };
        queryTree: QueryTree;
    }>;
    readonly queryTree: QueryTree;
    readonly unaliasedQuery: QueryTree;
});
