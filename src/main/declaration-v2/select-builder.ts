import {
    JoinCollection,
    JoinCollectionUtil
} from "./join-collection";
import {JoinFromDelegate} from "./join-from-delegate";
import {JoinToDelegate} from "./join-to-delegate";
import {AnyAliasedTable} from "./aliased-table";
import {ReplaceValue, ReplaceValue2} from "./obj-util";
import {spread} from "@anyhowstep/type-util";
import {Join, JoinType} from "./join";
import {SelectCollection, SelectCollectionUtil} from "./select-collection";
import {SelectDelegate} from "./select-delegate";
import {ColumnCollectionUtil} from "./column-collection";
import {FetchRow} from "./fetch-row";
import {AggregateDelegate, AggregateDelegateUtil} from "./aggregate-delegate";
import {TypeNarrowDelegate} from "./type-narrow-delegate";
import {Column, AnyColumn} from "./column";
import * as invalid from "./invalid";
import {ColumnReferencesUtil, PartialColumnReferences} from "./column-references";
import {WhereDelegate} from "./where-delegate";
import {GroupByDelegate} from "./group-by-delegate";
import {HavingDelegate} from "./having-delegate";
import {OrderByDelegate} from "./order-by-delegate";
import {TypeWidenDelegate} from "./type-widen-delegate";
import * as sd from "schema-decorator";
import {SelectUtil} from "./select";
import {FetchValueCheck, FetchValueType} from "./fetch-value";

//TODO Move elsewhere
export interface RawPaginationArgs {
    page? : number|null|undefined;
    itemsPerPage? : number|null|undefined;
}
export interface PaginateInfo {
    itemsFound : number,
    pagesFound : number,
    page : number,
    itemsPerPage : number,
}
export interface PaginateResult<T> {
    info : PaginateInfo,
    rows : T[],
}
export interface SelectBuilderData {
    readonly hasSelect : boolean,
    readonly hasFrom : boolean,
    readonly hasUnion : boolean,

    readonly joins : JoinCollection,

    readonly selects : undefined|SelectCollection,

    readonly aggregateDelegate : undefined|AggregateDelegate<any>,
}

//TODO A proper table
export const dummyFromTable : AnyAliasedTable = {
    shouldHaveFromClause : true
} as any;

export class SelectBuilder<DataT extends SelectBuilderData> {
    readonly data : DataT;

    public constructor (data : DataT) {
        this.data = data;
    }

    assertAfterFrom () {
        if (!this.data.hasFrom) {
            throw new Error(`Must be called after FROM clause`);
        }
    }
    assertBeforeSelect () {
        if (this.data.hasSelect) {
            throw new Error(`Must be called before SELECT clause`);
        }
    }
    assertAfterSelect () {
        if (!this.data.hasSelect) {
            throw new Error(`Must be called after SELECT clause`);
        }
    }
    assertBeforeUnion () {
        if (this.data.hasUnion) {
            throw new Error(`Must be called before UNION clause`);
        }
    }

