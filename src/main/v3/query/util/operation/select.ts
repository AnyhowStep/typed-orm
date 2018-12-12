import * as sd from "schema-decorator";
import {ToUnknownIfAllFieldsNever} from "../../../type";
import {Query} from "../../query";
import {BeforeUnionClause} from "../predicate";
import {ColumnRef, ColumnRefUtil} from "../../../column-ref";
import {ColumnMap, ColumnMapUtil} from "../../../column-map";
import {NonEmptyTuple, TupleUtil} from "../../../tuple";
import {SelectItem} from "../../../select-item";
import {IExprSelectItem, ExprSelectItemUtil} from "../../../expr-select-item";
import {IColumn, ColumnUtil} from "../../../column";
import {ColumnIdentifierUtil} from "../../../column-identifier";

export type SelectDelegate<
    QueryT extends BeforeUnionClause
> = (
    //TODO Proper return type
    //If Column, must be columns in args given
    //If expression, must have proper usedRef
    //If columnMap, must be columnMaps in args given
    (
        columns : ColumnRefUtil.ToConvenient<
            ColumnRefUtil.FromQuery<QueryT>
        >
    ) => NonEmptyTuple<SelectItem>
);

//Must be called before UNION because it will change the number of
//columns expected.
//Can be called before FROM clause; e.g. SELECT NOW()
export type Select<
    QueryT extends BeforeUnionClause,
    SelectDelegateT extends SelectDelegate<QueryT>
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : QueryT["_joins"],
        readonly _parentJoins : QueryT["_parentJoins"],
        readonly _selects : (
            QueryT["_selects"] extends SelectItem[] ?
            TupleUtil.Concat<
                QueryT["_selects"],
                ReturnType<SelectDelegateT>
            > :
            ReturnType<SelectDelegateT>
        ),
        readonly _where : QueryT["_where"],

        readonly _grouped : QueryT["_grouped"],
        readonly _having : QueryT["_having"],

        readonly _orders : QueryT["_orders"],
        readonly _limit : QueryT["_limit"],

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);
export type AssertValidSelectDelegate<
    QueryT extends BeforeUnionClause,
    SelectDelegateT extends SelectDelegate<QueryT>
> = (
    SelectDelegateT &
    //If SelectItem is IExprSelectItem,
    //the usedRef must be a subset of the queryRef
    ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
            ReturnType<SelectDelegateT>[index] extends IExprSelectItem ?
            (
                ColumnRefUtil.FromQuery<QueryT> extends ReturnType<SelectDelegateT>[index]["usedRef"] ?
                never :
                [
                    "Invalid IExprSelectItem",
                    Exclude<
                        ColumnUtil.FromColumnRef<
                            ReturnType<SelectDelegateT>[index]["usedRef"]
                        >,
                        ColumnUtil.FromColumnRef<
                            ColumnRefUtil.FromQuery<QueryT>
                        >
                    >
                ]
            ) :
            never
        )
    }> &
    //Columns selected must exist
    ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
            ReturnType<SelectDelegateT>[index] extends IColumn ?
            (
                ReturnType<SelectDelegateT>[index] extends ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuery<QueryT>> ?
                never :
                [
                    "Invalid IColumn",
                    ReturnType<SelectDelegateT>[index]
                ]
            ) :
            never
        )
    }> &
    //Columns selected must exist
    ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
            ReturnType<SelectDelegateT>[index] extends ColumnMap ?
            (
                ColumnUtil.FromColumnMap<ReturnType<SelectDelegateT>[index]> extends ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuery<QueryT>> ?
                never :
                [
                    "Invalid ColumnMap",
                    Exclude<
                        ColumnUtil.FromColumnMap<ReturnType<SelectDelegateT>[index]>,
                        ColumnUtil.FromColumnRef<ColumnRefUtil.FromQuery<QueryT>>
                    >
                ]
            ) :
            never
        )
    }> &
    //Duplicates not allowed with new selects
    ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
            ReturnType<SelectDelegateT>[index] extends SelectItem ?
            (
                Extract<
                    ColumnIdentifierUtil.FromSelectItem<
                        ReturnType<SelectDelegateT>[index]
                    >,
                    ColumnIdentifierUtil.FromSelectItemArrayIgnoreIndex<
                        ReturnType<SelectDelegateT>,
                        index
                    >
                > extends never ?
                never :
                [
                    "Duplicate columns in SELECT clause",
                    Extract<
                        ColumnIdentifierUtil.FromSelectItem<
                            ReturnType<SelectDelegateT>[index]
                        >,
                        ColumnIdentifierUtil.FromSelectItemArrayIgnoreIndex<
                            ReturnType<SelectDelegateT>,
                            index
                        >
                    >
                ]
            ) :
            never
        )
    }> &
    (
        QueryT["_selects"] extends SelectItem[] ?
        (
            //Duplicates not allowed with existing selects
            ToUnknownIfAllFieldsNever<{
                [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
                    ReturnType<SelectDelegateT>[index] extends SelectItem ?
                    (
                        Extract<
                            ColumnIdentifierUtil.FromSelectItem<
                                ReturnType<SelectDelegateT>[index]
                            >,
                            ColumnIdentifierUtil.FromSelectItem<
                                QueryT["_selects"][number]
                            >
                        > extends never ?
                        never :
                        [
                            "Duplicate columns in SELECT clause; consider aliasing",
                            Extract<
                                ColumnIdentifierUtil.FromSelectItem<
                                    ReturnType<SelectDelegateT>[index]
                                >,
                                ColumnIdentifierUtil.FromSelectItem<
                                    QueryT["_selects"][number]
                                >
                            >
                        ]
                    ) :
                    never
                )
            }>
        ) :
        unknown
    )
);
export function select<
    QueryT extends BeforeUnionClause,
    SelectDelegateT extends SelectDelegate<QueryT>
