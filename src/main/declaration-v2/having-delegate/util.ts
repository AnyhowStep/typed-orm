import {AnySelectBuilder} from "../select-builder";
import {HavingDelegate} from "./having-delegate";
import {JoinCollectionUtil} from "../join-collection";
import {SelectCollectionUtil} from "../select-collection";
import {ColumnReferencesUtil} from "../column-references";

import {Expr} from "../expr";
import {Join} from "../join";
import {Column} from "../column";
import {AliasedExpr} from "../aliased-expr";
import {AliasedTable} from "../aliased-table";
Expr;
Join;
Column;
AliasedExpr;
AliasedTable;

export namespace HavingDelegateUtil {
    export function execute<
        SelectBuilderT extends AnySelectBuilder,
        HavingDelegateT extends HavingDelegate<SelectBuilderT>
    > (
        selectBuilder : SelectBuilderT,
        delegate : HavingDelegateT
    ) {
        const joinColumnReferences = JoinCollectionUtil.toColumnReferences(selectBuilder.data.joins);
        const selectColumnReferences = SelectCollectionUtil.toColumnReferences(selectBuilder.data.select);
        const columnReferences = ColumnReferencesUtil.merge(
            selectColumnReferences,
            joinColumnReferences
        );

        const having = delegate(
            ColumnReferencesUtil.toConvenient(columnReferences) as any,
            selectBuilder
        );
        ColumnReferencesUtil.assertHasColumnReferences(
            columnReferences,
            having.usedReferences as any
        );
        return having;
    }
}