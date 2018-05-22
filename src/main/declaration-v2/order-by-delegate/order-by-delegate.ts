import {AnySelectBuilder} from "../select-builder";
import {JoinCollectionUtil} from "../join-collection";
import {ColumnReferencesUtil} from "../column-references";
import {SelectCollectionUtil} from '../select-collection';
import {Tuple, TupleWiden} from "../tuple";
import {OrderBy, AnyOrderBy} from "../order-by";

export type OrderByDelegate<
    SelectBuilderT extends AnySelectBuilder
> = (
    (
        columnReferences : (
            ColumnReferencesUtil.ToConvenient<
                ColumnReferencesUtil.Merge<
                    JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>,
                    SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>
                >
            >
        ),
        selectBuilder : SelectBuilderT
    ) => (
        TupleWiden<
            Tuple<
                OrderBy<
                    ColumnReferencesUtil.Merge<
                        JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>,
                        SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>
                    >
                >
            >,
            AnyOrderBy
        >
    )
)