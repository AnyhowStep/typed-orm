import {Query} from "../../query";
import {AfterSelectClause} from "../predicate";
import {MapDelegate} from "../../../map-delegate";
//import {ColumnRefUtil, ColumnRef} from "../../../column-ref";
//import {ColumnMapUtil, ColumnMap} from "../../../column-map";
import {SelectItem} from "../../../select-item";
import {SelectItemArrayUtil} from "../../../select-item-array";
import {IJoin} from "../../../join";
import {UnmappedFetchRef} from "../../../unmapped-fetch-ref";
import {UnmappedFetchMap} from "../../../unmapped-fetch-map";
/*
export type ToTypeRef<
    RefT extends ColumnRef
> = (
    {
        readonly [tableAlias in keyof RefT] : {
            readonly [columnName in keyof RefT[tableAlias]] : (
                ReturnType<RefT[tableAlias][columnName]["assertDelegate"]>
            )
        }
    }
);

export type ToTypeMap<
    MapT extends ColumnMap
> = (
    {
        readonly [columnName in keyof MapT] : (
            ReturnType<MapT[columnName]["assertDelegate"]>
        )
    }
);
*/
export type UseUnmappedFetchRef<
    SelectsT extends SelectItem[],
    JoinsT extends IJoin[]
> = (
    true extends (
        SelectItemArrayUtil.HasDuplicateColumnName<SelectsT> |
        JoinsT[number]["nullable"]
    ) ?
    true :
    false
);
export type UnmappedTypeNoJoins<
    SelectsT extends SelectItem[]
> = (
    UseUnmappedFetchRef<SelectsT, []> extends true ?
    UnmappedFetchRef<SelectsT, []> :
    UnmappedFetchMap<SelectsT>
);
export type UnmappedType<
    QueryT extends AfterSelectClause
> = (
    QueryT["_joins"] extends IJoin[] ?
    (
        UseUnmappedFetchRef<QueryT["_selects"], QueryT["_joins"]> extends true ?
        UnmappedFetchRef<QueryT["_selects"], QueryT["_joins"]> :
        UnmappedFetchMap<QueryT["_selects"]>
    ) :
    UnmappedTypeNoJoins<QueryT["_selects"]>
    /*SelectItemArrayUtil.HasDuplicateColumnName<ArrT> extends true ?
    ToTypeRef<ColumnRefUtil.FromSelectItemArray<ArrT>> :
    ToTypeMap<ColumnMapUtil.FromSelectItemArray<ArrT, "">>*/
);

export type MappedType<
    QueryT extends AfterSelectClause
> = (
    QueryT["_mapDelegate"] extends MapDelegate ?
    (
        ReturnType<QueryT["_mapDelegate"]> extends Promise<infer R> ?
        R :
        ReturnType<QueryT["_mapDelegate"]>
    ) :
    UnmappedType<QueryT>
)

export type Map<
    QueryT extends AfterSelectClause,
    DelegateT extends MapDelegate<MappedType<QueryT>, UnmappedType<QueryT>, any>
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

        readonly _unions : QueryT["_unions"],
        readonly _unionOrders : QueryT["_unionOrders"],
        readonly _unionLimit : QueryT["_unionLimit"],

        readonly _mapDelegate : MapDelegate<
            UnmappedType<QueryT>,
            UnmappedType<QueryT>,
            ReturnType<DelegateT> extends Promise<any> ?
            ReturnType<DelegateT> :
            Promise<ReturnType<DelegateT>>
        >,
    }>
);
export function map<
    QueryT extends AfterSelectClause,
    DelegateT extends MapDelegate<MappedType<QueryT>, UnmappedType<QueryT>, any>
> (
    query : QueryT,
    delegate : DelegateT
) : Map<QueryT, DelegateT> {
    if (query._selects == undefined) {
        throw new Error(`Cannot use map() before SELECT clause`);
    }

    //TODO-UNHACK Not use all this hackery
    let newMapDelegate : MapDelegate<
        UnmappedType<QueryT>,
        UnmappedType<QueryT>,
        ReturnType<DelegateT> extends Promise<any> ?
        ReturnType<DelegateT> :
        Promise<ReturnType<DelegateT>>
    >|undefined = undefined;
    if (query._mapDelegate == undefined) {
        newMapDelegate = (async (row, connection, originalRow) => {
            return delegate(row as any, connection, originalRow);
        }) as MapDelegate<
            UnmappedType<QueryT>,
            UnmappedType<QueryT>,
            ReturnType<DelegateT> extends Promise<any> ?
            ReturnType<DelegateT> :
            Promise<ReturnType<DelegateT>>
        >;
    } else {
        const prvDelegate = query._mapDelegate;
        newMapDelegate = (async (row, connection, originalRow) => {
            const prvResult : MappedType<QueryT> = await prvDelegate(
                row,
                connection,
                originalRow
            );
            return delegate(prvResult, connection, originalRow);
        }) as MapDelegate<
            UnmappedType<QueryT>,
            UnmappedType<QueryT>,
            ReturnType<DelegateT> extends Promise<any> ?
            ReturnType<DelegateT> :
            Promise<ReturnType<DelegateT>>
        >;
    }

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

        _unions,
        _unionOrders,
        _unionLimit,
    } = query;
    return new Query({
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

        _unions,
        _unionOrders,
        _unionLimit,

        _mapDelegate : newMapDelegate,
    });
}