import {AnySelectBuilder} from "../select-builder";
import {SelectDelegate} from "./select-delegate";
import {JoinCollection, JoinCollectionUtil} from "../join-collection";

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
        ReturnType<SelectDelegateT>
    ) {
        const result : ReturnType<SelectDelegateT> = selectDelegate(
            JoinCollectionUtil.toConvenientColumnReferences(joins),
            selectBuilder
        ) as any;
        return result;
    }
}