> (
    query : QueryT,
    delegate : AssertValidSelectDelegate<QueryT, SelectDelegateT>
) : Select<QueryT, SelectDelegateT> {
    const queryRef = ColumnRefUtil.fromQuery(query);
    const selects = delegate(
        ColumnRefUtil.toConvenient(queryRef)
    );

    for (let selectItem of selects) {
        if (ExprSelectItemUtil.isExprSelectItem(selectItem)) {
            //+ If SelectItem is IExprSelectItem,
            //  the usedRef must be a subset of the queryRef
            ColumnRefUtil.assertIsSubset(selectItem.usedRef, queryRef);
        } else if (ColumnUtil.isColumn(selectItem)) {
            //+ Selected columns must exist
            const columnMap = (queryRef as ColumnRef)[selectItem.tableAlias];
            if (columnMap == undefined) {
                throw new Error(`Invalid column in SELECT clause; no such table alias ${selectItem.tableAlias}`);
            }
            const column = columnMap[selectItem.name];
            if (!ColumnUtil.isColumn(column)) {
                throw new Error(`Invalid column in SELECT clause; cannot select ${selectItem.tableAlias}.${selectItem.name}`);
            }
            if (sd.isNullable(column.assertDelegate) != sd.isNullable(selectItem.assertDelegate)) {
                throw new Error(`Invalid column in SELECT clause; cannot select ${selectItem.tableAlias}.${selectItem.name}; the column identifier exists but the data types are different. One is nullable, the other is not.`);
            }
        } else if (ColumnMapUtil.isColumnMap(selectItem)) {
            //+ columnMaps must exist
            let hasColumnMap = false;
            for (let tableAlias in queryRef) {
                const columnMap = (queryRef as ColumnRef)[tableAlias];
                if (columnMap === selectItem) {
                    hasColumnMap = true;
                    break;
                }
            }
            if (!hasColumnMap) {
                throw new Error(`Invalid column map in SELECT clause`);
            }
        }
    }

    const selectColumnIdentifiers = ColumnIdentifierUtil.Array
        .fromSelectItemArray(selects);
    //+ Duplicates not allowed with new selects
    ColumnIdentifierUtil.Array.assertNoDuplicate(
        selectColumnIdentifiers
    );
    if (query._selects != undefined) {
        //+ Duplicates not allowed with existing selects
        const querySelectColumnIdentifiers = ColumnIdentifierUtil.Array
            .fromSelectItemArray(query._selects);
        ColumnIdentifierUtil.Array.assertNoOverlap(
            selectColumnIdentifiers,
            querySelectColumnIdentifiers
        );
    }

    const newSelects : (
        QueryT["_selects"] extends SelectItem[] ?
        TupleUtil.Concat<
            QueryT["_selects"],
            ReturnType<SelectDelegateT>
        > :
        ReturnType<SelectDelegateT>
    ) = (
        (query._selects == undefined) ?
            selects :
            [...query._selects, ...selects]
    ) as any;

    const {
        _distinct,
        _sqlCalcFoundRows,

        _joins,
        _parentJoins,
        _where,

        _grouped,
        _having,

        _orders,
        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    } = query;

    return new Query({
        _distinct,
        _sqlCalcFoundRows,

        _joins,
        _parentJoins,
        _selects : newSelects,
        _where,

        _grouped,
        _having,

        _orders,
        _limit,

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate,
    });
}