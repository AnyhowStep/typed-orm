import { JoinCollection } from "../join-collection";
import { TypeNarrowDelegate } from "./type-narrow-delegate";
export declare namespace TypeNarrowDelegateUtil {
    type GetColumn<JoinsT extends JoinCollection, TypeNarrowDelegateT extends TypeNarrowDelegate<JoinsT>> = (ReturnType<TypeNarrowDelegateT>);
    function getColumn<JoinsT extends JoinCollection, TypeNarrowDelegateT extends TypeNarrowDelegate<JoinsT>>(joins: JoinsT, typeNarrowDelegate: TypeNarrowDelegateT): (GetColumn<JoinsT, TypeNarrowDelegateT>);
}
