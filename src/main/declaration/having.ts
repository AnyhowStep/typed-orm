import {ISelectBuilder, AnySelectBuilder} from "./select-builder";
import {IExpr} from "./expr";
import {ToPartialColumnReferences} from "./column-references-operation";

export type HavingCallback<
    FromBuilderT extends AnySelectBuilder
> = (
    FromBuilderT extends ISelectBuilder<infer DataT> ?
        (
            columnReferences : DataT["columnReferences"] & DataT["selectReferences"],
            fromBuilder : FromBuilderT
        ) => (
            IExpr<
                ToPartialColumnReferences<DataT["columnReferences"] & DataT["selectReferences"]>,
                boolean
            >
        ):
        never
);
