import {AnySelectBuilder} from "../select-builder";
import {ColumnReferencesUtil} from "../column-references";
import {SelectCollectionUtil} from '../select-collection';
import {Tuple} from "../tuple";
import {OrderBy} from "../order-by";

/*
Different from OrderByDelegate.
You can order by columns in JOINs or SELECT.

But you can only apply the global ORDER BY to
columns in the SELECT clause
*/
export type UnionOrderByDelegate<
    SelectBuilderT extends AnySelectBuilder
> = (
    (
        columnReferences : (
            ColumnReferencesUtil.ToConvenient<
                SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>
            >
        ),
        selectBuilder : SelectBuilderT
    ) => (
        Tuple<
            OrderBy<
                SelectCollectionUtil.ToColumnReferences<SelectBuilderT["data"]["selects"]>
            >
        >|undefined
    )
)