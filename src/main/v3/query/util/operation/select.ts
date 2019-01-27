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
import {ColumnIdentifierRefUtil} from "../../../column-identifier-ref";

export type SelectDelegate<
    QueryT extends BeforeUnionClause
> = (
    (
        columns : ColumnRefUtil.ToConvenient<
            ColumnRefUtil.FromQueryJoins<QueryT>
        >,
        query : QueryT
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
export type AssertValidSelectDelegateImpl<
    QueryT extends BeforeUnionClause,
    SelectDelegateT extends SelectDelegate<QueryT>
> = (
    //If SelectItem is IExprSelectItem,
    //the usedColumns must be a subset of the queryRef
    ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
            ReturnType<SelectDelegateT>[index] extends IExprSelectItem ?
            (
                ColumnUtil.AssertValidUsed<
                    ReturnType<SelectDelegateT>[index]["usedColumns"][number],
                    Extract<ColumnUtil.FromQueryJoins<QueryT>, IColumn>
                > extends never ?
                never :
                [
                    "Invalid IExprSelectItem",
                    ColumnUtil.AssertValidUsed<
                        ReturnType<SelectDelegateT>[index]["usedColumns"][number],
                        Extract<ColumnUtil.FromQueryJoins<QueryT>, IColumn>
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
                ReturnType<SelectDelegateT>[index] extends ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>> ?
                never :
                [
                    "Invalid IColumn",
                    ReturnType<SelectDelegateT>[index]
                ]
            ) :
            never
        )
    }> &
    //Columns of ColumnMap selected must exist
    ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
            ReturnType<SelectDelegateT>[index] extends ColumnMap ?
            (
                ColumnUtil.FromColumnMap<ReturnType<SelectDelegateT>[index]> extends ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>> ?
                never :
                [
                    "Invalid ColumnMap",
                    Exclude<
                        ColumnUtil.FromColumnMap<ReturnType<SelectDelegateT>[index]>,
                        ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>>
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
    ) &
    //ExprSelectItem *must not* shadow columns in FROM/JOIN clause
    ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
            ReturnType<SelectDelegateT>[index] extends IExprSelectItem ?
            (
                ColumnUtil.FromExprSelectItem<ReturnType<SelectDelegateT>[index]> extends ColumnIdentifierUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>> ?
                [
                    "IExprSelectItem cannot hide columns in FROM/JOIN clause",
                    Extract<
                        ColumnUtil.FromExprSelectItem<ReturnType<SelectDelegateT>[index]>,
                        ColumnIdentifierUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>>
                    >
                ] :
                never
            ) :
            never
        )
    }> &
    //Columns of ColumnRef selected must exist
    ToUnknownIfAllFieldsNever<{
        [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
            ReturnType<SelectDelegateT>[index] extends ColumnRef ?
            (
                ColumnUtil.FromColumnRef<ReturnType<SelectDelegateT>[index]> extends ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>> ?
                never :
                [
                    "Invalid ColumnRef",
                    Exclude<
                        ColumnUtil.FromColumnRef<ReturnType<SelectDelegateT>[index]>,
                        ColumnUtil.FromColumnRef<ColumnRefUtil.FromQueryJoins<QueryT>>
                    >
                ]
            ) :
            never
        )
    }>
);
export type AssertValidSelectDelegate<
    QueryT extends BeforeUnionClause,
    SelectDelegateT extends SelectDelegate<QueryT>
> = (
    SelectDelegateT &
    AssertValidSelectDelegateImpl<QueryT, SelectDelegateT>
);
export function select<
    QueryT extends BeforeUnionClause,
    SelectDelegateT extends SelectDelegate<QueryT>
> (
    query : QueryT,
    delegate : AssertValidSelectDelegate<QueryT, SelectDelegateT>
) : Select<QueryT, SelectDelegateT> {
    if (query._unions != undefined) {
        throw new Error(`Cannot use SELECT after UNION clause`);
    }
    const queryRef = ColumnRefUtil.fromQueryJoins(query);
    const selects = delegate(
        ColumnRefUtil.toConvenient(queryRef),
        query
    );

    for (let selectItem of selects) {
        if (ExprSelectItemUtil.isExprSelectItem(selectItem)) {
            //+ If SelectItem is IExprSelectItem,
            //  the usedColumns must be a subset of the queryRef
            ColumnRefUtil.assertHasColumnIdentifiers(queryRef, selectItem.usedColumns);
            //ExprSelectItem *must not* shadow columns in FROM/JOIN clause
            if (ColumnIdentifierRefUtil.hasColumnIdentifier(
                queryRef,
                ColumnIdentifierUtil.fromExprSelectItem(selectItem)
            )) {
                throw new Error(`IExprSelectItem ${selectItem.tableAlias}.${selectItem.alias} cannot hide columns in FROM/JOIN clause`);
            }
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
        } else if (ColumnRefUtil.isColumnRef(selectItem)) {
            //+ columnRefs must exist
            for (let tableAlias in selectItem) {
                const selectItemMap : ColumnMap = selectItem[tableAlias];
                const queryMap : ColumnMap = (queryRef as ColumnRef)[tableAlias];
                if (selectItemMap !== queryMap) {
                    throw new Error(`Invalid column ref in SELECT clause`);
                }
            }
        } else {
            throw new Error(`Unknown select item`);
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
        ColumnIdentifierUtil.Array.assertDisjoint(
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
/*
import * as o from "../../../index";
const table = o.table("test", {
    x : o.bigint(),
    y : o.varChar.nullable(),
    z : o.boolean(),
});
const nse = o.nullSafeEq(table.columns.x, table.columns.x);
const rnse = () => nse;
o.from(table)
    .select(c => [
        nse.as("nse")
    ])
    .having(rnse);
o.from(table)
    .select(() => [nse.as("nse")])
    .having(rnse);
o.from(table)
    .select((_c) => [nse.as("nse")])
    .having(rnse);

const table2 = o.table("test2", {
    x : o.bigint(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse2 = o.nullSafeEq(table.columns.x, table2.columns.x);
o.from(table)
    .select((_c) => [nse2.as("nse2")])
    .having(rnse);

const table3 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse3 = o.nullSafeEq(table.columns.x, table3.columns.x);
o.from(table)
    .select((_c) => [nse3.as("nse3")])
    .having(rnse);

const table4 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse4 = o.nullSafeEq(table.columns.y, table4.columns.y);
o.from(table)
    .select((_c) => [nse4.as("nse4")])
    .having(rnse);

const table5 = o.table("test", {
    x : o.bigint.nullable(),
    y : o.varChar(),
    z : o.boolean(),
});
const nse5 = o.eq(table5.columns.y, "test");
o.from(table)
    .select((_c) => [nse5.as("nse5")])
    .having(rnse);
*/