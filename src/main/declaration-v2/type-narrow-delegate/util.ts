import {JoinCollection, JoinCollectionUtil} from "../join-collection";
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
        const result = typeNarrowDelegate(JoinCollectionUtil.toConvenientColumnReferences(joins));
        return result as any;
    }
}