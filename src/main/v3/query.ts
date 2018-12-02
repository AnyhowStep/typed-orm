import * as sd from "schema-decorator";
import {IJoin, Join, JoinType} from "./join";
import {IAliasedTable} from "./aliased-table";
import {IColumn, Column} from "./column";
import {SelectItem} from "./select-item";
import {RawExpr, RawExprUtil} from "./raw-expr";
import {IExpr, Expr} from "./expr";
import {ColumnRefUtil} from "./column-ref";
import {JoinArrayUtil} from "./join-array";
import {NonEmptyTuple, TupleUtil} from "./tuple";
import {ColumnMap} from "./column-map";
import {IExprSelectItem} from "./expr-select-item";
import {ToUnknownIfAllFieldsNever} from "./type";
import {ColumnIdentifierUtil} from "./column-identifier";

export interface UnionQuery {
    readonly distinct : boolean,
    readonly query : IQuery,
}
export interface Limit {
    readonly rowCount : number,
    readonly offset   : number,
}
export interface QueryData {
    readonly joins : IJoin[]|undefined;
    readonly parentJoins : IJoin[]|undefined;
    readonly unions : UnionQuery[]|undefined;
    readonly selects : SelectItem[]|undefined;
    readonly limit : Limit|undefined;
    readonly unionLimit : Limit|undefined;
}
export interface ExtraQueryData {
    readonly where : IExpr|undefined;
}
export interface IQuery<DataT extends QueryData=QueryData> {
    readonly joins : DataT["joins"];
    readonly parentJoins : DataT["parentJoins"];
    readonly unions : DataT["unions"];
    readonly selects : DataT["selects"];
    readonly limit : DataT["limit"];
    readonly unionLimit : DataT["unionLimit"];

    //A lot of extra data that we don't need generics for
    readonly extraData : ExtraQueryData;
}
export class Query<DataT extends QueryData> {
    readonly joins : DataT["joins"];
    readonly parentJoins : DataT["parentJoins"];
    readonly unions : DataT["unions"];
    readonly selects : DataT["selects"];
    readonly limit : DataT["limit"];
    readonly unionLimit : DataT["unionLimit"];

    readonly extraData : ExtraQueryData;

    public constructor (data : DataT, extraData : ExtraQueryData) {
        this.joins = data.joins;
        this.parentJoins = data.parentJoins;
        this.unions = data.unions;
        this.selects = data.selects;
        this.limit = data.limit;
        this.unionLimit = data.unionLimit;

        this.extraData = extraData;
    }

    public from<
        AliasedTableT extends IAliasedTable
    > (
        this : Query.BeforeFromClause,
        aliasedTable : Query.AssertUniqueJoinTarget<
            this & Query.BeforeFromClause,
            AliasedTableT
        >
    ) : (
        Query.From<this & Query.BeforeFromClause, AliasedTableT>
    ) {
        return Query.from(this, aliasedTable);
    }
}
export namespace Query {
    export type NewInstance = Query<{
        readonly joins : undefined,
        readonly parentJoins : undefined,
        readonly unions : undefined,
        readonly selects : undefined,
        readonly limit : undefined,
        readonly unionLimit : undefined,
    }>;
    export function newInstance () : NewInstance {
        return new Query(
            {
                joins : undefined,
                parentJoins : undefined,
                unions : undefined,
                selects : undefined,
                limit : undefined,
                unionLimit : undefined,
            },
            {
                where : undefined,
            }
        );
    }

