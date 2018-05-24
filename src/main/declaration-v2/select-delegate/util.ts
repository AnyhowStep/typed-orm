import {AnySelectBuilder} from "../select-builder";
import {SelectDelegate} from "./select-delegate";
import {JoinCollectionUtil} from "../join-collection";
import {TupleWiden} from "../tuple";
import {AnySelect} from "../select";
import {ColumnReferencesUtil} from "../column-references";

export namespace SelectDelegateUtil {
    export function execute<
        SelectBuilderT extends AnySelectBuilder,
        SelectDelegateT extends SelectDelegate<SelectBuilderT>
    > (
        selectBuilder : SelectBuilderT,
        selectDelegate : SelectDelegateT
    ) : (
        TupleWiden<
            ReturnType<SelectDelegateT>,
            AnySelect
        >
    ) {
        const columnReferences = JoinCollectionUtil.toColumnReferences(selectBuilder.data.joins);
        const result : TupleWiden<
            ReturnType<SelectDelegateT>,
            AnySelect
        > = selectDelegate(
            ColumnReferencesUtil.toConvenient(columnReferences) as any,
            selectBuilder
        ) as any;
        return result;
    }
}
