import * as sd from "schema-decorator";
import {ColumnRef} from "./column-ref";
import {RawExpr, RawExprUtil} from "./raw-expr";
import {QueryStringTree} from "./query-string-tree";

export interface ExprData {
    readonly usedRef : ColumnRef;
    readonly assertDelegate : sd.AssertDelegate<any>;
}

export interface IExpr<DataT extends ExprData=ExprData> {
    readonly usedRef : DataT["usedRef"];
    readonly assertDelegate : DataT["assertDelegate"];

    readonly queryStringTree : QueryStringTree;
}

export class Expr<DataT extends ExprData> implements IExpr<DataT> {
    readonly usedRef : DataT["usedRef"];
    readonly assertDelegate : DataT["assertDelegate"];

    readonly queryStringTree : QueryStringTree;

    public constructor (
        data : DataT,
        queryStringTree : QueryStringTree
    ) {
        this.usedRef = data.usedRef;
        this.assertDelegate = data.assertDelegate;

        this.queryStringTree = queryStringTree;
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
            ("query" in raw) &&
            (raw.usedRef instanceof Object) &&
            (typeof raw.assertDelegate == "function") &&
            (typeof raw.query == "string")
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
        const queryStringTree = RawExprUtil.queryStringTree(rawExpr);
        return new Expr(
            {
                usedRef,
                assertDelegate,
            },
            queryStringTree
        );
    }
}