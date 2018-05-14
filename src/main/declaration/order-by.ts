import {ISelectBuilder, AnySelectBuilder} from "./select-builder";
import {Tuple} from "./tuple";
import {ColumnReferences} from "./column-references";
import {ToPartialColumnReferences, ColumnOfReferences} from "./column-references-operation";
import {IExpr} from "./expr";

export type OrderByFirstComponent<ColumnReferencesT extends ColumnReferences> = (
    (IExpr<
        ToPartialColumnReferences<ColumnReferencesT>,
        any
    >)|
    ColumnOfReferences<ColumnReferencesT>
);

export type OrderByTupleElement<ColumnReferencesT extends ColumnReferences> = (
    //Defaults to ASCENDING
    OrderByFirstComponent<ColumnReferencesT>|
    [
        OrderByFirstComponent<ColumnReferencesT>,
        //true for ASCENDING, false for DESCENDING
        boolean
    ]
);

export type AnyOrderByTupleElement = OrderByTupleElement<any>;

export type OrderByCallback<SelectBuilderT extends AnySelectBuilder> = (
    SelectBuilderT extends ISelectBuilder<infer DataT> ?
        (
            columnReferences : (
                DataT["columnReferences"] &
                DataT["selectReferences"]
            ),
            selectBuilder : SelectBuilderT
        ) => (
            Tuple<OrderByTupleElement<
                DataT["columnReferences"] &
                DataT["selectReferences"]
            >>
        ):
        never
);
