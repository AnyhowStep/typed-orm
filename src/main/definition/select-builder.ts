import * as d from "../declaration";
import * as sd from "schema-decorator";
import {tableToReference} from "./table-operation";
import * as tuple from "./tuple";
import {spread, check} from "@anyhowstep/type-util";
import {getJoinFrom, getJoinTo, toNullableJoinTuple} from "./join";
import {toNullableColumnReferences, replaceColumnOfReference} from "./column-references-operation";
import {Expr} from "./expr";
import {toExpr} from "./expr-operation";
import * as e from "./expr-library";
import {Column} from "./column";
import {replaceColumnOfSelectTuple} from "./select";

export interface ExtraSelectBuilderData {
    readonly narrowExpr? : d.IExpr<any, boolean>;
    readonly whereExpr? : d.IExpr<any, boolean>;
}

export class SelectBuilder<DataT extends d.AnySelectBuilderData> implements d.ISelectBuilder<DataT> {
    readonly data : DataT;
    readonly extraData : ExtraSelectBuilderData;

    public constructor (data : DataT, extraData : ExtraSelectBuilderData) {
        this.data = data;
        this.extraData = extraData;
    }

    public assertAllowed (op : d.SelectBuilderOperation) {
        if (this.data.allowed.indexOf(op) < 0) {
            throw new Error(`${op} clause not allowed here`);
        }
    }

    public assertNonDuplicateAlias (alias : string) {
        if (this.data.columnReferences[alias] != undefined) {
            throw new Error(`Duplicate alias ${alias}`);
        }
    }

    public assertEqualLength (a : any[], b : any[]) {
        if (a.length != b.length) {
            throw new Error(`Tuple length mismatch; ${a.length} != ${b.length}`);
        }
    }

    //JOIN CLAUSE
    join<
        ToTableT extends d.AnyAliasedTable,
        FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"], d.Tuple<d.AnyColumn>>
    > (
        toTable : ToTableT,
        from : FromTupleT,
        to : d.JoinToTupleCallback<ToTableT, d.JoinFromTupleOfCallback<FromTupleT>>
    ) {
        this.assertAllowed(d.SelectBuilderOperation.JOIN);
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = getJoinFrom(this.data.columnReferences, from);
        const toTuple = getJoinTo(toTable, to);
        this.assertEqualLength(fromTuple, toTuple);

        return new SelectBuilder(spread(
            this.data,
            {
                columnReferences : spread(
                    this.data.columnReferences,
                    tableToReference(toTable)
                ),
                joins : tuple.push(this.data.joins, {
                    alias : toTable.alias,
                    nullable : false,
                }),
            }
        ), this.extraData) as any;
    }
    rightJoin<
        ToTableT extends d.AnyAliasedTable,
        FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"], d.Tuple<d.AnyColumn>>
    > (
        toTable : ToTableT,
        from : FromTupleT,
        to : d.JoinToTupleCallback<ToTableT, d.JoinFromTupleOfCallback<FromTupleT>>
    ) {
        this.assertAllowed(d.SelectBuilderOperation.JOIN);
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = getJoinFrom(this.data.columnReferences, from);
        const toTuple = getJoinTo(toTable, to);
        this.assertEqualLength(fromTuple, toTuple);

        return new SelectBuilder(spread(
            this.data,
            {
                columnReferences : spread(
                    toNullableColumnReferences(this.data.columnReferences),
                    tableToReference(toTable)
                ),
                joins : tuple.push(
                    toNullableJoinTuple(this.data.joins),
                    {
                        alias : toTable.alias,
                        nullable : false,
                    }
                ),
            }
        ), this.extraData) as any;
    };
    leftJoin<
        ToTableT extends d.AnyAliasedTable,
        FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"], d.Tuple<d.AnyColumn>>
    > (
        toTable : ToTableT,
        from : FromTupleT,
        to : d.JoinToTupleCallback<ToTableT, d.JoinFromTupleOfCallback<FromTupleT>>
    ) {
        this.assertAllowed(d.SelectBuilderOperation.JOIN);
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = getJoinFrom(this.data.columnReferences, from);
        const toTuple = getJoinTo(toTable, to);
        this.assertEqualLength(fromTuple, toTuple);

        return new SelectBuilder(spread(
            this.data,
            {
                columnReferences : spread(
                    this.data.columnReferences,
                    toNullableColumnReferences(tableToReference(toTable))
                ),
                joins : tuple.push(
                    this.data.joins,
                    {
                        alias : toTable.alias,
                        nullable : true,
                    }
                ),
            }
        ), this.extraData) as any;
    };

