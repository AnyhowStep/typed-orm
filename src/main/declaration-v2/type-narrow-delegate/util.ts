import {AnySelectBuilder} from "../select-builder";
import {JoinCollectionUtil} from "../join-collection";
import {ColumnReferencesUtil} from "../column-references";
import {TypeNarrowDelegateColumnReferences, TypeNarrowDelegate} from "./type-narrow-delegate";

export namespace TypeNarrowDelegateUtil {
    export function toColumnReferences<
        SelectBuilderT extends AnySelectBuilder
    > (
        selectBuilder : SelectBuilderT
    ) : (
        TypeNarrowDelegateColumnReferences<SelectBuilderT>
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
    export type GetColumn<
        SelectBuilderT extends AnySelectBuilder,
        TypeNarrowDelegateT extends TypeNarrowDelegate<SelectBuilderT>
    > = (
        ReturnType<TypeNarrowDelegateT>
    );
    export function getColumn<
        SelectBuilderT extends AnySelectBuilder,
        TypeNarrowDelegateT extends TypeNarrowDelegate<SelectBuilderT>
    > (
        selectBuilder : SelectBuilderT,
        typeNarrowDelegate : TypeNarrowDelegateT
    ) : (
        GetColumn<SelectBuilderT, TypeNarrowDelegateT>
    ) {
        const columnReferences = toColumnReferences(selectBuilder);
        const column = typeNarrowDelegate(
            ColumnReferencesUtil.toConvenient(columnReferences) as any
        );
        ColumnReferencesUtil.assertHasColumn(columnReferences, column as any);
        return column as any;
    }
}