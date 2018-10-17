import {AnySelectBuilder} from "../select-builder";
import {JoinCollectionUtil} from "../join-collection";
import {ColumnReferencesUtil} from "../column-references";

export type TypeNarrowDelegateColumnReferences<
    SelectBuilderT extends AnySelectBuilder
> = (
    (
        SelectBuilderT["data"]["hasFrom"] extends true ?
            JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]> :
            {}
    ) &
    (
        SelectBuilderT["data"]["hasParentJoins"] extends true ?
            JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["parentJoins"]> :
            {}
    )
);

export type TypeNarrowDelegate<
    SelectBuilderT extends AnySelectBuilder
> = (
    (
        columnReferences : ColumnReferencesUtil.ToConvenient<
            TypeNarrowDelegateColumnReferences<SelectBuilderT>
        >
    ) => (
        (
            SelectBuilderT["data"]["hasFrom"] extends true ?
                JoinCollectionUtil.NullableColumns<SelectBuilderT["data"]["joins"]> :
                never
        ) |
        (
            SelectBuilderT["data"]["hasParentJoins"] extends true ?
                JoinCollectionUtil.NullableColumns<SelectBuilderT["data"]["parentJoins"]> :
                never
        )
    )
);