    //TODO Better naming?
    //AliasedTableT["alias"] must not already be in
    //QueryT["joins"] or
    //QueryT["parentJoins"]
    export type AssertUniqueJoinTarget<
        QueryT extends IQuery<QueryData>,
        AliasedTableT extends IAliasedTable
    > = (
        AliasedTableT &
        (
            QueryT["joins"] extends IJoin[] ?
            (
                AliasedTableT["alias"] extends JoinArrayUtil.ToTableAliasUnion<QueryT["joins"]> ?
                [
                    "Alias",
                    AliasedTableT["alias"],
                    "already used in previous JOINs",
                    JoinArrayUtil.ToTableAliasUnion<QueryT["joins"]>
                ]|void :
                unknown
            ) :
            unknown
        ) &
        (
            QueryT["parentJoins"] extends IJoin[] ?
            (
                AliasedTableT["alias"] extends JoinArrayUtil.ToTableAliasUnion<QueryT["parentJoins"]> ?
                [
                    "Alias",
                    AliasedTableT["alias"],
                    "already used in parent JOINs",
                    JoinArrayUtil.ToTableAliasUnion<QueryT["parentJoins"]>
                ]|void :
                unknown
            ) :
            unknown
        )
    );
    export function assertUniqueJoinTarget (
        query : IQuery,
        aliasedTable : IAliasedTable
    ) {
        if (query.joins != undefined) {
            if (query.joins.some(j => j.aliasedTable.alias == aliasedTable.alias)) {
                throw new Error(`Alias ${aliasedTable.alias} already used in previous JOINs`);
            }
        }
        if (query.parentJoins != undefined) {
            if (query.parentJoins.some(j => j.aliasedTable.alias == aliasedTable.alias)) {
                throw new Error(`Alias ${aliasedTable.alias} already used in parent JOINs`);
            }
        }
    }

    export type BeforeFromClause = IQuery<QueryData & { joins : undefined }>;
    export type AfterFromClause = IQuery<QueryData & { joins : IJoin[] }>;
    export type BeforeUnionClause = IQuery<QueryData & { unions : undefined }>;
    export type AfterUnionClause = IQuery<QueryData & { unions : UnionQuery[] }>;
    export type BeforeSelectClause = IQuery<QueryData & { selects : undefined }>;
    export type AfterSelectClause = IQuery<QueryData & { selects : SelectItem[] }>;
    export type OneRowQuery = (
        BeforeFromClause &
        BeforeUnionClause
    );
    export type ZeroOrOneRowUnionQuery = (
        AfterUnionClause &
        { unionLimit : { rowCount : 0|1 } }
    );
    export type ZeroOrOneRowFromQuery = (
        AfterFromClause &
        BeforeUnionClause &
        (
            { limit : { rowCount : 0|1 } } |
            { unionLimit : { rowCount : 0|1 } }
        )
    );
    export type ZeroOrOneRowQuery = (
        OneRowQuery |
        ZeroOrOneRowUnionQuery |
        ZeroOrOneRowFromQuery
    );

    export function isBeforeFromClause (query : IQuery) : query is BeforeFromClause {
        return query.joins == undefined;
    }
    export function isAfterFromClause (query : IQuery) : query is AfterFromClause {
        return query.joins != undefined;
    }
    export function isBeforeUnionClause (query : IQuery) : query is BeforeUnionClause {
        return query.unions == undefined;
    }
    export function isAfterUnionClause (query : IQuery) : query is AfterUnionClause {
        return query.unions != undefined;
    }
    export function isBeforeSelectClause (query : IQuery) : query is BeforeSelectClause {
        return query.selects == undefined;
    }
    export function isAfterSelectClause (query : IQuery) : query is AfterSelectClause {
        return query.selects != undefined;
    }
    export function isOneRowQuery (query : IQuery) : query is OneRowQuery {
        return isBeforeFromClause(query) && isBeforeUnionClause(query);
    }
    export function isZeroOrOneRowUnionQuery (query : IQuery) : query is ZeroOrOneRowUnionQuery {
        return (
            isAfterUnionClause(query) &&
            query.unionLimit != undefined &&
            (
                query.unionLimit.rowCount == 0 ||
                query.unionLimit.rowCount == 1
            )
        )
    }
    export function isZeroOrOneRowFromQuery (query : IQuery) : query is ZeroOrOneRowFromQuery {
        return (
            isAfterFromClause(query) &&
            isBeforeUnionClause(query) &&
            (
                (
                    query.limit != undefined &&
                    (
                        query.limit.rowCount == 0 ||
                        query.limit.rowCount == 1
                    )
                ) ||
                (
                    query.unionLimit != undefined &&
                    (
                        query.unionLimit.rowCount == 0 ||
                        query.unionLimit.rowCount == 1
                    )
                )
            )
        );
    }
    export function isZeroOrOneRowQuery (query : IQuery) : query is ZeroOrOneRowQuery {
        return (
            isOneRowQuery(query) ||
            isZeroOrOneRowUnionQuery(query) ||
            isZeroOrOneRowFromQuery(query)
        );
    }


