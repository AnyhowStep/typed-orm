import * as d from "../declaration";
import * as sd from "schema-decorator";
import {tableToReference} from "./table-operation";
import * as tuple from "./tuple";
import {spread, check} from "@anyhowstep/type-util";
import {getJoinFrom, getJoinTo, toNullableJoinTuple} from "./join";
import {toNullableColumnReferences, replaceColumnOfReference, combineReferences} from "./column-references-operation";
import {and} from "./expr-logical";
import {isNull, isNotNull, eq} from "./expr-comparison";
import {Column} from "./column";
import {replaceColumnOfSelectTuple, selectTupleHasDuplicateColumn, selectTupleToReferences} from "./select";
import {SubSelectJoinTable} from "./sub-select-join-table";
import {ColumnExpr} from "./expr";

export interface ExtraSelectBuilderData {
    readonly narrowExpr? : d.IExpr<any, boolean>;
    readonly whereExpr? : d.IExpr<any, boolean>;
    readonly havingExpr? : d.IExpr<any, boolean>;
    readonly union? : d.ISelectBuilder<any>[];
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

    private enableOperation (toEnable : d.SelectBuilderOperation[]) {
        return this.data.allowed.concat(toEnable);
    }
    private disableOperation (toDisable : d.SelectBuilderOperation[]) {
        return this.data.allowed.filter((i) => {
            return toDisable.indexOf(i) < 0;
        });
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
                columnReferences : combineReferences(
                    this.data.columnReferences,
                    tableToReference(toTable)
                ),
                joins : tuple.push(this.data.joins, {
                    joinType : "INNER",
                    table : toTable,
                    nullable : false,
                    from : fromTuple,
                    to : toTuple,
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
                columnReferences : combineReferences(
                    toNullableColumnReferences(this.data.columnReferences),
                    tableToReference(toTable)
                ),
                joins : tuple.push(
                    toNullableJoinTuple(this.data.joins),
                    {
                        joinType : "RIGHT",
                        table : toTable,
                        nullable : false,
                        from : fromTuple,
                        to : toTuple,
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
                columnReferences : combineReferences(
                    this.data.columnReferences,
                    toNullableColumnReferences(tableToReference(toTable))
                ),
                joins : tuple.push(
                    this.data.joins,
                    {
                        joinType : "LEFT",
                        table : toTable,
                        nullable : true,
                        from : fromTuple,
                        to : toTuple,
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
                whereExpr : and(
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
            and(
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
            this.appendNarrowExpr(isNotNull(toReplace))
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
            this.appendNarrowExpr(isNull(toReplace))
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
            this.appendNarrowExpr(and(
                //Adding this so we don't compare against NULL
                isNotNull(toReplace),
                eq(toReplace, value) as any
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
            condition = and(
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
    private appendSelectTuple (newSelectTuple : d.Tuple<d.AnySelectTupleElement>) {
        if (this.data.selectTuple == undefined) {
            return newSelectTuple;
        } else {
            return tuple.concat(this.data.selectTuple, newSelectTuple);
        }
    }
    select<SelectCallbackT extends d.SelectCallback<d.ISelectBuilder<DataT>>> (
        selectCallback : SelectCallbackT
    ) {
        this.assertAllowed(d.SelectBuilderOperation.SELECT);

        const selectTuple = selectCallback(
            this.data.columnReferences,
            this as any
        );
        const newTuple = this.appendSelectTuple(selectTuple);

        if (selectTupleHasDuplicateColumn(newTuple)) {
            throw new Error(`Duplicate column found, try aliasing`);
        }

        return new SelectBuilder(
            spread(
                this.data,
                {
                    allowed : this.enableOperation([
                        d.SelectBuilderOperation.WIDEN,
                        d.SelectBuilderOperation.UNION,
                        d.SelectBuilderOperation.AS
                    ]),
                    selectReferences : combineReferences(
                        this.data.selectReferences,
                        //We don't need to convert the entire newTuple to references
                        //Since part of newTuple was already converted before
                        selectTupleToReferences(selectTuple),
                    ),
                    selectTuple : newTuple,
                }
            ),
            this.extraData
        ) as any;
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
    groupBy<GroupByCallbackT extends d.GroupByCallback<d.ISelectBuilder<DataT>>> (
        groupByCallback : GroupByCallbackT
    ) {
        this.assertAllowed(d.SelectBuilderOperation.GROUP_BY);

        const tuple = groupByCallback(combineReferences(
            this.data.columnReferences,
            this.data.selectReferences
        ), this as any);
        return new SelectBuilder(
            spread(
                this.data,
                {
                    groupByTuple : tuple
                }
            ),
            this.extraData
        ) as any;
    };
    //Appends
    appendGroupBy<GroupByCallbackT extends d.GroupByCallback<d.ISelectBuilder<DataT>>> (
        groupByCallback : GroupByCallbackT
    ) {
        this.assertAllowed(d.SelectBuilderOperation.GROUP_BY);

        const tuple = groupByCallback(combineReferences(
            this.data.columnReferences,
            this.data.selectReferences
        ), this as any);
        return new SelectBuilder(
            spread(
                this.data,
                {
                    groupByTuple : (this.data.groupByTuple == undefined) ?
                        tuple :
                        this.data.groupByTuple.concat(tuple)
                }
            ),
            this.extraData
        ) as any;
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
    having<HavingCallbackT extends d.HavingCallback<d.ISelectBuilder<DataT>>> (
        havingCallback : HavingCallbackT
    ) {
        this.assertAllowed(d.SelectBuilderOperation.HAVING);

        let condition : d.IExpr<any, boolean> = havingCallback(
            combineReferences(
                this.data.columnReferences,
                this.data.selectReferences
            ),
            this as any
        );
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                havingExpr : condition,
            }
        ) as any;
    };
    //Appends
    andHaving<HavingCallbackT extends d.HavingCallback<d.ISelectBuilder<DataT>>> (
        havingCallback : HavingCallbackT
    ) {
        this.assertAllowed(d.SelectBuilderOperation.HAVING);

        let condition : d.IExpr<any, boolean> = havingCallback(
            spread(
                this.data.columnReferences,
                this.data.selectReferences
            ),
            this as any
        );
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                havingExpr : (this.extraData.havingExpr == undefined) ?
                    condition :
                    and(
                        this.extraData.havingExpr,
                        condition
                    ),
            }
        ) as any;
    };

    //ORDER BY CLAUSE
    //Replaces
    orderBy<OrderByCallbackT extends d.OrderByCallback<d.ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) {
        this.assertAllowed(d.SelectBuilderOperation.ORDER_BY);

        const tuple = orderByCallback(combineReferences(
            this.data.columnReferences,
            this.data.selectReferences
        ), this as any);
        return new SelectBuilder(
            spread(
                this.data,
                {
                    orderByTuple : tuple
                }
            ),
            this.extraData
        ) as any;
    };
    //Appends
    appendOrderBy<OrderByCallbackT extends d.OrderByCallback<d.ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) {
        this.assertAllowed(d.SelectBuilderOperation.ORDER_BY);

        const tuple = orderByCallback(combineReferences(
            this.data.columnReferences,
            this.data.selectReferences
        ), this as any);
        return new SelectBuilder(
            spread(
                this.data,
                {
                    orderByTuple : (this.data.orderByTuple == undefined) ?
                        tuple :
                        this.data.orderByTuple.concat(tuple)
                }
            ),
            this.extraData
        ) as any;
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
        this.assertAllowed(d.SelectBuilderOperation.LIMIT);

        return new SelectBuilder(
            spread(
                this.data,
                {
                    limit : (this.data.limit == undefined) ?
                        {
                            rowCount : rowCount,
                            offset : 0,
                        } :
                        {
                            rowCount : rowCount,
                            offset : this.data.limit.offset,
                        }
                }
            ),
            this.extraData,
        ) as any;
    };

    //OFFSET CLAUSE
    offset<OffsetT extends number> (offset : OffsetT) {
        this.assertAllowed(d.SelectBuilderOperation.OFFSET);

        return new SelectBuilder(
            spread(
                this.data,
                {
                    limit : (this.data.limit == undefined) ?
                        {
                            rowCount : d.ArbitraryRowCount,
                            offset : offset,
                        } :
                        {
                            rowCount : this.data.limit.rowCount,
                            offset : offset,
                        }
                }
            ),
            this.extraData,
        ) as any;
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
        TypeWidenCallbackT extends d.TypeWidenCallback<d.ISelectBuilder<DataT>>,
        WidenT
    > (
        typeWidenCallback : TypeWidenCallbackT,
        assertWidened : sd.AssertFunc<WidenT>
    ) {
        this.assertAllowed(d.SelectBuilderOperation.WIDEN);

        const column = typeWidenCallback(this.data.selectReferences);
        const newColumn = new Column(
            column.table,
            column.name,
            sd.or(
                assertWidened,
                column.assertDelegate
            )
        );

        return new SelectBuilder(
            spread(
                this.data,
                {
                    selectReferences : replaceColumnOfReference(this.data.selectReferences, newColumn),
                    selectTuple : (
                        this.data.selectTuple == undefined ?
                            undefined :
                            replaceColumnOfSelectTuple(this.data.selectTuple, newColumn)
                    ),
                }
            ),
            this.extraData
        ) as any;
    };

    //UNION CLAUSE
    union<SelectBuilderT extends d.ISelectBuilder<{
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
    }>> (other : SelectBuilderT) {
        this.assertAllowed(d.SelectBuilderOperation.UNION);

        if (this.data.selectTuple == undefined) {
            throw new Error(`Cannot UNION; SELECT clause missing on select`);
        }
        if (other.data.selectTuple == undefined) {
            throw new Error(`Cannot UNION; SELECT clause missing on sub-select`);
        }
        if (this.data.selectTuple.length != other.data.selectTuple.length) {
            throw new Error(`Cannot UNION; Column count mismatch`);
        }

        return new SelectBuilder(
            spread(
                this.data,
                {
                    allowed : this.disableOperation([
                        d.SelectBuilderOperation.NARROW,
                        d.SelectBuilderOperation.SELECT
                    ]),
                }
            ),
            {
                ...this.extraData,
                union : (this.extraData.union == undefined) ?
                    [other] :
                    this.extraData.union.concat([other]),
            }
        ) as any;
    };

    //UNION ORDER BY CLAUSE
    //Replaces
    unionOrderBy<OrderByCallbackT extends d.OrderByCallback<d.ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) {
        this.assertAllowed(d.SelectBuilderOperation.UNION_ORDER_BY);

        const tuple = orderByCallback(combineReferences(
            this.data.columnReferences,
            this.data.selectReferences
        ), this as any);
        return new SelectBuilder(
            spread(
                this.data,
                {
                    unionOrderByTuple : tuple
                }
            ),
            this.extraData
        ) as any;
    };
    //Appends
    appendUnionOrderBy<OrderByCallbackT extends d.OrderByCallback<d.ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) {
        this.assertAllowed(d.SelectBuilderOperation.UNION_ORDER_BY);

        const tuple = orderByCallback(combineReferences(
            this.data.columnReferences,
            this.data.selectReferences
        ), this as any);
        return new SelectBuilder(
            spread(
                this.data,
                {
                    unionOrderByTuple : (this.data.unionOrderByTuple == undefined) ?
                        tuple :
                        this.data.unionOrderByTuple.concat(tuple)
                }
            ),
            this.extraData
        ) as any;
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
        this.assertAllowed(d.SelectBuilderOperation.UNION_LIMIT);

        return new SelectBuilder(
            spread(
                this.data,
                {
                    unionLimit : (this.data.unionLimit == undefined) ?
                        {
                            rowCount : rowCount,
                            offset : 0,
                        } :
                        {
                            rowCount : rowCount,
                            offset : this.data.unionLimit.offset,
                        }
                }
            ),
            this.extraData,
        ) as any;
    };

    //UNION OFFSET CLAUSE
    unionOffset<OffsetT extends number> (offset : OffsetT) {
        this.assertAllowed(d.SelectBuilderOperation.UNION_OFFSET);

        return new SelectBuilder(
            spread(
                this.data,
                {
                    unionLimit : (this.data.unionLimit == undefined) ?
                        {
                            rowCount : d.ArbitraryRowCount,
                            offset : offset,
                        } :
                        {
                            rowCount : this.data.unionLimit.rowCount,
                            offset : offset,
                        }
                }
            ),
            this.extraData,
        ) as any;
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

        return new SubSelectJoinTable(
            alias,
            this as any
        ) as any;
    };

    querify () {
        //TODO a proper query string builder?
        const buffer : string[] = [];
        buffer.push("(");
        buffer.push("SELECT");
        if (this.data.distinct) {
            buffer.push("DISTINCT");
        }
        if (this.data.sqlCalcFoundRows) {
            buffer.push("SQL_CALC_FOUND_ROWS");
        }
        if (this.data.selectTuple != undefined) {
            buffer.push(this.data.selectTuple.map((element) => {
                if (element instanceof ColumnExpr) {
                    return `\t${element.querify()}`;
                } else if (element instanceof Column) {
                    return `\t${element.querify()}`;
                } else if (element instanceof Object) {
                    const names = Object.keys(element).sort();
                    return names.map((n) => {
                        return `\t${element[n].querify()}`
                    }).join(",\n");
                } else {
                    throw new Error(`Unknown select tuple element (${typeof element})${element}`);
                }
            }).join(",\n"));
        }
        buffer.push("FROM");
        buffer.push(`\t${this.data.joins[0].table.querify()}`);
        for (let i=1; i<this.data.joins.length; ++i) {
            const join = this.data.joins[i];
            buffer.push(`${join.joinType} JOIN`);
            buffer.push(`\t${join.table.querify()}`);
            buffer.push("ON");
            if (join.from == undefined || join.to == undefined || join.from.length != join.to.length) {
                throw new Error(`Invalid JOIN ${i}, ${join.joinType} JOIN ${join.table.alias}`);
            }
            const conditionBuffer : string[] = [];
            for (let column=0; column<join.from.length; ++column) {
                const a = join.from[column];
                const b = join.to[column];
                conditionBuffer.push(`\t${a.querify()} = ${b.querify()}`);
            }
            buffer.push(conditionBuffer.join(" AND\n"));
        }
        if (this.extraData.whereExpr != undefined) {
            buffer.push("WHERE");
            buffer.push(this.extraData.whereExpr.querify());
        }
        if (this.data.groupByTuple != undefined) {
            buffer.push("GROUP BY");
            buffer.push(this.data.groupByTuple
                .map(e => `\t${e.querify()}`)
                .join(", ")
            );
        }
        if (this.extraData.havingExpr != undefined) {
            buffer.push("HAVING");
            buffer.push(this.extraData.havingExpr.querify());
        }
        if (this.data.orderByTuple != undefined) {
            buffer.push("ORDER BY");
            buffer.push(this.data.orderByTuple
                .map(e => {
                    if (e instanceof Column) {
                        return `\t${e.querify()} ASC`;
                    } else {
                        const sort = e[1] ? "ASC" : "DESC";
                        return `\t${e.querify()} ${sort}`;
                    }
                })
                .join(", ")
            );
        }
        if (this.data.limit != undefined) {
            buffer.push("LIMIT");
            buffer.push(`\t${this.data.limit.rowCount}`);
            buffer.push("OFFSET");
            buffer.push(`\t${this.data.limit.offset}`);
        }
        buffer.push(")");
        if (this.extraData.union != undefined) {
            for (let u of this.extraData.union) {
                buffer.push("UNION (");
                buffer.push(u.querify());
                buffer.push(")");
            }
        }
        if (this.data.unionOrderByTuple != undefined) {
            buffer.push("ORDER BY");
            buffer.push(this.data.unionOrderByTuple
                .map(e => {
                    if (e instanceof Column) {
                        return `\t${e.querify()} ASC`;
                    } else {
                        const sort = e[1] ? "ASC" : "DESC";
                        return `\t${e.querify()} ${sort}`;
                    }
                })
                .join(", ")
            );
        }
        if (this.data.unionLimit != undefined) {
            buffer.push("LIMIT");
            buffer.push(`\t${this.data.unionLimit.rowCount}`);
            buffer.push("OFFSET");
            buffer.push(`\t${this.data.unionLimit.offset}`);
        }
        return buffer.join("\n");
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
            joins : [check<d.Join<"FROM", TableT, false>>({
                joinType : "FROM",
                table : table,
                nullable : false,
                from : undefined,
                to : undefined,
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
