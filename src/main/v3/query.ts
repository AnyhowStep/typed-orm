import * as sd from "schema-decorator";
import {IJoin, Join, JoinType} from "./join";
import {IAliasedTable, AliasedTable} from "./aliased-table";
import {IColumn, ColumnUtil} from "./column";
import {SelectItem} from "./select-item";
import {RawExpr, RawExprUtil} from "./raw-expr";
import {IExpr, Expr} from "./expr";
import {ColumnRefUtil} from "./column-ref";
import {JoinArrayUtil} from "./join-array";
import {NonEmptyTuple, TupleUtil} from "./tuple";
import {ColumnMap, ColumnMapUtil} from "./column-map";
import {IExprSelectItem} from "./expr-select-item";
import {ToUnknownIfAllFieldsNever} from "./type";
import {ColumnIdentifierUtil} from "./column-identifier";
import {SelectItemArrayUtil} from "./select-item-array";
import {QueryTreeArray} from "./query-tree";

export interface UnionQuery {
    readonly distinct : boolean,
    readonly query : IQuery,
}
export interface Limit {
    //TODO consider allowing this to be bigint?
    //A rowCount/offset of 3.141 would be weird
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
        this : Extract<this, Query.BeforeFromClause>,
        aliasedTable : Query.AssertUniqueJoinTarget<
            Extract<this, Query.BeforeFromClause>,
            AliasedTableT
        >
    ) : (
        Query.From<
            Extract<this, Query.BeforeFromClause>,
            AliasedTableT
        >
    ) {
        return Query.from<
            Extract<this, Query.BeforeFromClause>,
            AliasedTableT
        >(
            this,
            aliasedTable
        );
    }

    public innerJoin<
        AliasedTableT extends IAliasedTable,
        FromDelegateT extends Query.JoinFromDelegate<
            Extract<this, Query.AfterFromClause>["joins"]
        >
    > (
        this : Extract<this, Query.AfterFromClause>,
        aliasedTable : Query.AssertUniqueJoinTarget<
            Extract<this, Query.AfterFromClause>,
            AliasedTableT
        >,
        fromDelegate : FromDelegateT,
        toDelegate : Query.JoinToDelegate<
            Extract<this, Query.AfterFromClause>,
            AliasedTableT,
            FromDelegateT
        >
    ) : (
        Query.InnerJoin<
            Extract<this, Query.AfterFromClause>,
            AliasedTableT
        >
    ) {
        return Query.innerJoin<
            Extract<this, Query.AfterFromClause>,
            AliasedTableT,
            FromDelegateT
        >(
            this,
            aliasedTable,
            fromDelegate,
            toDelegate
        );
    }
    public leftJoin<
        AliasedTableT extends IAliasedTable,
        FromDelegateT extends Query.JoinFromDelegate<
            Extract<this, Query.AfterFromClause>["joins"]
        >
    > (
        this : Extract<this, Query.AfterFromClause>,
        aliasedTable : Query.AssertUniqueJoinTarget<
            Extract<this, Query.AfterFromClause>,
            AliasedTableT
        >,
        fromDelegate : FromDelegateT,
        toDelegate : Query.JoinToDelegate<
            Extract<this, Query.AfterFromClause>,
            AliasedTableT,
            FromDelegateT
        >
    ) : (
        Query.LeftJoin<
            Extract<this, Query.AfterFromClause>,
            AliasedTableT
        >
    ) {
        return Query.leftJoin<
            Extract<this, Query.AfterFromClause>,
            AliasedTableT,
            FromDelegateT
        >(
            this,
            aliasedTable,
            fromDelegate,
            toDelegate
        );
    }
    public rightJoin<
        AliasedTableT extends IAliasedTable,
        FromDelegateT extends Query.JoinFromDelegate<
            Extract<this, Query.AfterFromClause>["joins"]
        >
    > (
        this : Extract<this, Query.AfterFromClause>,
        aliasedTable : Query.AssertUniqueJoinTarget<
            Extract<this, Query.AfterFromClause>,
            AliasedTableT
        >,
        fromDelegate : FromDelegateT,
        toDelegate : Query.JoinToDelegate<
            Extract<this, Query.AfterFromClause>,
            AliasedTableT,
            FromDelegateT
        >
    ) : (
        Query.RightJoin<
            Extract<this, Query.AfterFromClause>,
            AliasedTableT
        >
    ) {
        return Query.rightJoin<
            Extract<this, Query.AfterFromClause>,
            AliasedTableT,
            FromDelegateT
        >(
            this,
            aliasedTable,
            fromDelegate,
            toDelegate
        );
    }
}
export namespace Query {
    export function isUnionQuery (raw : any) : raw is UnionQuery {
        return (
            raw != undefined &&
            (raw instanceof Object) &&
            ("distinct" in raw) &&
            ("query" in raw) &&
            (typeof raw.distinct == "boolean") &&
            isQuery(raw.query)
        );
    }
    export function isUnionQueryArray (raw : any) : raw is UnionQuery[] {
        if (!(raw instanceof Array)) {
            return false;
        }
        for (let item of raw) {
            if (!isUnionQuery(item)) {
                return false;
            }
        }
        return true;
    }
    export function isLimit (raw : any) : raw is Limit {
        return (
            raw != undefined &&
            (raw instanceof Object) &&
            ("rowCount" in raw) &&
            ("offset" in raw) &&
            (typeof raw.rowCount == "number") &&
            (typeof raw.offset == "number")
        );
    }
    export function isExtraQueryData (raw : any) : raw is ExtraQueryData {
        return (
            raw != undefined &&
            (raw instanceof Object) &&
            ("where" in raw) &&
            (
                raw.where == undefined ||
                Expr.isExpr(raw.where)
            )
        );
    }
    export function isQuery (raw : any) : raw is IQuery {
        return (
            raw != undefined &&
            (raw instanceof Object) &&
            ("joins" in raw) &&
            ("parentJoins" in raw) &&
            ("unions" in raw) &&
            ("selects" in raw) &&
            ("limit" in raw) &&
            ("unionLimit" in raw) &&
            ("extraData" in raw) &&
            (
                raw.joins == undefined ||
                JoinArrayUtil.isJoinArray(raw.joins)
            ) &&
            (
                raw.parentJoins == undefined ||
                JoinArrayUtil.isJoinArray(raw.parentJoins)
            ) &&
            (
                raw.unions == undefined ||
                isUnionQueryArray(raw.unions)
            ) &&
            (
                raw.selects == undefined ||
                SelectItemArrayUtil.isSelectItemArray(raw.selects)
            ) &&
            (
                raw.limit == undefined ||
                isLimit(raw.limit)
            ) &&
            (
                raw.unionLimit == undefined ||
                isLimit(raw.unionLimit)
            ) &&
            isExtraQueryData(raw.extraData)
        );
    }
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
            NonEmptyTuple<ColumnUtil.FromJoinArray<JoinsT>>
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
            ReturnType<FromDelegateT> extends [infer C0] ?
            [
                JoinToColumn<AliasedTableT, Extract<C0, IColumn>>
            ] :
            ReturnType<FromDelegateT> extends [infer C0, infer C1] ?
            [
                JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C1, IColumn>>
            ] :
            ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2] ?
            [
                JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C2, IColumn>>
            ] :
            ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3] ?
            [
                JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C3, IColumn>>
            ] :
            ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4] ?
            [
                JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C4, IColumn>>
            ] :
            ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5] ?
            [
                JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C5, IColumn>>
            ] :
            ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6] ?
            [
                JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C5, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C6, IColumn>>
            ] :
            ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7] ?
            [
                JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C5, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C6, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C7, IColumn>>
            ] :
            ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7, infer C8] ?
            [
                JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C5, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C6, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C7, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C8, IColumn>>
            ] :
            ReturnType<FromDelegateT> extends [infer C0, infer C1, infer C2, infer C3, infer C4, infer C5, infer C6, infer C7, infer C8, infer C9] ?
            [
                JoinToColumn<AliasedTableT, Extract<C0, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C1, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C2, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C3, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C4, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C5, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C6, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C7, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C8, IColumn>>,
                JoinToColumn<AliasedTableT, Extract<C9, IColumn>>
            ] :
            //Turn off type-checking.
            //Surely a JOIN on anything more than 10 columns is a bit much...
            //Right?
            ColumnUtil.FromColumnMap<AliasedTableT["columns"]>[]
            /*ColumnUtil.UnionFromColumnMap<AliasedTableT["columns"]>[] &
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
            }*/
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
        const fromRef = ColumnRefUtil.fromJoinArray(joins);
        const from = fromDelegate(
            ColumnRefUtil.toConvenient(fromRef)
        );
        const to = toDelegate(aliasedTable.columns);
        if (from.length != to.length) {
            throw new Error(`Expected JOIN to have ${from.length} target columns`);
        }
        ColumnRefUtil.assertHasColumnIdentifiers(
            fromRef,
            from
        );
        ColumnMapUtil.assertHasColumnIdentifiers(
            aliasedTable.columns,
            to
        );

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

    export type JoinUsingColumnUnion<
        ColumnT extends IColumn,
        AliasedTableT extends IAliasedTable
    > = (
        ColumnT extends IColumn ?
        (
            ColumnUtil.WithTableAlias<
                ColumnT,
                AliasedTableT["alias"]
            > extends ColumnUtil.FromColumnMap<AliasedTableT["columns"]> ?
            Extract<ColumnT, IColumn> :
            never
        ) :
        never
    );
    export function joinUsingColumns<
        ColumnsT extends IColumn[],
        AliasedTableT extends IAliasedTable
    > (
        columns : ColumnsT,
        aliasedTable : AliasedTableT
    ) : JoinUsingColumnUnion<ColumnsT[number], AliasedTableT>[] {
        //During run-time, we cannot actually check if the assertDelegate
        //of a column matches...
        return columns.filter(column => ColumnMapUtil.hasColumnIdentifier(
            aliasedTable.columns,
            column
        )) as any[];
    }
    export type JoinUsingDelegate<
        JoinsT extends IJoin[],
        AliasedTableT extends IAliasedTable
    > = (
        (columns : ColumnRefUtil.ToConvenient<
            ColumnRefUtil.FromColumnArray<
                JoinUsingColumnUnion<
                    ColumnUtil.FromJoinArray<JoinsT>,
                    AliasedTableT
                >[]
            >
        >) => (
            NonEmptyTuple<(
                JoinUsingColumnUnion<ColumnUtil.FromJoinArray<JoinsT>, AliasedTableT>
            )>
        )
    );
    export function innerJoinUsing<
        QueryT extends AfterFromClause,
        AliasedTableT extends IAliasedTable,
        UsingDelegateT extends JoinUsingDelegate<QueryT["joins"], AliasedTableT>
    > (
        _query : QueryT,
        _aliasedTable : AssertUniqueJoinTarget<QueryT, AliasedTableT>,
        _usingDelegate : (
            UsingDelegateT
        )
    ) : (
        InnerJoin<QueryT, AliasedTableT>
    ) {
        throw new Error("not implemented");
        //const usingRef = ColumnRefUtil.from

        /*const joins : QueryT["joins"] = query.joins;
        const usingRef = ColumnRefUtil.fromJoinArray(joins);
        const using = usingDelegate(
            ColumnRefUtil.toConvenient(usingRef)
        );

        return innerJoin<
            QueryT,
            AliasedTableT,
            () => ReturnType<UsingDelegateT>
        >(
            query,
            aliasedTable,
            (() => using) as any,
            () => using.map(c => aliasedTable.columns[c.name]) as any
        ) as any;*/
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
        const fromRef = ColumnRefUtil.fromJoinArray(joins);
        const from = fromDelegate(
            ColumnRefUtil.toConvenient(fromRef)
        );
        const to = toDelegate(aliasedTable.columns);
        if (from.length != to.length) {
            throw new Error(`Expected JOIN to have ${from.length} target columns`);
        }
        ColumnRefUtil.assertHasColumnIdentifiers(
            fromRef,
            from
        );
        ColumnMapUtil.assertHasColumnIdentifiers(
            aliasedTable.columns,
            to
        );

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
    export type RightJoin<
        QueryT extends AfterFromClause,
        AliasedTableT extends IAliasedTable
    > = (
        Query<{
            readonly joins : (
                JoinArrayUtil.ToNullable<QueryT["joins"]>[number] |
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
    export function rightJoin<
        QueryT extends AfterFromClause,
        AliasedTableT extends IAliasedTable,
        FromDelegateT extends JoinFromDelegate<QueryT["joins"]>
    > (
        query : QueryT,
        aliasedTable : AssertUniqueJoinTarget<QueryT, AliasedTableT>,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<QueryT, AliasedTableT, FromDelegateT>
    ) : (
        RightJoin<QueryT, AliasedTableT>
    ) {
        if (query.joins == undefined) {
            throw new Error(`Cannot JOIN before FROM clause`);
        }
        assertUniqueJoinTarget(query, aliasedTable);

        const joins : QueryT["joins"] = query.joins;
        const fromRef = ColumnRefUtil.fromJoinArray(joins);
        const from = fromDelegate(
            ColumnRefUtil.toConvenient(fromRef)
        );
        const to = toDelegate(aliasedTable.columns);
        if (from.length != to.length) {
            throw new Error(`Expected JOIN to have ${from.length} target columns`);
        }
        ColumnRefUtil.assertHasColumnIdentifiers(
            fromRef,
            from
        );
        ColumnMapUtil.assertHasColumnIdentifiers(
            aliasedTable.columns,
            to
        );

        const {
            parentJoins,
            unions,
            selects,
            limit,
            unionLimit,
            extraData,
        } = query;

        const newJoins : (
            JoinArrayUtil.ToNullable<QueryT["joins"]>[number] |
            Join<{
                aliasedTable : AliasedTableT,
                columns : AliasedTableT["columns"],
                nullable : false,
            }>
        )[] = [
            ...JoinArrayUtil.toNullable(joins),
            new Join(
                {
                    aliasedTable,
                    columns : aliasedTable.columns,
                    nullable : false,
                },
                JoinType.RIGHT,
                from,
                to,
            ),
        ];

        return new Query(
            {
                joins : newJoins,
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
                        ColumnUtil.FromColumnMap<ReturnType<SelectDelegateT>[index]> extends ColumnRefUtil.ToUnion<ColumnRefUtil.FromQuery<QueryT>> ?
                        never :
                        [
                            "Invalid ColumnMap",
                            Exclude<
                                ColumnUtil.FromColumnMap<ReturnType<SelectDelegateT>[index]>,
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
                                    ColumnIdentifierUtil.FromSelectItem<
                                        ReturnType<SelectDelegateT>[index]
                                    >,
                                    ColumnIdentifierUtil.FromSelectItem<
                                        QueryT["selects"][number]
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
                                            QueryT["selects"][number]
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
export namespace Query {
    export function queryTreeJoins (query : IQuery) : QueryTreeArray {
        const joins = query.joins;
        if (joins == undefined || joins.length == 0) {
            return [];
        }
        const result : QueryTreeArray = [];
        result.push(AliasedTable.queryTree(joins[0].aliasedTable));
        for (let i=1; i<joins.length; ++i) {
            const join = joins[i];
            result.push(`${join.joinType} JOIN`);
            result.push(AliasedTable.queryTree(join.aliasedTable));
            if (join.from.length == 0) {
                continue;
            }
            result.push("ON");
            result.push(join.from
                .map((from, index) => {
                    const to = join.to[index];
                    return [
                        ColumnUtil.queryTree(to),
                        "=",
                        ColumnUtil.queryTree(from),
                    ].join(" ");
                })
                .join(" AND ")
            );
        }

        return result;
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