    export type From<
        QueryT extends BeforeFromClause,
        AliasedTableT extends IAliasedTable
    > = (
        Query<{
            readonly joins : Join<{
                aliasedTable : AliasedTableT,
                columns : AliasedTableT["columns"],
                nullable : false,
            }>[],
            readonly parentJoins : QueryT["parentJoins"],
            readonly unions : QueryT["unions"],
            readonly selects : QueryT["selects"],
            readonly limit : QueryT["limit"],
            readonly unionLimit : QueryT["unionLimit"],
        }>
    );
    //Must be done before any JOINs, as per MySQL
    //TODO The aliasedTable must not be in parentJoins
    export function from<
        QueryT extends BeforeFromClause,
        AliasedTableT extends IAliasedTable
    > (
        query : QueryT,
        aliasedTable : AssertUniqueJoinTarget<QueryT, AliasedTableT>
    ) : (
        From<QueryT, AliasedTableT>
    ) {
        if (query.joins != undefined) {
            throw new Error(`FROM clause not allowed more than once`);
        }
        assertUniqueJoinTarget(query, aliasedTable);

        const {
            parentJoins,
            unions,
            selects,
            limit,
            unionLimit,
            extraData,
        } = query;
        return new Query(
            {
                joins : [
                    new Join(
                        {
                            aliasedTable,
                            columns : aliasedTable.columns,
                            nullable : false,
                        },
                        JoinType.FROM,
                        [],
                        [],
                    ),
                ],
                parentJoins,
                unions,
                selects,
                limit,
                unionLimit,
            },
            extraData
        );
    }

    export type JoinFromDelegate<JoinsT extends IJoin[]> = (
        (columns : ColumnRefUtil.ToConvenient<ColumnRefUtil.FromJoinArray<JoinsT>>) => (
            NonEmptyTuple<JoinArrayUtil.ToUnion<JoinsT>>
        )
    );

    export type JoinToColumn<
        AliasedTableT extends IAliasedTable,
        FromColumnT extends IColumn
    > = (
        IColumn<{
            tableAlias : AliasedTableT["alias"],
            name : Extract<keyof AliasedTableT["columns"], string>,
            //We allow joining to columns that may potentially be `null`,
            //Of course, joining to `null` just results in the row not
            //appearing in the result set
            assertDelegate : sd.AssertDelegate<ReturnType<FromColumnT["assertDelegate"]>|null>
        }>
    );

