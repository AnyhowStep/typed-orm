import * as sd from "schema-decorator";
import {IColumn} from "../column";
import {QueryTree, Parentheses} from "../query-tree";
import {SortDirection} from "../order";
import * as ExprUtil from "./util";

export interface ExprData {
    readonly usedColumns : IColumn[];
    readonly assertDelegate : sd.AssertDelegate<any>;
}

export interface IExpr<DataT extends ExprData=ExprData> {
    readonly usedColumns : DataT["usedColumns"];
    readonly assertDelegate : DataT["assertDelegate"];

    readonly queryTree : QueryTree;
}

export class Expr<DataT extends ExprData> implements IExpr<DataT> {
    readonly usedColumns : DataT["usedColumns"];
    readonly assertDelegate : DataT["assertDelegate"];

    readonly queryTree : QueryTree;

    public constructor (
        data : DataT,
        queryTree : QueryTree
    ) {
        this.usedColumns = data.usedColumns;
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
        usedColumns : IColumn[],
        assertDelegate : sd.AssertDelegate<TypeT>
    }>
);