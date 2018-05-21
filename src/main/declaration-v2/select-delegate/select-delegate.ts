import {AnySelectBuilder} from "../select-builder";
import {JoinCollection, JoinCollectionUtil} from "../join-collection";
import {Tuple, TupleWiden} from "../tuple";
import {Select, AnySelect} from "../select";

export type SelectDelegate<
    SelectBuilderT extends AnySelectBuilder,
    JoinsT extends JoinCollection
> = (
    (
        columnReferences : JoinCollectionUtil.ToConvenientColumnReferences<JoinsT>,
        selectBuilder : SelectBuilderT
    ) => (
        TupleWiden<
            Tuple<Select<
                JoinCollectionUtil.ToColumnReferences<JoinsT>
            >>,
            AnySelect
        >
    )
);
