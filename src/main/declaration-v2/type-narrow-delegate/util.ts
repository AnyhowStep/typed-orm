import {JoinCollection, JoinCollectionUtil} from "../join-collection";
import {ColumnReferencesUtil} from "../column-references";
import {TypeNarrowDelegate} from "./type-narrow-delegate";

export namespace TypeNarrowDelegateUtil {
    export type GetColumn<
        JoinsT extends JoinCollection,
        TypeNarrowDelegateT extends TypeNarrowDelegate<JoinsT>
    > = (
        ReturnType<TypeNarrowDelegateT>
    );
    export function getColumn<
        JoinsT extends JoinCollection,
        TypeNarrowDelegateT extends TypeNarrowDelegate<JoinsT>
    > (
        joins : JoinsT,
        typeNarrowDelegate : TypeNarrowDelegateT
    ) : (
        GetColumn<JoinsT, TypeNarrowDelegateT>
    ) {
        const ref = JoinCollectionUtil.toColumnReferences(joins);
        const column = typeNarrowDelegate(ColumnReferencesUtil.toConvenient(ref) as any);
        ColumnReferencesUtil.assertHasColumn(ref, column as any);
        return column as any;
    }
}