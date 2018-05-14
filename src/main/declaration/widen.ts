import {AnySelectBuilder, ISelectBuilder} from "./select-builder";
import {ColumnOfReferences} from "./column-references-operation";

export type TypeWidenCallback<
    FromBuilderT extends AnySelectBuilder
> = (
    FromBuilderT extends ISelectBuilder<infer DataT> ?
        (columnReferences : DataT["selectReferences"]) => (
            ColumnOfReferences<DataT["selectReferences"]>
        ):
        never
);
