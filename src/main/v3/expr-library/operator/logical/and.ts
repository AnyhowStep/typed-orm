import * as sd from "schema-decorator";
import {RawExpr, RawExprUtil} from "../../../raw-expr";
import {Expr, ExprData} from "../../../expr";
import {Tuple} from "../../../tuple";
import {QueryTree, Parentheses, QueryTreeArray} from "../../../query-tree";

/*import * as sd from "schema-decorator";
import {Expr} from "../../../expr";
import {RawExpr} from "../../../raw-expr";
import {NonNullPrimitiveExpr} from "../../../primitive-expr";
import {RawExprUtil} from "../../../raw-expr";
import {ColumnRefUtil} from "../../../column-ref";
import {ExprData} from "../../../expr";
import {QueryTree, Parentheses} from "../../../query-tree";

class AndExpr<DataT extends Pick<ExprData, "usedRef">> extends Expr<{
    usedRef : DataT["usedRef"],
    assertDelegate : sd.AssertDelegate<boolean>,
}> {
    constructor (
        data : DataT,
        queryTree : QueryTree
    ) {
        super(
            {
                usedRef : data.usedRef,
                assertDelegate : sd.numberToBoolean()
            },
            queryTree
        );
    }
}
export declare function and2<ExprArrT extends RawExpr<boolean>[]> (
    ...arr : ExprArrT
) : (
    Expr<{
        usedRef : ColumnRefUtil.IntersectTuple<
            {
                //TODO More
                [index in Extract<keyof ExprArrT, "0"|"1"|"2"|"3"|"4"|"5">] : (
                    RawExprUtil.UsedRef<LeftT>
                )
            }
        >,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
)
export function and<
    LeftT extends RawExpr<boolean>,
    R0 extends RawExpr<boolean>
>(
    left : LeftT,
    r0 : R0
) : (
    Expr<{
        usedRef : ColumnRefUtil.Intersect<
            RawExprUtil.UsedRef<LeftT>,
            RawExprUtil.UsedRef<R0>
        >,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    return new Expr(
        {
            usedRef : ColumnRefUtil.intersect(
                RawExprUtil.usedRef(left),
                RawExprUtil.usedRef(r0)
            ),
            assertDelegate : sd.numberToBoolean(),
        },
        [
            (left instanceof AndExpr && left.queryTree instanceof Parentheses) ?
            left.queryTree.getTree() :
            RawExprUtil.queryTree(left),
            "AND",
            RawExprUtil.queryTree(r0),
        ]
    );
}*/
//TODO
class AndExpr<DataT extends Pick<ExprData, "usedRef">> extends Expr<{
    usedRef : DataT["usedRef"],
    assertDelegate : sd.AssertDelegate<boolean>,
}> {
    constructor (
        data : DataT,
        queryTree : QueryTree
    ) {
        super(
            {
                usedRef : data.usedRef,
                assertDelegate : sd.numberToBoolean()
            },
            queryTree
        );
    }
}
export function and<ArrT extends Tuple<RawExpr<boolean>>> (
    ...arr : ArrT
) : (
    Expr<{
        usedRef : RawExprUtil.IntersectUsedRefTuple<ArrT>,
        assertDelegate : sd.AssertDelegate<boolean>,
    }>
) {
    const usedRef = RawExprUtil.intersectUsedRefTuple(...arr);
    const queryTree : QueryTreeArray = [];

    const trueLiteral = RawExprUtil.queryTree(true);

    for (let rawExpr of arr) {
        if (rawExpr instanceof AndExpr) {
            if (rawExpr.queryTree === trueLiteral) {
                continue;
            } else if (rawExpr.queryTree instanceof Parentheses) {
                const tree = rawExpr.queryTree.getTree();
                if (tree instanceof Array) {
                    if (tree.length == 0) {
                        //This shouldn't happen, in general...
                        continue;
                    }
                    if (tree.length == 1 && tree[0] === trueLiteral) {
                        //Makes resultant queries "tidier" if we eliminate all true constants
                        continue;
                    }
                    if (queryTree.length > 0) {
                        queryTree.push("AND");
                    }
                    queryTree.push(...tree);
                } else {
                    //Makes resultant queries "tidier" if we eliminate all true constants
                    if (tree === trueLiteral) {
                        continue;
                    }
                    if (queryTree.length > 0) {
                        queryTree.push("AND");
                    }
                    queryTree.push(tree);
                }
            } else {
                if (queryTree.length > 0) {
                    queryTree.push("AND");
                }
                queryTree.push(RawExprUtil.queryTree(rawExpr));
            }
        } else {
            //Makes resultant queries "tidier" if we eliminate all true constants
            if (rawExpr === true) {
                continue;
            }
            if (queryTree.length > 0) {
                queryTree.push("AND");
            }
            queryTree.push(RawExprUtil.queryTree(rawExpr));
        }
    }
    if (queryTree.length == 0) {
        return new AndExpr(
            {
                usedRef : usedRef,
            },
            trueLiteral
        );
    } else {
        return new AndExpr(
            {
                usedRef : usedRef,
            },
            queryTree
        );
    }
}