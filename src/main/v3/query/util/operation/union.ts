import * as sd from "schema-decorator";
import {Query, UnionQuery} from "../../query";
import {AfterSelectClause} from "../predicate";
import {DISTINCT, ALL} from "../../../constants";
import {SelectItem} from "../../../select-item";
import {IColumn} from "../../../column";
import {IExprSelectItem} from "../../../expr-select-item";
import {ColumnMap, ColumnMapUtil} from "../../../column-map";
import {ToUnknownIfAllFieldsNever} from "../../../type";
import {ColumnIdentifierMapUtil} from "../../../column-identifier-map";

export type Union<
    QueryT extends AfterSelectClause
> = (
    Query<{
        readonly _distinct : QueryT["_distinct"];
        readonly _sqlCalcFoundRows : QueryT["_sqlCalcFoundRows"];

        readonly _joins : QueryT["_joins"],
        readonly _parentJoins : QueryT["_parentJoins"],
        readonly _selects : QueryT["_selects"],
        readonly _where : QueryT["_where"],

        readonly _grouped : QueryT["_grouped"],
        readonly _having : QueryT["_having"],

        readonly _orders : QueryT["_orders"],
        readonly _limit : QueryT["_limit"],

        //TODO Determine if tighter types are better
        readonly _unions : UnionQuery[],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : QueryT["_mapDelegate"],
    }>
);

export type UnionType = (typeof DISTINCT)|(typeof ALL);

export type AssertUnionCompatibleSelectArray<
    A extends SelectItem[],
    B extends SelectItem[]
> = (
    number extends A["length"] ?
    ["Invalid SELECT clause length", A["length"]] :
    number extends B["length"] ?
    ["Invalid SELECT clause length", B["length"]] :
    A["length"] extends B["length"] ?
    (
        B["length"] extends A["length"] ?
        ToUnknownIfAllFieldsNever<{
            [index in {
                [k in Extract<keyof (A|B), string>] : (
                    (A|B)[k] extends SelectItem ?
                    k :
                    never
                )
            }[Extract<keyof (A|B), string>]] : (
                A[index] extends IColumn ?
                (
                    B[index] extends {
                        assertDelegate : sd.AssertDelegate<
                            ReturnType<A[index]["assertDelegate"]>
                        >
                    } ?
                    never :
                    B[index] extends { assertDelegate : any } ?
                    [
                        "Invalid SELECT item data-type",
                        index,
                        B[index]["assertDelegate"],
                        "not assignable to",
                        sd.AssertDelegate<
                            ReturnType<A[index]["assertDelegate"]>
                        >
                    ] :
                    [
                        "Invalid SELECT item",
                        index,
                        B[index],
                        "does not have an assertDelegate"
                    ]
                ) :
                A[index] extends IExprSelectItem ?
                (
                    B[index] extends {
                        assertDelegate : sd.AssertDelegate<
                            ReturnType<A[index]["assertDelegate"]>
                        >
                    } ?
                    never :
                    B[index] extends { assertDelegate : any } ?
                    [
                        "Invalid SELECT item data-type",
                        index,
                        B[index]["assertDelegate"],
                        "not assignable to",
                        sd.AssertDelegate<
                            ReturnType<A[index]["assertDelegate"]>
                        >
                    ] :
                    [
                        "Invalid SELECT item",
                        index,
                        B[index],
                        "does not have an assertDelegate"
                    ]
                ) :
                A[index] extends ColumnMap ?
                (
                    string extends Extract<keyof A[index], string> ?
                    ["Invalid SELECT item columnMap", index, Extract<keyof A[index], string>] :
                    string extends Extract<keyof B[index], string> ?
                    ["Invalid SELECT item columnMap", index, Extract<keyof B[index], string>] :
                    Extract<keyof A[index], string> extends Extract<keyof B[index], string> ?
                    (
                        Extract<keyof B[index], string> extends Extract<keyof A[index], string> ?
                        (
                            B[index] extends {
                                [columnName in Extract<keyof A[index], string>] : (
                                    {
                                        assertDelegate : sd.AssertDelegate<
                                            ReturnType<A[index][columnName]["assertDelegate"]>
                                        >
                                    }
                                )
                            } ?
                            never :
                            ["Invalid SELECT item column-map", index, B[index], "not assignable to", A[index]]
                        ) :
                        [
                            "Invalid SELECT item columnMap",
                            index,
                            Extract<keyof B[index], string>,
                            "not assignable to",
                            Extract<keyof A[index], string>
                        ]
                    ) :
                    [
                        "Invalid SELECT item columnMap",
                        index,
                        Extract<keyof A[index], string>,
                        "not assignable to",
                        Extract<keyof B[index], string>
                    ]
                ) :
                //This should never happen
                ["Unknown SELECT item", index, B[index], A[index]]
            )
        }> :
        ["SELECT clause length mismatch", A["length"], "!=", B["length"]]
    ) :
    ["SELECT clause length mismatch", A["length"], "!=", B["length"]]
);

export type AssertUnionCompatibleQuery<
    QueryT extends AfterSelectClause,
    OtherT extends AfterSelectClause
> = (
    OtherT &
    AssertUnionCompatibleSelectArray<QueryT["_selects"], OtherT["_selects"]>
);

export function union<
    QueryT extends AfterSelectClause,
    OtherT extends AfterSelectClause
>(
    query : QueryT,
    other : AssertUnionCompatibleQuery<QueryT, OtherT>,
    unionType : UnionType = DISTINCT
) : Union<QueryT> {
    if (query._selects == undefined) {
        throw new Error(`Cannot use UNION before SELECT clause`);
    }
    if (other._selects == undefined) {
        throw new Error(`Cannot use query as UNION target before SELECT clause`);
    }
    /*
        We can't really have many run-time checks.
        We can't check that the assert delegates are compatible.
    */
    if (query._selects.length != other._selects.length) {
        throw new Error(`UNION target must have ${query._selects.length} select items; found ${other._selects.length}`);
    }
    for (let i=0; i<query._selects.length; ++i) {
        const itemA = query._selects[i];
        const itemB = other._selects[i];
        if (ColumnMapUtil.isColumnMap(itemA)) {
            if (ColumnMapUtil.isColumnMap(itemB)) {
                ColumnIdentifierMapUtil.assertIsColumnNameSubset(itemA, itemB);
                ColumnIdentifierMapUtil.assertIsColumnNameSubset(itemB, itemA);
            } else {
                throw new Error(`UNION target must have a column map for select item ${i}`);
            }
        } else {
            if (ColumnMapUtil.isColumnMap(itemB)) {
                throw new Error(`UNION target cannot have a column map for select item ${i}`);
            }
        }
    }

    const unionQuery = {
        distinct : (unionType == DISTINCT),
        query : other,
    };

    const {
        _distinct,
        _sqlCalcFoundRows,

        _joins,
        _parentJoins,
        _selects,
        _where,

        _grouped,
        _having,

        _orders,
        _limit,

        _unionOrders,
        _unionLimit,

        _mapDelegate,
    } = query;
    return new Query(
        {
            _distinct,
            _sqlCalcFoundRows,

            _joins,
            _parentJoins,
            _selects,
            _where,

            _grouped,
            _having,

            _orders,
            _limit,

            _unions : (
                query._unions == undefined ?
                [unionQuery] :
                [...query._unions, unionQuery]
            ),
            _unionOrders,
            _unionLimit,

            _mapDelegate,
        }
    );
}