    //TYPE-NARROW CLAUSE
    private appendNarrowData (newColumn : Column<any, any, any>) {
        return spread(
            this.data,
            {
                columnReferences : replaceColumnOfReference(this.data.columnReferences, newColumn),
                selectReferences : replaceColumnOfReference(this.data.selectReferences, newColumn),
                selectTuple : (
                    this.data.selectTuple == undefined ?
                        undefined :
                        replaceColumnOfSelectTuple(this.data.selectTuple, newColumn)
                ),
            }
        );
    }
    private appendWhereExpr (newExpr : d.IExpr<any, boolean>) {
        if (this.extraData.whereExpr == undefined) {
            return {
                ...this.extraData,
                whereExpr : newExpr,
            };
        } else {
            return {
                ...this.extraData,
                whereExpr : e.and(
                    this.extraData.whereExpr,
                    newExpr
                ),
            };
        }
    }
    private appendNarrowExpr (newExpr : d.IExpr<any, boolean>) {
        //Must modify WHERE clause
        const result = this.appendWhereExpr(newExpr);
        //Append
        result.narrowExpr = (this.extraData.narrowExpr == undefined) ?
            newExpr :
            e.and(
                this.extraData.narrowExpr,
                newExpr
            );
        return result;
    }
    whereIsNotNull<TypeNarrowCallbackT extends d.TypeNarrowCallback<d.ISelectBuilder<DataT>>> (
        typeNarrowCallback : TypeNarrowCallbackT
    ) {
        this.assertAllowed(d.SelectBuilderOperation.NARROW);

        const toReplace = typeNarrowCallback(this.data.columnReferences);
        return new SelectBuilder(
            this.appendNarrowData(new Column(
                toReplace.table,
                toReplace.name,
                sd.notOptional(toReplace.assertDelegate)
            )),
            this.appendNarrowExpr(e.isNotNull(toReplace))
        ) as any;
    };
    whereIsNull<TypeNarrowCallbackT extends d.TypeNarrowCallback<d.ISelectBuilder<DataT>>> (
        typeNarrowCallback : TypeNarrowCallbackT
    ) {
        this.assertAllowed(d.SelectBuilderOperation.NARROW);

        const toReplace = typeNarrowCallback(this.data.columnReferences);
        return new SelectBuilder(
            this.appendNarrowData(new Column(
                toReplace.table,
                toReplace.name,
                sd.nil()
            )),
            this.appendNarrowExpr(e.isNull(toReplace))
        ) as any;
    };
    whereIsEqual<
        ConstT extends boolean|number|string,
        TypeNarrowCallbackT extends d.TypeNarrowCallback<d.ISelectBuilder<DataT>>
    > (
        value : ConstT,
        typeNarrowCallback : TypeNarrowCallbackT
    ) {
        this.assertAllowed(d.SelectBuilderOperation.NARROW);

        const toReplace = typeNarrowCallback(this.data.columnReferences);

        return new SelectBuilder(
            this.appendNarrowData(new Column(
                toReplace.table,
                toReplace.name,
                sd.oneOf(value)
            )),
            this.appendNarrowExpr(e.and(
                //Adding this so we don't compare against NULL
                e.isNotNull(toReplace),
                e.eq(toReplace, value) as any
            ))
        ) as any;
    };

