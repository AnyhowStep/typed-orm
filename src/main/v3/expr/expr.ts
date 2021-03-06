import * as sd from "type-mapping";
import {ColumnRef} from "../column-ref";
import {QueryTree, Parentheses} from "../query-tree";
import {SortDirection} from "../order";
import * as ExprUtil from "./util";
import {ColumnMap} from "../column-map";
import {Asc, Desc, Sort} from "./util";
import {ALIASED} from "../constants";

export interface ExprData {
    readonly usedRef : ColumnRef;
    readonly assertDelegate : sd.SafeMapper<any>;
}

export interface IExpr<DataT extends ExprData=ExprData> {
    readonly usedRef : DataT["usedRef"];
    readonly assertDelegate : DataT["assertDelegate"];

    readonly queryTree : QueryTree;
}

export class Expr<DataT extends ExprData> implements IExpr<DataT> {
    readonly usedRef : DataT["usedRef"];
    readonly assertDelegate : DataT["assertDelegate"];

    readonly queryTree : QueryTree;

    public constructor (
        data : DataT,
        queryTree : QueryTree
    ) {
        this.usedRef = data.usedRef;
        this.assertDelegate = data.assertDelegate;

        //Gotta' play it safe.
        //We want to preserve the order of operations.
        this.queryTree = Parentheses.Create(queryTree);
    }

    as<AliasT extends string> (
        alias : AliasT
    //This particular method has always given me problems
    //Always reaching the max instantiation depth.
    //https://github.com/microsoft/TypeScript/issues/29511
    //It seems like using `DataT & {queryTree : QueryTree}`
    //is better than using `this`.
    //I don't understand typescript
    //However, with enough calls to `as`, you still run into the max instantiation depth.
    //Better to just keep using `ExprUtil.as()` for now
    //) : ExprUtil.As<this, AliasT> {
    ) : ExprUtil.As<DataT & {queryTree : QueryTree}, AliasT> {
    /*) : (
        Expr<{
            readonly usedRef : DataT["usedRef"];
            readonly assertDelegate : DataT["assertDelegate"];
        }> &
        IExprSelectItem<{
            readonly usedRef : DataT["usedRef"];
            readonly assertDelegate : DataT["assertDelegate"];

            //TODO-DEBATE Consider allowing tableAlias to change?
            //There doesn't seem to be any harm in it.
            readonly tableAlias : typeof ALIASED;
            readonly alias : AliasT;
        }>
    ) {*/
        return ExprUtil.as(this, alias) as any;
    }

    asc () : ExprUtil.Asc<this> {
        return ExprUtil.asc(this);
    }
    desc () : ExprUtil.Desc<this> {
        return ExprUtil.desc(this);
    }
    sort (sortDirection : SortDirection) : ExprUtil.Sort<this> {
        return ExprUtil.sort(this, sortDirection);
    }
}

export type IAnonymousTypedExpr<TypeT> = (
    IExpr<{
        usedRef : ColumnRef,
        assertDelegate : sd.SafeMapper<TypeT>
    }>
);

export type TableExpr<
    TableT extends { alias : string, columns : ColumnMap },
    TypeT
> = Expr<{
    assertDelegate : sd.SafeMapper<TypeT>,
    usedRef : {
        [alias in TableT["alias"]] : TableT["columns"]
    },
}>;


export type TableExprSelectItem<
    TableT extends {
        alias: string;
        columns: ColumnMap;
    },
    TypeT,
    AliasT extends string
> = (
    {
        readonly assertDelegate: sd.SafeMapper<TypeT>;
        readonly tableAlias: typeof ALIASED;
        readonly alias: AliasT;

        //This is the same type as the commented IExpreSelectItem<> type...
        //However, when expressed this way, TS doesn't consume extra instantiation depth
        readonly usedRef: {
            [alias in TableT["alias"]]: TableT["columns"];
        };

        asc () : Asc<{
            assertDelegate : sd.SafeMapper<TypeT>,
            usedRef : {
                [alias in TableT["alias"]]: TableT["columns"];
            },
            queryTree : QueryTree,
        }>;
        desc () : Desc<{
            assertDelegate : sd.SafeMapper<TypeT>,
            usedRef : {
                [alias in TableT["alias"]]: TableT["columns"];
            },
            queryTree : QueryTree,
        }>;
        sort (sortDirection : SortDirection) : Sort<{
            assertDelegate : sd.SafeMapper<TypeT>,
            usedRef : {
                [alias in TableT["alias"]]: TableT["columns"];
            },
            queryTree : QueryTree,
        }>;

        readonly queryTree : QueryTree;
        readonly unaliasedQuery: QueryTree;
    }
);