import { AnyRawExpr, RawExprUtil } from "../raw-expr";
import { ColumnReferencesUtil } from "../column-references";
export declare function querifyNullable<LeftT extends AnyRawExpr, RightT extends AnyRawExpr>(left: LeftT, ...rightArr: RightT[]): ({
    used: ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<LeftT>, RawExprUtil.UsedReferences<RightT>>;
    leftQuery: string;
    rightQueries: string[];
});
export declare function querifyNonNullable<LeftT extends AnyRawExpr, RightT extends AnyRawExpr>(left: LeftT, ...rightArr: RightT[]): ({
    used: ColumnReferencesUtil.Merge<RawExprUtil.UsedReferences<LeftT>, RawExprUtil.UsedReferences<RightT>>;
    leftQuery: string;
    rightQueries: string[];
});
//# sourceMappingURL=variadic-util.d.ts.map