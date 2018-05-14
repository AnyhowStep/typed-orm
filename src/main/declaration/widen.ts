import {AnySelectBuilder, ISelectBuilder} from "./select-builder";
import {ColumnOfReferences} from "./column-references-operation";

export type TypeWidenCallback<
    SelectBuilderT extends AnySelectBuilder
> = (
    SelectBuilderT extends ISelectBuilder<infer DataT> ?
        (selectReferences : DataT["selectReferences"]) => (
            ColumnOfReferences<DataT["selectReferences"]>
        ):
        never
);
