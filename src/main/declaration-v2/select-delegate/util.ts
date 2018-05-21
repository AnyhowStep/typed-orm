import {AnySelectBuilder} from "../select-builder";
import {SelectDelegate} from "./select-delegate";
import {JoinCollection, JoinCollectionUtil} from "../join-collection";
import {TupleWiden} from "../tuple";
import {AnySelect} from "../select";

export namespace SelectDelegateUtil {
    export function execute<
        SelectBuilderT extends AnySelectBuilder,
        JoinsT extends JoinCollection,
        SelectDelegateT extends SelectDelegate<SelectBuilderT, JoinsT>
    > (
        selectBuilder : SelectBuilderT,
        joins : JoinsT,
        selectDelegate : SelectDelegateT
    ) : (
        TupleWiden<
            ReturnType<SelectDelegateT>,
            AnySelect
        >
    ) {
        const result : TupleWiden<
            ReturnType<SelectDelegateT>,
            AnySelect
        > = selectDelegate(
            JoinCollectionUtil.toConvenientColumnReferences(joins),
            selectBuilder
        ) as any;
        return result;
    }
}