    export type JoinToDelegate<
        QueryT extends AfterFromClause,
        AliasedTableT extends IAliasedTable,
        FromDelegateT extends JoinFromDelegate<QueryT["joins"]>
    > = (
        (columns : AliasedTableT["columns"]) => (
            Column.UnionFromColumnMap<AliasedTableT["columns"]>[] &
            { length : ReturnType<FromDelegateT>["length"] } &
            {
                //Surely a JOIN on anything more than 10 columns is a bit much...
                //Right?
                [index in Extract<keyof ReturnType<FromDelegateT>, "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9">] : (
                    JoinToColumn<
                        AliasedTableT,
                        Extract<ReturnType<FromDelegateT>[index], IColumn>
                    >
                )
            }
        )
    );
    export type InnerJoin<
        QueryT extends AfterFromClause,
        AliasedTableT extends IAliasedTable
    > = (
        Query<{
            readonly joins : (
                QueryT["joins"][number] |
                Join<{
                    aliasedTable : AliasedTableT,
                    columns : AliasedTableT["columns"],
                    nullable : false,
                }>
            )[],
            readonly parentJoins : QueryT["parentJoins"],
            readonly unions : QueryT["unions"],
            readonly selects : QueryT["selects"],
            readonly limit : QueryT["limit"],
            readonly unionLimit : QueryT["unionLimit"],
        }>
    );
    export function innerJoin<
        QueryT extends AfterFromClause,
        AliasedTableT extends IAliasedTable,
        FromDelegateT extends JoinFromDelegate<QueryT["joins"]>
    > (
        query : QueryT,
        aliasedTable : AssertUniqueJoinTarget<QueryT, AliasedTableT>,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>
    ) : (
        InnerJoin<QueryT, AliasedTableT>
    ) {
        if (query.joins == undefined) {
            throw new Error(`Cannot JOIN before FROM clause`);
        }
        assertUniqueJoinTarget(query, aliasedTable);

        const joins : QueryT["joins"] = query.joins;
        const from = fromDelegate(ColumnRefUtil.toConvenient(
            ColumnRefUtil.fromJoinArray(joins)
        ));
        const to = toDelegate(aliasedTable.columns);
        if (from.length != to.length) {
            throw new Error(`Expected JOIN to have ${from.length} target columns`);
        }

        const {
            parentJoins,
            unions,
            selects,
            limit,
            unionLimit,
            extraData,
        } = query;
        return new Query(
            {
                joins : [
                    ...query.joins,
                    new Join(
                        {
                            aliasedTable,
                            columns : aliasedTable.columns,
                            nullable : false,
                        },
                        JoinType.INNER,
                        from,
                        to,
                    ),
                ],
                parentJoins,
                unions,
                selects,
                limit,
                unionLimit,
            },
            extraData
        );
    }
    export type LeftJoin<
        QueryT extends AfterFromClause,
        AliasedTableT extends IAliasedTable
    > = (
        Query<{
            readonly joins : (
                QueryT["joins"][number] |
                Join<{
                    aliasedTable : AliasedTableT,
                    columns : AliasedTableT["columns"],
                    nullable : true,
                }>
            )[],
            readonly parentJoins : QueryT["parentJoins"],
            readonly unions : QueryT["unions"],
            readonly selects : QueryT["selects"],
            readonly limit : QueryT["limit"],
            readonly unionLimit : QueryT["unionLimit"],
        }>
    );
    export function leftJoin<
        QueryT extends AfterFromClause,
        AliasedTableT extends IAliasedTable,
        FromDelegateT extends JoinFromDelegate<QueryT["joins"]>
    > (
        query : QueryT,
        aliasedTable : AssertUniqueJoinTarget<QueryT, AliasedTableT>,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>
    ) : (
        LeftJoin<QueryT, AliasedTableT>
    ) {
        if (query.joins == undefined) {
            throw new Error(`Cannot JOIN before FROM clause`);
        }
        assertUniqueJoinTarget(query, aliasedTable);

        const joins : QueryT["joins"] = query.joins;
        const from = fromDelegate(ColumnRefUtil.toConvenient(
            ColumnRefUtil.fromJoinArray(joins)
        ));
        const to = toDelegate(aliasedTable.columns);
        if (from.length != to.length) {
            throw new Error(`Expected JOIN to have ${from.length} target columns`);
        }

        const {
            parentJoins,
            unions,
            selects,
            limit,
            unionLimit,
            extraData,
        } = query;
        return new Query(
            {
                joins : [
                    ...query.joins,
                    new Join(
                        {
                            aliasedTable,
                            columns : aliasedTable.columns,
                            nullable : true,
                        },
                        JoinType.LEFT,
                        from,
                        to,
                    ),
                ],
                parentJoins,
                unions,
                selects,
                limit,
                unionLimit,
            },
            extraData
        );
    }

    export type WhereDelegate<
        QueryT extends AfterFromClause
    > = (
        (
            columns : ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>,
            query : QueryT,
        ) => RawExpr<boolean>
    );

