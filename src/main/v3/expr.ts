import * as sd from "schema-decorator";
import {ColumnRef} from "./column-ref";
import {RawExpr, RawExprUtil} from "./raw-expr";
import {QueryTree, QueryTreeUtil} from "./query-tree";

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

        this.queryTree = queryTree;
    }
}

export type IAnonymousTypedExpr<TypeT> = (
    IExpr<{
        usedRef : ColumnRef,
        assertDelegate : sd.AssertDelegate<TypeT>
    }>
);

export namespace Expr {
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

    export type FromRawExpr<RawExprT extends RawExpr<any>> = (
        Expr<{
            usedRef : RawExprUtil.UsedRef<RawExprT>,
            assertDelegate : RawExprUtil.AssertDelegate<RawExprT>
        }>
    );
    export function fromRawExpr<
        RawExprT extends RawExpr<any>
    > (
        rawExpr : RawExprT
    ) : FromRawExpr<RawExprT> {
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
}