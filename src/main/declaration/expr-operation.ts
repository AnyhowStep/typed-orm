import {
    AllowedExprConstants,
    RawExpr,
    IExpr,
    SelectBuilderValueQuery,
    ValueQueryTupleElementType
} from "./expr";
import {ISelectBuilder, AnySelectBuilder} from "./select-builder";
import {IColumn} from "./column";
import {Tuple} from "./tuple";

export type ExprUsedColumns<RawExprT extends RawExpr<any>> = (
    RawExprT extends AnySelectBuilder ?
    {} :
    RawExprT extends AllowedExprConstants ?
    {} :
    RawExprT extends IColumn<infer TableNameT, infer NameT, infer TypeT> ?
    {
        [table in TableNameT] : {
            [name in NameT] : IColumn<TableNameT, NameT, TypeT>
        }
    } :
    RawExprT extends IExpr<infer UsedColumnsT, any> ?
    UsedColumnsT :
    never
);
export type ExprType<RawExprT extends RawExpr<any>> = (
    RawExprT extends AllowedExprConstants ?
    RawExprT :
    RawExprT extends IColumn<any, any, infer TypeT> ?
    TypeT :
    RawExprT extends IExpr<any, infer TypeT> ?
    TypeT :
    RawExprT extends ISelectBuilder<infer DataT> ?
        (
            DataT["selectTuple"] extends (
                Tuple<SelectBuilderValueQuery<any>> &
                { length : 1 }
            ) ?
                ValueQueryTupleElementType<DataT["selectTuple"][0]> :
                ("Invalid selectTuple; must have 1 element, and not be a table"|void|never)
        )
     :
    ("Invalid RawExprT or could not infer TypeT/DataT"|void|never)
);