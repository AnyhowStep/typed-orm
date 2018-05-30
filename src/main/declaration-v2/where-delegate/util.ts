import {AnySelectBuilder} from "../select-builder";
import {WhereDelegate, WhereDelegateColumnReferences} from "./where-delegate";
import {JoinCollectionUtil} from "../join-collection";
import {ColumnReferencesUtil} from "../column-references";

import {Expr} from "../expr";
import {Join} from "../join";
import {Column} from "../column";
import {AliasedTable} from "../aliased-table";
Expr;
Join;
Column;
AliasedTable;

export namespace WhereDelegateUtil {
    export function toColumnReferences<
        SelectBuilderT extends AnySelectBuilder
    > (
        selectBuilder : SelectBuilderT
    ) : (
        WhereDelegateColumnReferences<SelectBuilderT>
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
        WhereDelegateT extends WhereDelegate<SelectBuilderT>
    > (
        selectBuilder : SelectBuilderT,
        delegate : WhereDelegateT
    ) : (
        Expr<
            ColumnReferencesUtil.Partial<
                WhereDelegateColumnReferences<SelectBuilderT>
            >,
            boolean
        >
    ) {
        const columnReferences = toColumnReferences(selectBuilder);
        const where = delegate(
            ColumnReferencesUtil.toConvenient(columnReferences) as any,
            selectBuilder
        );
        console.log(columnReferences);
        ColumnReferencesUtil.assertHasColumnReferences(
            columnReferences,
            where.usedReferences as any
        );
        return where;
    }
}