    //WHERE CLAUSE
    //Replaces but ANDs with NARROW
    where<WhereCallbackT extends d.WhereCallback<d.ISelectBuilder<DataT>>> (
        whereCallback : WhereCallbackT
    ) {
        this.assertAllowed(d.SelectBuilderOperation.WHERE);

        let condition : d.IExpr<any, boolean> = whereCallback(
            this.data.columnReferences,
            this as any
        );
        if (this.extraData.narrowExpr != undefined) {
            condition = e.and(
                this.extraData.narrowExpr,
                condition
            );
        }
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                whereExpr : condition,
            }
        ) as any;
    };
    //Appends
    andWhere<WhereCallbackT extends d.WhereCallback<d.ISelectBuilder<DataT>>> (
        whereCallback : WhereCallbackT
    ) {
        this.assertAllowed(d.SelectBuilderOperation.WHERE);

        let condition : d.IExpr<any, boolean> = whereCallback(
            this.data.columnReferences,
            this as any
        );
        return new SelectBuilder(
            this.data,
            this.appendWhereExpr(condition)
        ) as any;
    };

    //SELECT CLAUSE
    select<SelectCallbackT extends SelectCallback<ISelectBuilder<DataT>>> (
        selectCallback : SelectCallbackT
    ) {
        return null as any;
    };

    //DISTINCT CLAUSE
    //distinct ();
    //distinct<DistinctT extends boolean> (distinct : DistinctT);
    distinct (distinct : boolean = true) {
        this.assertAllowed(d.SelectBuilderOperation.DISTINCT);

        return new SelectBuilder(
            spread(
                this.data,
                { distinct : distinct }
            ),
            this.extraData,
        ) as any;
    }

    //SQL_CALC_FOUND_ROWS CLAUSE
    //sqlCalcFoundRows ();
    //sqlCalcFoundRows<SqlCalcFoundRowsT extends boolean> (sqlCalcFoundRows : SqlCalcFoundRowsT);
    sqlCalcFoundRows (sqlCalcFoundRows : boolean = true) {
        this.assertAllowed(d.SelectBuilderOperation.SQL_CALC_FOUND_ROWS);

        return new SelectBuilder(
            spread(
                this.data,
                { sqlCalcFoundRows : sqlCalcFoundRows }
            ),
            this.extraData,
        ) as any;
    }

    //GROUP BY CLAUSE
    //Replaces
    groupBy<GroupByCallbackT extends GroupByCallback<ISelectBuilder<DataT>>> (
        groupByCallback : GroupByCallbackT
    ) {
        return null as any;
    };
    //Appends
    appendGroupBy<GroupByCallbackT extends GroupByCallback<ISelectBuilder<DataT>>> (
        groupByCallback : GroupByCallbackT
    ) {
        return null as any;
    };

    //REMOVES GROUP BY
    unsetGroupBy () {
        return new SelectBuilder(
            spread(
                this.data,
                { groupByTuple : undefined }
            ),
            this.extraData,
        ) as any;
    };

    //HAVING CLAUSE
    having<HavingCallbackT extends HavingCallback<ISelectBuilder<DataT>>> (
        havingCallback : HavingCallbackT
    ) {
        return null as any;
    };
    //Appends
    andHaving<HavingCallbackT extends HavingCallback<ISelectBuilder<DataT>>> (
        havingCallback : HavingCallbackT
    ) {
        return null as any;
    };

    //ORDER BY CLAUSE
    //Replaces
    orderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) {
        return null as any;
    };
    //Appends
    appendOrderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) {
        return null as any;
    };

    //REMOVES ORDER BY
    unsetOrderBy () {
        return new SelectBuilder(
            spread(
                this.data,
                { orderByTuple : undefined }
            ),
            this.extraData,
        ) as any;
    };

    //LIMIT CLAUSE
    limit<RowCountT extends number> (rowCount : RowCountT) {
        return null as any;
    };

    //OFFSET CLAUSE
    offset<OffsetT extends number> (offset : OffsetT) {
        return null as any;
    };

    //REMOVES LIMIT
    unsetLimit () {
        return new SelectBuilder(
            spread(
                this.data,
                { limit : undefined }
            ),
            this.extraData,
        ) as any;
    };

    //WIDEN CLAUSE
    widen<
        TypeWidenCallbackT extends TypeWidenCallback<ISelectBuilder<DataT>>,
        WidenT
    > (
        typeWidenCallback : TypeWidenCallbackT,
        assertWidened : sd.AssertFunc<WidenT>
    ) {
        return null as any;
    };

    //UNION CLAUSE
    union<SelectBuilderT extends ISelectBuilder<{
        allowed : any,
        columnReferences : any,
        joins : any,
        selectReferences : any,
        selectTuple : any,
        distinct : any,
        //Technically, not allowed to use SQL_CALC_FOUND_ROWS here
        sqlCalcFoundRows : any,
        groupByTuple : any,
        orderByTuple : any,
        limit : any,
        unionOrderByTuple : any,
        unionLimit : any,
    }>> (selectBuilder : SelectBuilderT) {
        return null as any;
    };

    //UNION ORDER BY CLAUSE
    //Replaces
    unionOrderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) {
        return null as any;
    };
    //Appends
    appendUnionOrderBy<OrderByCallbackT extends OrderByCallback<ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) {
        return null as any;
    };

    //REMOVES UNION ORDER BY
    unsetUnionOrderBy () {
        return new SelectBuilder(
            spread(
                this.data,
                { unionOrderByTuple : undefined }
            ),
            this.extraData,
        ) as any;
    };

    //UNION LIMIT CLAUSE
    unionLimit<RowCountT extends number> (rowCount : RowCountT) {
        return null as any;
    };

    //UNION OFFSET CLAUSE
    unionOffset<OffsetT extends number> (offset : OffsetT) {
        return null as any;
    };

    //REMOVES UNION LIMIT
    unsetUnionLimit () {
        return new SelectBuilder(
            spread(
                this.data,
                { unionLimit : undefined }
            ),
            this.extraData,
        ) as any;
    };

    //AS CLAUSE
    as<AliasT extends string> (alias : AliasT) {
        this.assertAllowed(d.SelectBuilderOperation.AS);
        return null as any;
    };

    querify () {
        return null as any;
    }
}

