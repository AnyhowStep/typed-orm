import {
    JoinCollection,
    JoinCollectionUtil
} from "./join-collection";
import {JoinFromDelegate} from "./join-from-delegate";
import {JoinToDelegate} from "./join-to-delegate";
import {AnyAliasedTable} from "./aliased-table";
import {ReplaceValue, ReplaceValue2} from "./obj-util";
import {spread} from "@anyhowstep/type-util";
import {Join, AnyJoin} from "./join";
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
    readonly hasUnion : boolean,

    readonly joins : JoinCollection,

    readonly selects : undefined|SelectCollection,

    readonly aggregateDelegate : undefined|AggregateDelegate<any>,
}

export class SelectBuilder<DataT extends SelectBuilderData> {
    readonly data : DataT;

    public constructor (data : DataT) {
        this.data = data;
    }

    join<
        ToTableT extends AnyAliasedTable,
        FromDelegateT extends JoinFromDelegate<DataT["joins"]>
    > (
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
    //Must be called before UNION because it will change the number of
    //columns expected.
    selectAll (
        this : SelectBuilder<{
            hasSelect : false,
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
        return new SelectBuilder(spread(
            this.data,
            {
                selects : SelectCollectionUtil.fromJoinCollection(this.data.joins)
            }
        )) as any;
    }

    replaceTable<
        TableA extends AnyAliasedTable,
        TableB extends AnyAliasedTable
    > (
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
        const replaced = JoinCollectionUtil.replaceTable(this.data.joins, tableA, tableB);
        return new SelectBuilder(spread(
            this.data,
            {
                joins : replaced
            }
        )) as any;
    }

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
        return null as any;
    }
    fetchOne(
        this : SelectBuilder<{
            hasSelect : true,
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
        return null as any;
    }
    fetchZeroOrOne(
        this : SelectBuilder<{
            hasSelect : true,
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
        return null as any;
    }

    //TODO May not always work if GROUP BY, HAVING clauses use a select-expression,
    //TODO May not work as intended with UNION selects
    //Maybe just unset UNION LIMIT, or LIMIT
    count () : Promise<number> {
        return null as any;
    }

    exists () : Promise<boolean> {
        return null as any;
    }

    //Uses count() internally
    paginate (
        this : SelectBuilder<{
            hasSelect : true,
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
        return null as any;
    }

    fetchValue (
        this : SelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>
    ) : (
        FetchValueCheck<DataT, Promise<FetchValueType<DataT>>>
    ) {
        return null as any;
    }
    fetchValueOrUndefined (
        this : SelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>
    ) : (
        FetchValueCheck<DataT, Promise<undefined|FetchValueType<DataT>>>
    ) {
        return null as any;
    }
    fetchValueArray (
        this : SelectBuilder<{
            hasSelect : true,
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : any,
        }>
    ) : (
        FetchValueCheck<DataT, Promise<FetchValueType<DataT>[]>>
    ) {
        return null as any;
    }


    //Narrowing is only allowed before UNION
    //because columns of the UNION may require
    //a data type that could become disallowed by narrowing.
    //Cannot un-narrow; should not be allowed to un-narrow,
    //other expressions may rely on the narrowed type
    whereIsNotNull<
        TypeNarrowDelegateT extends TypeNarrowDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
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
        return null as any;
    };
    whereIsNull<
        TypeNarrowDelegateT extends TypeNarrowDelegate<DataT["joins"]>
    > (
        this : SelectBuilder<{
            hasSelect : any,
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
        return null as any;
    };
    whereIsEqual<
        TypeNarrowDelegateT extends TypeNarrowDelegate<DataT["joins"]>,
        ConstT extends boolean|number|string
    > (
        this : SelectBuilder<{
            hasSelect : any,
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
        return null as any;
    };

    //WHERE CLAUSE
    //Replaces but ANDs with NARROW
    where<WhereDelegateT extends WhereDelegate<SelectBuilder<DataT>>> (
        whereDelegate : WhereDelegateT
    ) : SelectBuilder<DataT> {
        return null as any;
    }
    //Appends
    andWhere<WhereDelegateT extends WhereDelegate<SelectBuilder<DataT>>> (
        whereDelegate : WhereDelegateT
    ) : SelectBuilder<DataT> {
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
    groupBy<GroupByDelegateT extends GroupByDelegate<SelectBuilder<DataT>>> (
        groupByDelegate : GroupByDelegateT
    ) : SelectBuilder<DataT> {
        return null as any;
    }
    //Appends
    appendGroupBy<GroupByDelegateT extends GroupByDelegate<SelectBuilder<DataT>>> (
        groupByDelegate : GroupByDelegateT
    ) : SelectBuilder<DataT> {
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
    having<HavingDelegateT extends HavingDelegate<SelectBuilder<DataT>>> (
        havingDelegate : HavingDelegateT
    ) : SelectBuilder<DataT> {
        return null as any;
    }
    //Appends
    andHaving<HavingDelegateT extends HavingDelegate<SelectBuilder<DataT>>> (
        havingDelegateT : HavingDelegateT
    ) : SelectBuilder<DataT> {
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
        return null as any;
    };

    //UNION CLAUSE
    union<
        TargetT extends SelectBuilder<{
            //Must have columns selected to be a union target
            hasSelect : true,
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
            hasUnion : any,
            joins : any,
            selects : any,
            aggregateDelegate : undefined,
        }>,
        target : TargetT
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
        return null as any;
    }
}

export type CreateSelectBuilderDelegate = (
    <TableT extends AnyAliasedTable>(from : TableT) => (
        SelectBuilder<{
            hasSelect : false,
            hasUnion : false,

            joins : [
                Join<
                    TableT,
                    TableT["columns"],
                    false
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

declare const from : CreateSelectBuilderDelegate;
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