import {ISelectBuilder, AnySelectBuilder} from "./select-builder";
import {Tuple} from "./tuple";
import {ColumnReferences} from "./column-references";
import {ColumnOfReferences} from "./column-references-operation";

export type GroupByTupleElement<ColumnReferencesT extends ColumnReferences> = (
    ColumnReferencesT[keyof ColumnReferencesT]|
    ColumnOfReferences<ColumnReferencesT>
);
export type AnyGroupByTupleElement = GroupByTupleElement<any>;

export type GroupByCallback<SelectBuilderT extends AnySelectBuilder> = (
    SelectBuilderT extends ISelectBuilder<infer DataT> ?
        (
            columnReferences : DataT["columnReferences"] & DataT["selectReferences"],
            selectBuilder : SelectBuilderT
        ) => (
            Tuple<
                GroupByTupleElement<DataT["columnReferences"] & DataT["selectReferences"]>
            >
        ):
        never
);