    //Must be done before any JOINs, as per MySQL
    from<ToTableT extends AnyAliasedTable> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : false,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        toTable : ToTableT
    ) : (
        SelectBuilder<ReplaceValue2<
            DataT,
            "hasFrom",
            true,
            "joins",
            [
                Join<
                    ToTableT,
                    ToTableT["columns"],
                    false
                >
            ]
        >>
    ) {
        if (this.data.hasFrom) {
            throw new Error(`FROM clause already exists`);
        }
        return new SelectBuilder(spread(
            this.data,
            {
                hasFrom : true,
                joins : [
                    new Join(
                        JoinType.FROM,
                        toTable,
                        toTable.columns,
                        false,
                        [],
                        []
                    )
                ]
            }
        )) as any;
    }
    join<
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>
    ) : (
        Error extends JoinCollectionUtil.InnerJoin<DataT["joins"], ToTableT> ?
            JoinCollectionUtil.InnerJoin<DataT["joins"], ToTableT> :
            SelectBuilder<ReplaceValue<
                DataT,
                "joins",
                JoinCollectionUtil.InnerJoinUnsafe<DataT["joins"], ToTableT>
            >>
    ) {
        this.assertAfterFrom();
        return new SelectBuilder(spread(
            this.data,
            {
                joins : JoinCollectionUtil.innerJoin(
                    this.data.joins,
                    toTable,
                    fromDelegate as any,
                    toDelegate
                )
            }
        )) as any;
    }
    joinUsing<
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        toTable : ToTableT,
        fromDelegate : FromDelegateT
    ) : (
        Error extends JoinCollectionUtil.InnerJoinUsing<DataT["joins"], ToTableT, FromDelegateT> ?
            JoinCollectionUtil.InnerJoinUsing<DataT["joins"], ToTableT, FromDelegateT> :
            SelectBuilder<ReplaceValue<
                DataT,
                "joins",
                JoinCollectionUtil.InnerJoinUnsafe<DataT["joins"], ToTableT>
            >>
    ) {
        this.assertAfterFrom();
        return new SelectBuilder(spread(
            this.data,
            {
                joins : JoinCollectionUtil.innerJoinUsing(
                    this.data.joins,
                    toTable,
                    fromDelegate as any
                )
            }
        )) as any;
    }
    //We don't allow right joins after selecting
    //because it'll narrow the data type of selected columns
    rightJoin<
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : false,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>
    ) : (
        Error extends JoinCollectionUtil.RightJoin<DataT["joins"], ToTableT> ?
            JoinCollectionUtil.RightJoin<DataT["joins"], ToTableT> :
            SelectBuilder<ReplaceValue<
                DataT,
                "joins",
                JoinCollectionUtil.RightJoinUnsafe<DataT["joins"], ToTableT>
            >>
    ) {
        this.assertBeforeSelect();
        this.assertAfterFrom();
        return new SelectBuilder(spread(
            this.data,
            {
                joins : JoinCollectionUtil.rightJoin(
                    this.data.joins,
                    toTable,
                    fromDelegate as any,
                    toDelegate
                )
            }
        )) as any;
    }
    //We don't allow right joins after selecting
    //because it'll narrow the data type of selected columns
    rightJoinUsing<
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : false,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        toTable : ToTableT,
        fromDelegate : FromDelegateT
    ) : (
        Error extends JoinCollectionUtil.RightJoinUsing<DataT["joins"], ToTableT, FromDelegateT> ?
            JoinCollectionUtil.RightJoinUsing<DataT["joins"], ToTableT, FromDelegateT> :
            SelectBuilder<ReplaceValue<
                DataT,
                "joins",
                JoinCollectionUtil.RightJoinUnsafe<DataT["joins"], ToTableT>
            >>
    ) {
        this.assertBeforeSelect();
        this.assertAfterFrom();
        return new SelectBuilder(spread(
            this.data,
            {
                joins : JoinCollectionUtil.rightJoinUsing(
                    this.data.joins,
                    toTable,
                    fromDelegate as any
                )
            }
        )) as any;
    }
    leftJoin<
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        toTable : ToTableT,
        fromDelegate : FromDelegateT,
        toDelegate : JoinToDelegate<ToTableT, ReturnType<FromDelegateT>>
    ) : (
        Error extends JoinCollectionUtil.LeftJoin<DataT["joins"], ToTableT> ?
            JoinCollectionUtil.LeftJoin<DataT["joins"], ToTableT> :
            SelectBuilder<ReplaceValue<
                DataT,
                "joins",
                JoinCollectionUtil.LeftJoinUnsafe<DataT["joins"], ToTableT>
            >>
    ) {
        this.assertAfterFrom();
        return new SelectBuilder(spread(
            this.data,
            {
                joins : JoinCollectionUtil.leftJoin(
                    this.data.joins,
                    toTable,
                    fromDelegate as any,
                    toDelegate
                )
            }
        )) as any;
    }
    leftJoinUsing<
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        toTable : ToTableT,
        fromDelegate : FromDelegateT
    ) : (
        Error extends JoinCollectionUtil.LeftJoinUsing<DataT["joins"], ToTableT, FromDelegateT> ?
            JoinCollectionUtil.LeftJoinUsing<DataT["joins"], ToTableT, FromDelegateT> :
            SelectBuilder<ReplaceValue<
                DataT,
                "joins",
                JoinCollectionUtil.LeftJoinUnsafe<DataT["joins"], ToTableT>
            >>
    ) {
        this.assertAfterFrom();
        return new SelectBuilder(spread(
            this.data,
            {
                joins : JoinCollectionUtil.leftJoinUsing(
                    this.data.joins,
                    toTable,
                    fromDelegate as any
                )
            }
        )) as any;
    }

    //Must be called before UNION because it will change the number of
    //columns expected.
    select<
        SelectDelegateT extends SelectDelegate<SelectBuilder<DataT>, DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : any,
            hasUnion : false,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        selectDelegate : SelectDelegateT
    ) : (
        Error extends SelectCollectionUtil.AppendSelect<
            DataT["selects"],
            SelectBuilder<DataT>,
            DataT["joins"],
            SelectDelegateT
        > ?
            SelectCollectionUtil.AppendSelect<
                DataT["selects"],
                SelectBuilder<DataT>,
                DataT["joins"],
                SelectDelegateT
            > :
            (
                SelectBuilder<ReplaceValue2<
                    DataT,
                    "selects",
                    SelectCollectionUtil.AppendSelectUnsafe<
                        DataT["selects"],
                        SelectBuilder<DataT>,
                        DataT["joins"],
                        SelectDelegateT
                    >,
                    "hasSelect",
                    true
                >>
            )
    ) {
        this.assertBeforeUnion();
        const selects = SelectCollectionUtil.appendSelect<
            DataT["selects"],
            SelectBuilder<DataT>,
            DataT["joins"],
            SelectDelegateT
        >(
            this.data.selects,
            this as any,
            this.data.joins,
            selectDelegate
        );
        return new SelectBuilder(spread(
            this.data,
            {
                selects : selects
            }
        )) as any;
    }
    //Must be called before any other `SELECT` methods
    //because it'll set the select clause to whatever is at the joins,
    //We never want to overwrite the select clause, only append.
    //Must be called after `FROM` to have tables to select from.
    //Must be called before `UNION` because it will change the number of
    //columns expected.
    selectAll (
        this : SelectBuilder<{
            hasSelect : false,
            hasFrom : true,
            hasUnion : false,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>
    ) : (
        SelectBuilder<ReplaceValue2<
            DataT,
            "selects",
            SelectCollectionUtil.FromJoinCollection<DataT["joins"]>,
            "hasSelect",
            true
        >>
    ) {
        this.assertBeforeSelect();
        this.assertAfterFrom();
        this.assertBeforeUnion();
        return new SelectBuilder(spread(
            this.data,
            {
                selects : SelectCollectionUtil.fromJoinCollection(this.data.joins)
            }
        )) as any;
    }

    //Must be called after `FROM`; makes no sense
    //to replace tables if there aren't any...
    replaceTable<
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        tableA : TableA,
        tableB : TableB
    ) : (
        Error extends JoinCollectionUtil.ReplaceTable<DataT["joins"], TableA, TableB> ?
            JoinCollectionUtil.ReplaceTable<DataT["joins"], TableA, TableB> :   
            SelectBuilder<ReplaceValue<
                DataT,
                "joins",
                JoinCollectionUtil.ReplaceTableUnsafe<DataT["joins"], TableA, TableB>
            >>
    ) {
        this.assertAfterFrom();
        const replaced = JoinCollectionUtil.replaceTable(this.data.joins, tableA, tableB);
        return new SelectBuilder(spread(
            this.data,
            {
                joins : replaced
            }
        )) as any;
    }

    //Must be called after `SELECT` or there will be
    //no columns to aggregate...
    aggregate<
        AggregateDelegateT extends undefined|AggregateDelegate<
            FetchRow<
                DataT["joins"],
                SelectCollectionUtil.ToColumnReferences<DataT["selects"]>
            >
        >
    > (
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        aggregateDelegate : AggregateDelegateT
    ) : (
        SelectBuilder<ReplaceValue<
            DataT,
            "aggregateDelegate",
            AggregateDelegateT
        >>
    ) {
        this.assertAfterSelect();
        return new SelectBuilder(spread(
            this.data,
            {
                aggregateDelegate : aggregateDelegate
            }
        )) as any;
    }

    fetchAll(
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
    ) : (
        Promise<AggregateDelegateUtil.AggregatedRow<
            FetchRow<
                DataT["joins"],
                SelectCollectionUtil.ToColumnReferences<DataT["selects"]>
            >,
            DataT["aggregateDelegate"]
        >[]>
    ) {
        this.assertAfterSelect();
        return null as any;
    }
    fetchOne(
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
    ) : (
        Promise<AggregateDelegateUtil.AggregatedRow<
            FetchRow<
                DataT["joins"],
                SelectCollectionUtil.ToColumnReferences<DataT["selects"]>
            >,
            DataT["aggregateDelegate"]
        >>
    ) {
        this.assertAfterSelect();
        return null as any;
    }
    fetchZeroOrOne(
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
    ) : (
        Promise<
            undefined|
            AggregateDelegateUtil.AggregatedRow<
                FetchRow<
                    DataT["joins"],
                    SelectCollectionUtil.ToColumnReferences<DataT["selects"]>
                >,
                DataT["aggregateDelegate"]
            >
        >
    ) {
        this.assertAfterSelect();
        return null as any;
    }

    //TODO May not always work if GROUP BY, HAVING clauses use a select-expression,
    //TODO May not work as intended with UNION selects
    //Maybe just unset UNION LIMIT, or LIMIT
    //Must be called after `FROM` or there will be no tables to count from
    count (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>
    ) : Promise<number> {
        this.assertAfterSelect();
        return null as any;
    }

    //Must be called after `FROM` or there will be no tables to check existence from
    exists (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>
    ) : Promise<boolean> {
        this.assertAfterSelect();
        return null as any;
    }

    //Uses count() internally
    paginate (
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        paginationArgs? : RawPaginationArgs
    ) : (
        Promise<PaginateResult<
            AggregateDelegateUtil.AggregatedRow<
                FetchRow<
                    DataT["joins"],
                    SelectCollectionUtil.ToColumnReferences<DataT["selects"]>
                >,
                DataT["aggregateDelegate"]
            >
        >>
    ) {
        this.assertAfterSelect();
        return null as any;
    }

    fetchValue (
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>
    ) : (
        FetchValueCheck<DataT, Promise<FetchValueType<DataT>>>
    ) {
        this.assertAfterSelect();
        return null as any;
    }
    fetchValueOrUndefined (
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>
    ) : (
        FetchValueCheck<DataT, Promise<undefined|FetchValueType<DataT>>>
    ) {
        this.assertAfterSelect();
        return null as any;
    }
    fetchValueArray (
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>
    ) : (
        FetchValueCheck<DataT, Promise<FetchValueType<DataT>[]>>
    ) {
        this.assertAfterSelect();
        return null as any;
    }


    //Narrowing is only allowed before UNION
    //because columns of the UNION may require
    //a data type that could become disallowed by narrowing.
    //Cannot un-narrow; should not be allowed to un-narrow,
    //other expressions may rely on the narrowed type.
    //Must be called after `FROM` or there will be no columns
    //to narrow.
    whereIsNotNull<
        TypeNarrowDelegateT extends TypeNarrowDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : false,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        typeNarrowDelegate : TypeNarrowDelegateT
    ) : (
        ReturnType<TypeNarrowDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ?
            SelectBuilder<ReplaceValue2<
                DataT,
                "joins",
                JoinCollectionUtil.ReplaceColumnType<
                    DataT["joins"],
                    TableAliasT,
                    ColumnNameT,
                    Exclude<
                        TypeT,
                        null|undefined
                    >
                >,
                "selects",
                SelectCollectionUtil.ReplaceSelectType<
                    DataT["selects"],
                    TableAliasT,
                    ColumnNameT,
                    Exclude<
                        TypeT,
                        null|undefined
                    >
                >
            >> :
            (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeNarrowDelegateT>>)
    ) {
        this.assertAfterFrom();
        this.assertBeforeUnion();
        return null as any;
    };
    whereIsNull<
        TypeNarrowDelegateT extends TypeNarrowDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : false,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        typeNarrowDelegate : TypeNarrowDelegateT
    ) : (
        ReturnType<TypeNarrowDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ?
            SelectBuilder<ReplaceValue2<
                DataT,
                "joins",
                JoinCollectionUtil.ReplaceColumnType<
                    DataT["joins"],
                    TableAliasT,
                    ColumnNameT,
                    null
                >,
                "selects",
                SelectCollectionUtil.ReplaceSelectType<
                    DataT["selects"],
                    TableAliasT,
                    ColumnNameT,
                    null
                >
            >> :
            (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeNarrowDelegateT>>)
    ) {
        this.assertAfterFrom();
        this.assertBeforeUnion();
        return null as any;
    };
    whereIsEqual<
        TypeNarrowDelegateT extends TypeNarrowDelegate<DataT["joins"]>,
        ConstT extends boolean|number|string
    > (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : false,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        typeNarrowDelegate : TypeNarrowDelegateT,
        value : ConstT
    ) : (
        ReturnType<TypeNarrowDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ?
            SelectBuilder<ReplaceValue2<
                DataT,
                "joins",
                JoinCollectionUtil.ReplaceColumnType<
                    DataT["joins"],
                    TableAliasT,
                    ColumnNameT,
                    ConstT
                >,
                "selects",
                SelectCollectionUtil.ReplaceSelectType<
                    DataT["selects"],
                    TableAliasT,
                    ColumnNameT,
                    ConstT
                >
            >> :
            (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeNarrowDelegateT>>)
    ) {
        this.assertAfterFrom();
        this.assertBeforeUnion();
        return null as any;
    };

    //WHERE CLAUSE
    //Replaces but ANDs with NARROW
    //Must be called after `FROM` as per MySQL
    where<WhereDelegateT extends WhereDelegate<SelectBuilder<DataT>>> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        whereDelegate : WhereDelegateT
    ) : SelectBuilder<DataT> {
        this.assertAfterFrom();
        return null as any;
    }
    //Appends
    andWhere<WhereDelegateT extends WhereDelegate<SelectBuilder<DataT>>> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        whereDelegate : WhereDelegateT
    ) : SelectBuilder<DataT> {
        this.assertAfterFrom();
        return null as any;
    }

    //DISTINCT CLAUSE
    distinct (distinct? : boolean) : SelectBuilder<DataT> {
        return null as any;
    }

    //SQL_CALC_FOUND_ROWS CLAUSE
    sqlCalcFoundRows (sqlCalcFoundRows? : boolean) : SelectBuilder<DataT> {
        return null as any;
    }

    //GROUP BY CLAUSE
    //Replaces
    //Must be called after `FROM` as per MySQL
    groupBy<GroupByDelegateT extends GroupByDelegate<SelectBuilder<DataT>>> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        groupByDelegate : GroupByDelegateT
    ) : SelectBuilder<DataT> {
        this.assertAfterFrom();
        return null as any;
    }
    //Appends
    appendGroupBy<GroupByDelegateT extends GroupByDelegate<SelectBuilder<DataT>>> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        groupByDelegate : GroupByDelegateT
    ) : SelectBuilder<DataT> {
        this.assertAfterFrom();
        return null as any;
    }

    //REMOVES GROUP BY
    unsetGroupBy () : SelectBuilder<DataT> {
        return null as any;
    }

    //HAVING CLAUSE
    //TECHNICALLY, can only use columns in GROUP BY, or columns in aggregate functions,
    //But MySQL supports an extension that allows columns from SELECT
    //As such, this library does not check for valid columns here
    //As long as it is in columnReferences or selectReferences.

    //Replaces
    //Must be called after `FROM` as per MySQL
    having<HavingDelegateT extends HavingDelegate<SelectBuilder<DataT>>> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        havingDelegate : HavingDelegateT
    ) : SelectBuilder<DataT> {
        this.assertAfterFrom();
        return null as any;
    }
    //Appends
    andHaving<HavingDelegateT extends HavingDelegate<SelectBuilder<DataT>>> (
        this : SelectBuilder<{
            hasSelect : any,
            hasFrom : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>,
        havingDelegateT : HavingDelegateT
    ) : SelectBuilder<DataT> {
        this.assertAfterFrom();
        return null as any;
    }

    //ORDER BY CLAUSE
    //Replaces
    orderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>> (
        orderByDelegate : OrderByDelegateT
    ) : SelectBuilder<DataT> {
        return null as any;
    }
    //Appends
    appendOrderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>> (
        orderByDelegate : OrderByDelegateT
    ) : SelectBuilder<DataT> {
        return null as any;
    }

    //REMOVES ORDER BY
    unsetOrderBy () : SelectBuilder<DataT> {
        return null as any;
    }

    //LIMIT CLAUSE
    limit (rowCount : number) : SelectBuilder<DataT> {
        return null as any;
    }

    //OFFSET CLAUSE
    offset (offset : number) : SelectBuilder<DataT> {
        return null as any;
    }

    //REMOVES LIMIT
    unsetLimit () : SelectBuilder<DataT> {
        return null as any;
    }

    //UNION ORDER BY CLAUSE
    //Replaces
    unionOrderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>> (
        orderByDelegate : OrderByDelegateT
    ) : SelectBuilder<DataT> {
        return null as any;
    }
    //Appends
    appendUnionOrderBy<OrderByDelegateT extends OrderByDelegate<SelectBuilder<DataT>>> (
        orderByDelegate : OrderByDelegateT
    ) : SelectBuilder<DataT> {
        return null as any;
    }

    //UNION REMOVES ORDER BY
    unsetUnionOrderBy () : SelectBuilder<DataT> {
        return null as any;
    }

    //UNION LIMIT CLAUSE
    unionLimit (rowCount : number) : SelectBuilder<DataT> {
        return null as any;
    }

    //UNION OFFSET CLAUSE
    unionOffset (offset : number) : SelectBuilder<DataT> {
        return null as any;
    }

    //UNION REMOVES LIMIT
    unsetUnionLimit () : SelectBuilder<DataT> {
        return null as any;
    }

    //Must be done after select or there will be no columns to widen.
    //Must be done before `aggregate()` because
    //it'll make the data type wider than `aggregate()` expects.
    widen<
        TypeWidenDelegateT extends TypeWidenDelegate<DataT["selects"]>,
        WidenT
    > (
        this : SelectBuilder<{
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : undefined,
        }>,
        typeWidenDelegate : TypeWidenDelegateT,
        assertWidened : sd.AssertFunc<WidenT>
    ) : (
        ReturnType<TypeWidenDelegateT> extends Column<infer TableAliasT, infer ColumnNameT, infer TypeT> ?
            SelectBuilder<ReplaceValue2<
                DataT,
                "joins",
                JoinCollectionUtil.ReplaceColumnType<
                    DataT["joins"],
                    TableAliasT,
                    ColumnNameT,
                    WidenT|TypeT
                >,
                "selects",
                SelectCollectionUtil.ReplaceSelectType<
                    DataT["selects"],
                    TableAliasT,
                    ColumnNameT,
                    WidenT|TypeT
                >
            >> :
            (invalid.E2<"Invalid column or could not infer some types", ReturnType<TypeWidenDelegateT>>)
    ) {
        this.assertAfterSelect();
        return null as any;
    };

    //UNION CLAUSE
    //Implicitly UNION DISTINCT
    union<
        TargetT extends SelectBuilder<{
            //Must have columns selected to be a union target
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>
    > (
        this : SelectBuilder<{
            //Must have columns to know how many columns,
            //And what data types are required
            hasSelect : true,
            hasFrom : any,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : undefined,
        }>,
        target : TargetT,
        //Set to `false` to UNION ALL
        distinct : boolean = true
    ) : (
        TargetT extends SelectBuilder<infer TargetDataT> ?
            (
                TargetDataT["selects"] extends SelectCollection ?
                    (
                        DataT["selects"] extends SelectCollection ?
                            (
                                //Run-time check impossible for now
                                SelectCollectionUtil.HasCompatibleTypes<
                                    TargetDataT["selects"],
                                    DataT["selects"]
                                > extends true ?
                                    (
                                        SelectBuilder<DataT>
                                    ) :
                                    invalid.E4<
                                        "Target SELECT clause",
                                        SelectCollectionUtil.MapToTypes<TargetDataT["selects"]>,
                                        "is not compatible with",
                                        SelectCollectionUtil.MapToTypes<DataT["selects"]>
                                    >
                            ) :
                            invalid.E2<
                                "Could not find SELECT clause",
                                DataT["selects"]
                            >
                    ) :
                    invalid.E2<
                        "Union target does not have a SELECT clause",
                        TargetDataT["selects"]
                    >
            ) :
            invalid.E2<
                "Invalid union target, or could not infer TargetDataT",
                TargetT
            >
    ) {
        this.assertAfterSelect();
        return null as any;
    }
}

export type CreateSelectBuilderDelegate = (
    () => (
        SelectBuilder<{
            hasSelect : false,
            hasFrom : false,
            hasUnion : false,

            //This is just a dummy JOIN
            //It will be replaced when the FROM clause is added
            joins : [
                Join<
                    AnyAliasedTable,
                    AnyAliasedTable["columns"],
                    true
                >
            ],
            selects : undefined,
            aggregateDelegate : undefined,
        }>
    )
);
export type AnySelectBuilder = SelectBuilder<any>;
//////
//import {Column} from "./column";
import {AliasedTable} from "./aliased-table";
import {TupleKeys} from "./tuple";
import { InsertValueBuilder } from "../definition";
import {AnySelect} from "./select";

declare const query : CreateSelectBuilderDelegate;
const from = <ToTableT extends AnyAliasedTable>(
    from : ToTableT
) => {
    return query().from(from);
};

declare const ofApp : AliasedTable<
    "ofApp",
    "ofApp",
    {
        readonly appId : Column<"app", "appId", number>
    }
>;
declare const app : AliasedTable<
    "app",
    "app",
    {
        readonly appId : Column<"app", "appId", number>,
        readonly name : Column<"app", "name", string>,
        readonly ssoApiKey : Column<"app", "ssoApiKey", string|null>,
    }
>;
declare const appKey : AliasedTable<
    "appKey",
    "appKey",
    {
        readonly appId : Column<"appKey", "appId", number>,
        readonly key : Column<"appKey", "key", string>
    }
>;
declare const user : AliasedTable<
    "user",
    "user",
    {
        readonly appId : Column<"user", "appId", number>,
        readonly externalUserId : Column<"user", "externalUserId", string>
    }
>;

from(app)
    .select(c => [c])

const a : typeof app extends typeof ofApp ? "yes" : "no";

const unionTarget = from(ofApp)
    .rightJoinUsing(appKey, c=>[c.appId])
    .leftJoinUsing(user, c=>[c.appKey.appId])
    .select((c) => {
        return [c.ofApp, c.appKey.appId]
    })
    .select((_c) => {
        return [user.columns.appId];
    });
const s = from(ofApp)
    .rightJoinUsing(appKey, c=>[c.appId])
    .leftJoinUsing(user, c=>[c.appKey.appId])
    .replaceTable(ofApp, app)
    .select((c) => {
        return [c.ofApp, c.appKey.appId]
    })
    //.whereIsNotNull(c => c.ofApp.ssoApiKey)
    /*.aggregate((row) => {
        return {
            ...row.ofApp,
            //...row.appKey,
            aggregated : true
        }
    })*/
    .select((_c) => {
        return [user.columns.appId];
    })
    .union(unionTarget);//*/
    /*.fetchOne()
    .then((result) => {
        result
    })//*/
    const fr : FetchRow<
        typeof s["data"]["joins"],
        SelectCollectionUtil.ToColumnReferences<typeof s["data"]["selects"]>
    >
    s.data.joins[1].columns.appId
    const j2c : JoinCollectionUtil.Columns<typeof s["data"]["joins"]>
    const j2cr : JoinCollectionUtil.ToColumnReferences<typeof s["data"]["joins"]>
    const pj2cr : ColumnReferencesUtil.Partial<typeof j2cr> = null as any;
    const pcr : PartialColumnReferences = pj2cr;
    //.selectAll();
s.data.joins[0].columns
s.data.joins[1].columns
s.data.joins[2].columns
s.data.selects.map((m) => {

})
const k : TupleKeys<typeof s.data.joins>;
const k2 : TupleKeys<[1,2,3]>;
    //.join(app, c=>[c.appId], t=>[t.appId]);

const objW : {a:number, b:number} extends {a:number} ? "y" : "n";
const type : number|string extends number ? "y" : "n";
const ut_s_compat : SelectCollectionUtil.HasCompatibleTypes<
    typeof unionTarget["data"]["selects"],
    typeof s["data"]["selects"]
>
const ut_s_compat_per_sel : {
    [index in TupleKeys<typeof unionTarget["data"]["selects"]>] : (
        typeof unionTarget["data"]["selects"][index] extends AnySelect ?
            (
                index extends keyof typeof s["data"]["selects"] ?
                    (
                        typeof s["data"]["selects"][index] extends AnySelect ?
                            (
                                //[
                                    SelectUtil.HasCompatibleTypes<
                                        typeof unionTarget["data"]["selects"][index],
                                        typeof s["data"]["selects"][index]
                                    >/*,
                                    SelectUtil.HasOneType<typeof unionTarget["data"]["selects"][index]>,
                                    SelectUtil.HasOneType<typeof s["data"]["selects"][index]>
                                ]//*/
                            ) :
                            false
                    ) :
                    //This shouldn't happen,
                    //we already checked they have
                    //the same length
                    false
            ) :
            false
    )
}[TupleKeys<typeof unionTarget["data"]["selects"]>];