import {AnySelectBuilder} from "../select-builder";
import {JoinCollectionUtil} from "../join-collection";
import {Tuple} from "../tuple";
import {Select} from "../select";

export type SelectDelegate<
    SelectBuilderT extends AnySelectBuilder
> = (
    (
        columnReferences : JoinCollectionUtil.ToConvenientColumnReferences<SelectBuilderT["data"]["joins"]>,
        selectBuilder : SelectBuilderT
    ) => (
        Tuple<Select<
            JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>
        >>
    )
);
