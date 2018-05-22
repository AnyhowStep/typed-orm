import {AnySelectBuilder} from "../select-builder";
import {JoinCollectionUtil} from "../join-collection";
import {ColumnReferencesUtil} from "../column-references";
import {SelectCollectionUtil} from '../select-collection';
import {AnyGroupBy, GroupBy} from "../group-by";
import {Tuple, TupleWiden} from "../tuple";

export type GroupByDelegate<
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
                GroupBy<
                    ColumnReferencesUtil.Merge<
                        JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>,
                        SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>
                    >
                >
            >,
            AnyGroupBy
        >
    )
)