import {ISelectBuilder, AnySelectBuilder} from "./select-builder";
import {IExpr} from "./expr";
import {ToPartialColumnReferences} from "./column-references-operation";

export type WhereCallback<
    FromBuilderT extends AnySelectBuilder
> = (
    FromBuilderT extends ISelectBuilder<infer DataT> ?
        (
            columnReferences : DataT["columnReferences"],
            fromBuilder : FromBuilderT
        ) => (
            IExpr<
                ToPartialColumnReferences<DataT["columnReferences"]>,
                boolean
            >
        ):
        never
);