    //Must be called after `FROM` as per MySQL
    export function where<
        QueryT extends AfterFromClause,
        WhereDelegateT extends WhereDelegate<QueryT>
    > (
        query : QueryT,
        delegate : (
            WhereDelegateT &
            (
                ColumnRefUtil.FromQuery<QueryT> extends RawExprUtil.UsedRef<ReturnType<WhereDelegateT>> ?
                unknown :
                [
                    "WHERE expression contains some invalid columns; the following are not allowed:",
                    Exclude<
                        ColumnRefUtil.ToUnion<
                            RawExprUtil.UsedRef<ReturnType<WhereDelegateT>>
                        >,
                        ColumnRefUtil.ToUnion<
                            ColumnRefUtil.FromQuery<QueryT>
                        >
                    >
                ]|void
            )
        )
    ) : IQuery<QueryT> {
        const queryRef = ColumnRefUtil.fromQuery(query);
        const rawExpr = delegate(
            ColumnRefUtil.toConvenient(queryRef),
            query
        );
        const expr = Expr.fromRawExpr(rawExpr);

        ColumnRefUtil.assertIsSubset(expr.usedRef, queryRef);

        return new Query(
            query,
            {
                ...query.extraData,
                where : expr,
            }
        );
    }

    export type SelectDelegate<
        QueryT extends BeforeUnionClause
    > = (
        //TODO Proper return type
        //If Column, must be columns in args given
        //If expression, must have proper usedRef
        //If columnMap, must be columnMaps in args given
        (
            columns : ColumnRefUtil.ToConvenient<ColumnRefUtil.FromQuery<QueryT>>
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
            readonly joins : QueryT["joins"],
            readonly parentJoins : QueryT["parentJoins"],
            readonly unions : QueryT["unions"],
            readonly selects : (
                QueryT["selects"] extends SelectItem[] ?
                TupleUtil.Concat<
                    QueryT["selects"],
                    ReturnType<SelectDelegateT>
                > :
                ReturnType<SelectDelegateT>
            ),
            readonly limit : QueryT["limit"],
            readonly unionLimit : QueryT["unionLimit"],
        }>
    );
    export function select<
        QueryT extends BeforeUnionClause,
        SelectDelegateT extends SelectDelegate<QueryT>
    > (
        query : QueryT,
        delegate : (
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
                                ColumnRefUtil.ToUnion<
                                    ReturnType<SelectDelegateT>[index]["usedRef"]
                                >,
                                ColumnRefUtil.ToUnion<
                                    ColumnRefUtil.FromQuery<QueryT>
                                >
                            >
                        ]|void
                    ) :
                    never
                )
            }> &
            //Columns selected must exist
            ToUnknownIfAllFieldsNever<{
                [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
                    ReturnType<SelectDelegateT>[index] extends IColumn ?
                    (
                        ReturnType<SelectDelegateT>[index] extends ColumnRefUtil.ToUnion<ColumnRefUtil.FromQuery<QueryT>> ?
                        never :
                        [
                            "Invalid IColumn",
                            ReturnType<SelectDelegateT>[index]
                        ]|void
                    ) :
                    never
                )
            }> &
            //Columns selected must exist
            ToUnknownIfAllFieldsNever<{
                [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
                    ReturnType<SelectDelegateT>[index] extends ColumnMap ?
                    (
                        Column.UnionFromColumnMap<ReturnType<SelectDelegateT>[index]> extends ColumnRefUtil.ToUnion<ColumnRefUtil.FromQuery<QueryT>> ?
                        never :
                        [
                            "Invalid ColumnMap",
                            Exclude<
                                Column.UnionFromColumnMap<ReturnType<SelectDelegateT>[index]>,
                                ColumnRefUtil.ToUnion<ColumnRefUtil.FromQuery<QueryT>>
                            >
                        ]|void
                    ) :
                    never
                )
            }> &
            (
                QueryT["selects"] extends SelectItem[] ?
                (
                    //Duplicates not allowed with existing selects
                    ToUnknownIfAllFieldsNever<{
                        [index in Extract<keyof ReturnType<SelectDelegateT>, string>] : (
                            ReturnType<SelectDelegateT>[index] extends SelectItem ?
                            (
                                Extract<
                                    ColumnIdentifierUtil.UnionFromSelectItem<
                                        ReturnType<SelectDelegateT>[index]
                                    >,
                                    ColumnIdentifierUtil.UnionFromSelectItemArray<
                                        QueryT["selects"]
                                    >
                                > extends never ?
                                never :
                                [
                                    "Duplicate columns in SELECT clause; consider aliasing",
                                    Extract<
                                        ColumnIdentifierUtil.UnionFromSelectItem<
                                            ReturnType<SelectDelegateT>[index]
                                        >,
                                        ColumnIdentifierUtil.UnionFromSelectItemArray<
                                            QueryT["selects"]
                                        >
                                    >
                                ]|void
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
                                    ColumnIdentifierUtil.UnionFromSelectItem<
                                        ReturnType<SelectDelegateT>[index]
                                    >,
                                    ColumnIdentifierUtil.UnionFromSelectItemArrayIgnoreIndex<
                                        ReturnType<SelectDelegateT>,
                                        index
                                    >
                                > extends never ?
                                never :
                                [
                                    "Duplicate columns in SELECT clause",
                                    Extract<
                                        ColumnIdentifierUtil.UnionFromSelectItem<
                                            ReturnType<SelectDelegateT>[index]
                                        >,
                                        ColumnIdentifierUtil.UnionFromSelectItemArrayIgnoreIndex<
                                            ReturnType<SelectDelegateT>,
                                            index
                                        >
                                    >
                                ]|void
                            ) :
                            never
                        )
                    }>
                ) :
                unknown
            )
        )
    ) : Select<QueryT, SelectDelegateT> {
        const queryRef = ColumnRefUtil.fromQuery(query);
        const selects = delegate(
            ColumnRefUtil.toConvenient(queryRef)
        );

        //TODO
        //+ If SelectItem is IExprSelectItem,
        //  the usedRef must be a subset of the queryRef.
        //+ Selected columns/columnMaps must exist.
        //+ Duplicates not allowed with existing selects
        //+ Duplicates not allowed with new selects


        const newSelects : (
            QueryT["selects"] extends SelectItem[] ?
            TupleUtil.Concat<
                QueryT["selects"],
                ReturnType<SelectDelegateT>
            > :
            ReturnType<SelectDelegateT>
        ) = (
            (query.selects == undefined) ?
                selects :
                [...query.selects, ...selects]
        ) as any;

        const {
            joins,
            parentJoins,
            unions,
            limit,
            unionLimit,
            extraData,
        } = query;

        return new Query(
            {
                joins,
                parentJoins,
                unions,
                selects : newSelects,
                limit,
                unionLimit,
            },
            extraData
        );
    }
}

