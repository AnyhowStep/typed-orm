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
    select<
        SelectDelegateT extends SelectDelegate<SelectBuilder<DataT>, DataT["joins"]>
    > (
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
            this,
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
    //We never want to overwrite the select clause, only append
    selectAll (
        this : SelectBuilder<{
            hasSelect : false,
            hasUnion : any,
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
        //Promise<SelectCollectionUtil.ToColumnReferences<DataT["selects"]>>
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
import {Column} from "./column";
import {AliasedTable} from "./aliased-table";
import {TupleKeys} from "./tuple";

declare const from : CreateSelectBuilderDelegate;
declare const ofApp : AliasedTable<
    "ofApp",
    "ofApp",
    {
        appId : Column<"app", "appId", number>
    }
>;
declare const app : AliasedTable<
    "app",
    "app",
    {
        appId : Column<"app", "appId", number>,
        name : Column<"app", "name", string>,
    }
>;
declare const appKey : AliasedTable<
    "appKey",
    "appKey",
    {
        appId : Column<"appKey", "appId", number>,
        key : Column<"appKey", "key", string>
    }
>;
declare const user : AliasedTable<
    "user",
    "user",
    {
        appId : Column<"user", "appId", number>,
        externalUserId : Column<"user", "externalUserId", string>
    }
>;

from(app)
    .select(c => [c])

const a : typeof app extends typeof ofApp ? "yes" : "no";

const s = from(ofApp)
    .rightJoinUsing(appKey, c=>[c.appId])
    .leftJoinUsing(user, c=>[c.appKey.appId])
    .replaceTable(ofApp, app)
    .select((c) => {
        return [c.ofApp, c.appKey.appId]
    })
    .aggregate((row) => {
        return {
            ...row.ofApp,
            //...row.appKey,
            aggregated : true
        }
    })
    .select((_c) => {
        return [user.columns.appId];
    })
    .fetchOne()
    .then((result) => {
        result
    })
    //.selectAll();
s.data.joins[0].columns
s.data.joins[1].columns
s.data.joins[2].columns
s.data.selects.map((m) => {

})
const k : TupleKeys<typeof s.data.joins>;
const k2 : TupleKeys<[1,2,3]>;
    //.join(app, c=>[c.appId], t=>[t.appId]);
