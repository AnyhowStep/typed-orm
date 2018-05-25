import {AnySelectBuilder} from "../select-builder";
import {SelectDelegate, SelectDelegateColumnReferences} from "./select-delegate";
import {JoinCollectionUtil} from "../join-collection";
import {TupleWiden} from "../tuple";
import {AnySelect} from "../select";
import {ColumnReferencesUtil} from "../column-references";

export namespace SelectDelegateUtil {
    export function toColumnReferences<
        SelectBuilderT extends AnySelectBuilder
    > (
        selectBuilder : SelectBuilderT
    ) : (
        SelectDelegateColumnReferences<SelectBuilderT>
    ) {
        const joinColumnReferences = selectBuilder.data.hasFrom ?
            JoinCollectionUtil.toColumnReferences(selectBuilder.data.joins) :
            {};
        const parentJoinColumnReferences = selectBuilder.data.hasParentJoins ?
            JoinCollectionUtil.toColumnReferences(selectBuilder.data.parentJoins) :
            {};
        
        return {
            ...parentJoinColumnReferences,
            ...joinColumnReferences,
        } as any;
    }
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
        const columnReferences = toColumnReferences(selectBuilder);
        const result : TupleWiden<
            ReturnType<SelectDelegateT>,
            AnySelect
        > = selectDelegate(
            ColumnReferencesUtil.toConvenient(columnReferences) as any,
            selectBuilder
        ) as any;
        //TODO Write assertions, expressions must use column references only
        //columns must exist in column references
        //Column collections must exist in column references
        return result;
    }
}
