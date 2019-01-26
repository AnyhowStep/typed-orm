import {AnySelectBuilder} from "../select-builder";
import {UnionOrderByDelegate} from "./union-order-by-delegate";
import {TupleWiden} from "../tuple";
import {AnyOrderBy} from "../order-by";
import {SelectCollectionUtil} from "../select-collection";
import {ColumnReferencesUtil} from "../column-references";
import {Column} from "../column";
import {Expr} from "../expr";

export namespace UnionOrderByDelegateUtil {
    export function execute<
        SelectBuilderT extends AnySelectBuilder,
        UnionOrderByDelegateT extends UnionOrderByDelegate<SelectBuilderT>
    > (
        selectBuilder : SelectBuilderT,
        unionOrderByDelegate : UnionOrderByDelegateT
    ) : (
        TupleWiden<
            ReturnType<UnionOrderByDelegateT>,
            AnyOrderBy
        >|undefined
    ) {
        const columnReferences = SelectCollectionUtil.toColumnReferences(selectBuilder.data.selects);

        const result : TupleWiden<
            ReturnType<UnionOrderByDelegateT>,
            AnyOrderBy
        >|undefined = unionOrderByDelegate(
            ColumnReferencesUtil.toConvenient(columnReferences) as any,
            selectBuilder
        ) as any;
        if (result == undefined) {
            return undefined;
        }

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