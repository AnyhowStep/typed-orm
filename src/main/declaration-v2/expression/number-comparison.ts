import {booleanExpr} from "./boolean-expr";
import {RawExpr, RawExprUtil} from "../raw-expr";
import {ColumnReferencesUtil} from "../column-references";
import {Expr} from "../expr";

import {SelectBuilder} from "../select-builder";
import {Column} from "../column";
import {AliasedExpr} from "../aliased-expr";
import {Join} from "../join";
import {AliasedTable} from "../aliased-table";
SelectBuilder;
Column;
AliasedExpr;
Join;
AliasedTable;

import {JoinCollectionUtil} from "../join-collection";
import {ColumnCollection} from "../column-collection";
import {TupleKeys} from "../tuple";
JoinCollectionUtil;
((
    _0? : ColumnCollection,
    _1? : TupleKeys<any>
) => 0)();

function numberComparison (operator : string) {
    function result<
        LeftT extends RawExpr<number>,
        RightT extends RawExpr<number>
    > (left : LeftT, right : RightT) : (
        Expr<
            ColumnReferencesUtil.Merge<
                RawExprUtil.UsedReferences<LeftT>,
                RawExprUtil.UsedReferences<RightT>
            >,
            boolean
        >
    ) {
        RawExprUtil.assertNonNullable(left);
        RawExprUtil.assertNonNullable(right);

        return booleanExpr(
            ColumnReferencesUtil.merge(
                RawExprUtil.usedReferences(left),
                RawExprUtil.usedReferences(right)
            ),
            //TODO More readable queries
            `${RawExprUtil.querify(left)} ${operator} ${RawExprUtil.querify(right)}`
        );
    }
    Object.defineProperty(result, "name", {
        value : operator,
    });
    return result;
}

export const lt = numberComparison("<");
export const gt = numberComparison(">");
export const ltEq = numberComparison("<=");
export const gtEq = numberComparison(">=");
