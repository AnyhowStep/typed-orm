import * as sd from "schema-decorator";
import {ColumnRef} from "./column-ref";
import {RawExpr, RawExprUtil} from "./raw-expr";
import {QueryTree, QueryTreeUtil, Parentheses} from "./query-tree";
import {IExprSelectItem} from "./expr-select-item";
import {ALIASED} from "./constants";
import {PrimitiveExpr} from "./primitive-expr";

export interface ExprData {
    readonly usedRef : ColumnRef;
    readonly assertDelegate : sd.AssertDelegate<any>;
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
    ) : ExprUtil.As<this, AliasT> {
        return ExprUtil.as(this, alias);
    }
}

export type IAnonymousTypedExpr<TypeT> = (
    IExpr<{
        usedRef : ColumnRef,
        assertDelegate : sd.AssertDelegate<TypeT>
    }>
);

export namespace ExprUtil {
    export function isExpr (raw : any) : raw is IExpr {
        return (
            (raw != undefined) &&
            (raw instanceof Object) &&
            ("usedRef" in raw) &&
            ("assertDelegate" in raw) &&
            ("queryTree" in raw) &&
            (raw.usedRef instanceof Object) &&
            (typeof raw.assertDelegate == "function") &&
            (QueryTreeUtil.isQueryTree(raw.queryTree))
        );
    }

    export type FromRawExpr<RawExprT extends RawExpr<PrimitiveExpr>> = (
        Expr<{
            usedRef : RawExprUtil.UsedRef<RawExprT>,
            assertDelegate : RawExprUtil.AssertDelegate<RawExprT>
        }>
    );
    export function fromRawExpr<
        RawExprT extends RawExpr<PrimitiveExpr>
    > (
        rawExpr : RawExprT
    ) : FromRawExpr<RawExprT> {
        if (rawExpr instanceof Expr) {
            return rawExpr;
        }
        const usedRef = RawExprUtil.usedRef(rawExpr);
        const assertDelegate = RawExprUtil.assertDelegate(rawExpr);
        const queryTree = RawExprUtil.queryTree(rawExpr);
        return new Expr(
            {
                usedRef,
                assertDelegate,
            },
            queryTree
        );
    }

    export type As<ExprT extends IExpr, AliasT extends string> = (
        IExprSelectItem<{
            readonly usedRef : ExprT["usedRef"];
            readonly assertDelegate : ExprT["assertDelegate"];

            //TODO Consider allowing tableAlias to change?
            //There doesn't seem to be any harm in it.
            readonly tableAlias : typeof ALIASED;
            readonly alias : AliasT;
        }>
    );
    export function as<ExprT extends IExpr, AliasT extends string> (
        expr : ExprT,
        alias : AliasT
    ) : As<ExprT, AliasT> {
        return {
            usedRef : expr.usedRef,
            assertDelegate : expr.assertDelegate,

            tableAlias : ALIASED,
            alias : alias,

            unaliasedQuery : expr.queryTree,
        };
    }
}