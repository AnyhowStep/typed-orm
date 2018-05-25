import {AnyRawExpr, RawExprUtil} from "../raw-expr";
import {ColumnReferencesUtil} from "../column-references";

export function querifyNullable<
    LeftT extends AnyRawExpr,
    RightT extends AnyRawExpr
> (left : LeftT, ...rightArr : RightT[]) : (
    {
        used : ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        leftQuery : string,
        rightQueries : string[]
    }
) {
    let used : any = RawExprUtil.usedReferences(left);
    const leftQuery = RawExprUtil.querify(left);
    const rightQueries : string[] = [];
    
    for (let r of rightArr) {
        used = ColumnReferencesUtil.merge(
            used,
            RawExprUtil.usedReferences(r)
        );
        rightQueries.push(RawExprUtil.querify(r));
    }
    return {
        used : used,
        leftQuery : leftQuery,
        rightQueries : rightQueries,
    };
}

export function querifyNonNullable<
    LeftT extends AnyRawExpr,
    RightT extends AnyRawExpr
> (left : LeftT, ...rightArr : RightT[]) : (
    {
        used : ColumnReferencesUtil.Merge<
            RawExprUtil.UsedReferences<LeftT>,
            RawExprUtil.UsedReferences<RightT>
        >,
        leftQuery : string,
        rightQueries : string[]
    }
) {
    RawExprUtil.assertNonNullable(left);
    for (let r of rightArr) {
        RawExprUtil.assertNonNullable(r);
    }

    return querifyNullable(left, ...rightArr);
}