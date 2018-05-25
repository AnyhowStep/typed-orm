import {AnySelectBuilder} from "../select-builder";
import {JoinCollectionUtil} from "../join-collection";
import {ColumnReferencesUtil} from "../column-references";
import {SelectCollectionUtil} from '../select-collection';
import {Tuple} from "../tuple";
import {OrderBy} from "../order-by";

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
        Tuple<
            OrderBy<
                ColumnReferencesUtil.Merge<
                    JoinCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["joins"]>,
                    SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>
                >
            >
        >|undefined
    )
)