export function from<AliasedTableT extends IAliasedTable> (
    aliasedTable : Query.AssertUniqueJoinTarget<
        Query.NewInstance,
        AliasedTableT
    >
) : (
    Query.From<Query.NewInstance, AliasedTableT>
) {
    return Query.newInstance()
        .from(aliasedTable);
}

/*
import {table} from "./table";
const t = table(
    "test",
    {
        a : sd.number(),
        b : sd.string(),
        c : sd.boolean(),
        d : sd.date(),
        e : sd.buffer(),
        f : sd.nullable(sd.number())
    }
)
    .setId(c => c.c)
    .setAutoIncrement(c => c.a)
    .setGenerated(c => [
        //c.a,
        c.d
    ])
    .setHasExplicitDefaultValue(c => [
        c.e
    ])
    .addCandidateKey(c => [
        c.f,
        c.e
    ]);
const t2 = t.setName("test2");
const q = from(t)

const q2 = Query.innerJoin(
    q,
    t2,
    c => [c.a, c.d],
    t => [t.a, t.d]
);
const s1 = Query.select(q2, c => [c.test.b]);
s1.selects
const s2 = Query.select(s1, c => [c.test2.b]);
s2.selects
const t3 = t.setName("test3");
Query.select(s2, c => [c.test2.c, c.test2.c])
/*
Query.innerJoin(q2, t2);

declare const a : never[];
const arr : number[] = a;

type fja = ColumnRefUtil.FromJoinArray<typeof q["joins"]>
type wtf = ColumnMapUtil.FromJoin<typeof q["joins"][number]>

type G<B extends boolean> = (
    true extends B?
    ["Actual", "true extends", B] :
    "Expected"
)

//OK
//Expected: "Expected"
//Actual: "Expected"
type g = G<false>;
//*/