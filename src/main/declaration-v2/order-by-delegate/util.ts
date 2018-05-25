import {AnySelectBuilder} from "../select-builder";
import {OrderByDelegate} from "./order-by-delegate";
import {JoinCollectionUtil} from "../join-collection";
import {TupleWiden} from "../tuple";
import {AnyOrderBy} from "../order-by";
import {SelectCollectionUtil} from "../select-collection";
import {ColumnReferencesUtil} from "../column-references";
import {Column} from "../column";
import {Expr} from "../expr";

export namespace OrderByDelegateUtil {
    export function execute<
        SelectBuilderT extends AnySelectBuilder,
        OrderByDelegateT extends OrderByDelegate<SelectBuilderT>
    > (
        selectBuilder : SelectBuilderT,
        orderByDelegate : OrderByDelegateT
    ) : (
        TupleWiden<
            ReturnType<OrderByDelegateT>,
            AnyOrderBy
        >
    ) {
        const joinColumnReferences = JoinCollectionUtil.toColumnReferences(selectBuilder.data.joins);
        const selectColumnReferences = SelectCollectionUtil.toColumnReferences(selectBuilder.data.select);
        const columnReferences = ColumnReferencesUtil.merge(
            selectColumnReferences,
            joinColumnReferences
        );

        const result : TupleWiden<
            ReturnType<OrderByDelegateT>,
            AnyOrderBy
        > = orderByDelegate(
            ColumnReferencesUtil.toConvenient(columnReferences) as any,
            selectBuilder
        ) as any;
        for (let orderBy of result) {
            const first = (orderBy instanceof Array) ?
                orderBy[0] :
                orderBy;
            if (first instanceof Column) {
                ColumnReferencesUtil.assertHasColumn(columnReferences, first);
            } else if (first instanceof Expr) {
                ColumnReferencesUtil.assertHasColumnReferences(columnReferences, first.usedReferences);
            } else {
                throw new Error(`Unknown order by ${typeof first}`);
            }
        }
        return result;
    }
}