import {AnySelectBuilder} from "../select-builder";
import {WhereDelegate} from "./where-delegate";
import {JoinCollectionUtil} from "../join-collection";
import {ColumnReferencesUtil} from "../column-references";

export namespace WhereDelegateUtil {
    export function execute<
        SelectBuilderT extends AnySelectBuilder,
        WhereDelegateT extends WhereDelegate<SelectBuilderT>
    > (
        selectBuilder : SelectBuilderT,
        delegate : WhereDelegateT
    ) {
        const columnReferences = JoinCollectionUtil.toColumnReferences(selectBuilder.data.joins);
        const where = delegate(
            ColumnReferencesUtil.toConvenient(columnReferences) as any,
            selectBuilder
        );
        ColumnReferencesUtil.assertHasColumnReferences(
            columnReferences,
            where.usedReferences as any
        );
        return where;
    }
}