export const from : d.CreateSelectBuilderDelegate = (
    <TableT extends d.AnyAliasedTable> (table : TableT) => {
        return new SelectBuilder({
            allowed : [
                d.SelectBuilderOperation.JOIN,
                d.SelectBuilderOperation.NARROW,
                d.SelectBuilderOperation.WHERE,
                d.SelectBuilderOperation.SELECT,
                d.SelectBuilderOperation.DISTINCT,
                d.SelectBuilderOperation.SQL_CALC_FOUND_ROWS,
                d.SelectBuilderOperation.GROUP_BY,
                d.SelectBuilderOperation.HAVING,
                d.SelectBuilderOperation.ORDER_BY,
                d.SelectBuilderOperation.LIMIT,
                d.SelectBuilderOperation.OFFSET,
                d.SelectBuilderOperation.UNION_ORDER_BY,
                d.SelectBuilderOperation.UNION_LIMIT,
                d.SelectBuilderOperation.UNION_OFFSET,
            ],
            columnReferences : tableToReference(table),
            joins : [check<d.Join<d.TableAlias<TableT>, false>>({
                alias : table.alias,
                nullable : false
            })],
            selectReferences : {},
            selectTuple : undefined,
            distinct : false,
            sqlCalcFoundRows : false,
            groupByTuple : undefined,
            orderByTuple : undefined,
            limit : undefined,
            unionOrderByTuple : undefined,
            unionLimit : undefined,
        }, {});
    }
);
