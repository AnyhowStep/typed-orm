import { AnySelectBuilder } from "../select-builder";
import { TypeNarrowDelegateColumnReferences, TypeNarrowDelegate } from "./type-narrow-delegate";
export declare namespace TypeNarrowDelegateUtil {
    function toColumnReferences<SelectBuilderT extends AnySelectBuilder>(selectBuilder: SelectBuilderT): (TypeNarrowDelegateColumnReferences<SelectBuilderT>);
    type GetColumn<SelectBuilderT extends AnySelectBuilder, TypeNarrowDelegateT extends TypeNarrowDelegate<SelectBuilderT>> = (ReturnType<TypeNarrowDelegateT>);
    function getColumn<SelectBuilderT extends AnySelectBuilder, TypeNarrowDelegateT extends TypeNarrowDelegate<SelectBuilderT>>(selectBuilder: SelectBuilderT, typeNarrowDelegate: TypeNarrowDelegateT): (GetColumn<SelectBuilderT, TypeNarrowDelegateT>);
}
//# sourceMappingURL=util.d.ts.map