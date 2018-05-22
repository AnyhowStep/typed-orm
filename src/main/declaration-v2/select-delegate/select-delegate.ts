import {AnySelectBuilder} from "../select-builder";
import {JoinCollection, JoinCollectionUtil} from "../join-collection";
import {Tuple, TupleWiden} from "../tuple";
import {Select, AnySelect} from "../select";

//TODO It looks like we can just pass SelectBuilderT on its own
//TODO remove JoinsT?
export type SelectDelegate<
    SelectBuilderT extends AnySelectBuilder,
    JoinsT extends JoinCollection
> = (
    (
        columnReferences : JoinCollectionUtil.ToConvenientColumnReferences<JoinsT>,
        selectBuilder : SelectBuilderT
    ) => (
        Tuple<Select<
            JoinCollectionUtil.ToColumnReferences<JoinsT>
        >>
    )
);
