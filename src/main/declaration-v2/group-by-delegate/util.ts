import {AnySelectBuilder} from "../select-builder";
import {GroupByDelegate} from "./group-by-delegate";
import {JoinCollectionUtil} from "../join-collection";
import {TupleWiden} from "../tuple";
import {AnyGroupBy} from "../group-by";
import {SelectCollectionUtil} from "../select-collection";
import {ColumnReferencesUtil} from "../column-references";

export namespace GroupByDelegateUtil {
    export function execute<
        SelectBuilderT extends AnySelectBuilder,
        GroupByDelegateT extends GroupByDelegate<SelectBuilderT>
    > (
        selectBuilder : SelectBuilderT,
        groupByDelegate : GroupByDelegateT
    ) : (
        TupleWiden<
            ReturnType<GroupByDelegateT>,
            AnyGroupBy
        >
    ) {
        const joinColumnReferences = JoinCollectionUtil.toColumnReferences(selectBuilder.data.joins);
        const selectColumnReferences = SelectCollectionUtil.toColumnReferences(selectBuilder.data.select);
        const columnReferences = ColumnReferencesUtil.merge(
            selectColumnReferences,
            joinColumnReferences
        );

        const result : TupleWiden<
            ReturnType<GroupByDelegateT>,
            AnyGroupBy
        > = groupByDelegate(
            ColumnReferencesUtil.toConvenient(columnReferences) as any,
            selectBuilder
        ) as any;
        ColumnReferencesUtil.assertHasColumns(columnReferences, result);
        return result;
    }
}