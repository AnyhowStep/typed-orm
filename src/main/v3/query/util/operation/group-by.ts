import * as sd from "schema-decorator";
import {ToUnknownIfAllFieldsNever} from "../../../type";
import {Query} from "../../query";
import {AfterFromClause} from "../predicate";
import {ColumnRef, ColumnRefUtil} from "../../../column-ref";
import {ColumnMap, ColumnMapUtil} from "../../../column-map";
import {NonEmptyTuple, TupleUtil} from "../../../tuple";
import {SelectItem} from "../../../select-item";
import {IExprSelectItem, ExprSelectItemUtil} from "../../../expr-select-item";
import {IColumn, ColumnUtil} from "../../../column";
import {ColumnIdentifier, ColumnIdentifierUtil} from "../../../column-identifier";
import {ColumnIdentifierRefUtil} from "../../../column-identifier-ref";

export type GroupByDelegate<
    QueryT extends AfterFromClause
> = (
    (
        columns : ColumnIdentifierRefUtil.ToConvenient<
            ColumnIdentifierRefUtil.FromQuery<QueryT>
        >
    ) => NonEmptyTuple<SelectItem>
);
export type GroupBy<
    QueryT extends AfterFromClause,
    GroupByDelegateT extends GroupByDelegate<QueryT>
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : QueryT["_joins"],
        readonly _parentJoins : QueryT["_parentJoins"],
        readonly _selects : QueryT["_selects"],
        readonly _where : QueryT["_where"],

        //TODO Debate making this more strongly typed?
        //It will be necessary when pursuing ONLY_FULL_GROUP_BY support
        readonly _grouped : ColumnIdentifier[],
        readonly _having : QueryT["_having"],

        readonly _orders : QueryT["_orders"],
        readonly _limit : QueryT["_limit"],

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);