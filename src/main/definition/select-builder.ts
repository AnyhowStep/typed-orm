import * as d from "../declaration";
import * as sd from "schema-decorator";
import {tableToReference} from "./table-operation";
import * as tuple from "./tuple";
import {spread, check} from "@anyhowstep/type-util";
import {getJoinFrom, getJoinTo, toNullableJoinTuple} from "./join";
import {toNullableColumnReferences, replaceColumnOfReference, combineReferences, columnReferencesToSchema} from "./column-references-operation";
import {and} from "./expr-logical";
import {isNull, isNotNull, eq} from "./expr-comparison";
import {Column} from "./column";
import {replaceColumnOfSelectTuple, selectTupleHasDuplicateColumn, selectTupleToReferences} from "./select";
import {SubSelectJoinTable} from "./sub-select-join-table";
import {ColumnExpr, Expr} from "./expr";
import {Database} from "./Database";
import {StringBuilder} from "./StringBuilder";
import * as e from "./expr-library";
import * as mysql from "typed-mysql";

export interface ExtraSelectBuilderData {
    readonly db : Database;
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
                        d.SelectBuilderOperation.AS,
                        d.SelectBuilderOperation.FETCH,
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
            //For GROUP BY, we replace the selectReferences with columnReferences
            this.data.selectReferences,
            this.data.columnReferences
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
            //For GROUP BY, we replace the selectReferences with columnReferences
            this.data.selectReferences,
            this.data.columnReferences
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
                column.assertDelegate,
                assertWidened
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

    querify (sb : d.IStringBuilder) {
        const hasUnion = (
            this.extraData.union != undefined ||
            this.data.unionOrderByTuple != undefined ||
            this.data.unionLimit != undefined
        );
        if (hasUnion) {
            sb.appendLine("(");
            sb.indent();
        }

        sb.append("SELECT");
        if (this.data.distinct) {
            sb.append(" DISTINCT");
        }
        if (this.data.sqlCalcFoundRows) {
            sb.append(" SQL_CALC_FOUND_ROWS");
        }
        sb.appendLine();

        sb.scope((sb) => {
            if (this.data.selectTuple != undefined) {
                sb.map(this.data.selectTuple, (sb, element) => {
                    if (element instanceof ColumnExpr) {
                        element.querify(sb);
                    } else if (element instanceof Column) {
                        //const str = element.as(element.name).querify();
                        //return `\t${str}`;
                        const alias = Database.EscapeId(`${element.table}--${element.name}`);
                        element.querify(sb);
                        sb.append(` AS ${alias}`);

                    } else if (element instanceof Object) {
                        const names = Object.keys(element).sort();
                        sb.map(names, (sb, name) => {
                            const sub = element[name];
                            const alias = Database.EscapeId(`${sub.table}--${sub.name}`);
                            sub.querify(sb);
                            sb.append(` AS ${alias}`);
                        }, ",\n");
                    } else {
                        throw new Error(`Unknown select tuple element (${typeof element})${element}`);
                    }
                }, ",\n");
            }
        });
        sb.appendLine("FROM");
        sb.scope((sb) => {
            this.data.joins[0].table.querify(sb);
        });
        sb.map(
            this.data.joins.slice(1),
            (sb, join, index) => {
                sb.appendLine(`${join.joinType} JOIN`);
                sb.scope((sb) => {
                    join.table.querify(sb);
                });
                sb.appendLine("ON");
                sb.scope((sb) => {
                    if (join.from == undefined || join.to == undefined || join.from.length != join.to.length) {
                        throw new Error(`Invalid JOIN ${index}, ${join.joinType} JOIN ${join.table.alias}`);
                    }
                    const fromArr = join.from;
                    const toArr = join.to;
                    sb.map(
                        fromArr,
                        (sb, from, index) => {
                            const to = toArr[index];
                            from.querify(sb);
                            sb.append(" = ");
                            to.querify(sb);
                        },
                        " AND\n"
                    );
                });
            }
        )
        if (this.extraData.whereExpr != undefined) {
            sb.appendLine("WHERE");
            const whereExpr = this.extraData.whereExpr;
            sb.scope((sb) => {
                whereExpr.querify(sb)
            });
        }
        if (this.data.groupByTuple != undefined) {
            sb.appendLine("GROUP BY");
            const groupByTuple = this.data.groupByTuple;
            sb.scope((sb) => {
                sb.map(
                    groupByTuple,
                    (sb, e) => {
                        e.querify(sb);
                    },
                    ",\n"
                );
            });
        }
        if (this.extraData.havingExpr != undefined) {
            sb.appendLine("HAVING");
            const havingExpr = this.extraData.havingExpr;
            sb.scope((sb) => {
                havingExpr.querify(sb)
            });
        }
        if (this.data.orderByTuple != undefined) {
            sb.appendLine("ORDER BY");
            const orderByTuple = this.data.orderByTuple;
            sb.scope((sb) => {
                sb.map(
                    orderByTuple,
                    (sb, e) => {
                        if ((e instanceof Column) || (e instanceof Expr)) {
                            e.querify(sb);
                            sb.append(" ASC");
                        } else {
                            e[0].querify(sb);
                            sb.append(e[1] ? " ASC" : " DESC");
                        }
                    },
                    ",\n"
                )
            });
        }
        if (this.data.limit != undefined) {
            const limit = this.data.limit;
            sb.appendLine("LIMIT")
                .scope((sb) => {
                    sb.append(limit.rowCount.toString());
                });
            sb.appendLine("OFFSET")
                .scope((sb) => {
                    sb.append(limit.offset.toString());
                });
        }

        if (hasUnion) {
            sb.unindent();
            sb.appendLine(")");
        }

        if (this.extraData.union != undefined) {
            sb.map(
                this.extraData.union,
                (sb, u) => {
                    sb.appendLine("UNION");
                    sb.appendLine("(");
                    sb.scope((sb) => {
                        u.querify(sb);
                    });
                    sb.appendLine(")");
                },
                "\n"
            );
        }
        if (this.data.unionOrderByTuple != undefined) {
            sb.appendLine("ORDER BY");
            const unionOrderByTuple = this.data.unionOrderByTuple;
            sb.scope((sb) => {
                sb.map(
                    unionOrderByTuple,
                    (sb, e) => {
                        if ((e instanceof Column) || (e instanceof Expr)) {
                            e.querify(sb);
                            sb.append(" ASC");
                        } else {
                            e[0].querify(sb);
                            sb.append(e[1] ? " ASC" : " DESC");
                        }
                    },
                    ",\n"
                )
            });
        }
        if (this.data.unionLimit != undefined) {
            const unionLimit = this.data.unionLimit;
            sb.appendLine("LIMIT")
                .scope((sb) => {
                    sb.append(unionLimit.rowCount.toString());
                });
            sb.appendLine("OFFSET")
                .scope((sb) => {
                    sb.append(unionLimit.offset.toString());
                });
        }
        return sb.toString();
    }

    //FETCH CLAUSE
    private schema : sd.AssertDelegate<d.ColumnReferencesToSchema<DataT["selectReferences"]>>|undefined = undefined;
    private getSchema () {
        if (this.schema == undefined) {
            this.schema = columnReferencesToSchema<DataT["selectReferences"]>(this.data.selectReferences);
        }
        return this.schema;
    }
    private readonly processRow = (row : any) => {
        const result = {} as any;
        for (let mangledName in row) {
            const names  = mangledName.split("--");
            const table  = names[0];
            const column = names[1];
            if (result[table] == undefined) {
                result[table] = {};
            }
            result[table][column] = row[mangledName];
        }
        return this.getSchema()("row", result)
    };
    private getQuery () {
        const sb = new StringBuilder();
        this.querify(sb);
        return sb.toString();
    }
    fetchAll () {
        this.assertAllowed(d.SelectBuilderOperation.FETCH);
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
                return Promise.all(raw.rows.map(this.processRow));
            }) as any;
    }
    fetchOne () {
        this.assertAllowed(d.SelectBuilderOperation.FETCH);
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
                if (raw.rows.length != 1) {
                    throw new Error(`Expected 1 row, received ${raw.rows.length}`);
                }
                return this.processRow(raw.rows[0]);
            }) as any;
    }
    fetchZeroOrOne () {
        this.assertAllowed(d.SelectBuilderOperation.FETCH);
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
                if (raw.rows.length > 1) {
                    throw new Error(`Expected zero or one rows, received ${raw.rows.length}`);
                }
                if (raw.rows.length == 0) {
                    return undefined;
                } else {
                    return this.processRow(raw.rows[0]);
                }
            }) as any;
    }
    fetchValue () {
        this.assertAllowed(d.SelectBuilderOperation.FETCH);
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
                if (raw.rows.length != 1) {
                    throw new Error(`Expected 1 row, received ${raw.rows.length}`);
                }
                if (raw.fields.length != 1) {
                    throw new Error(`Expected 1 field, received ${raw.fields.length}`);
                }
                const row = this.processRow(raw.rows[0]);
                const names = raw.fields[0].name.split("--");
                return row[names[0]][names[1]];
            }) as any;
    }
    fetchValueOrUndefined () {
        this.assertAllowed(d.SelectBuilderOperation.FETCH);
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
                if (raw.rows.length == 0) {
                    return undefined;
                }

                if (raw.rows.length > 1) {
                    throw new Error(`Expected zero or one row, received ${raw.rows.length}`);
                }
                if (raw.fields.length != 1) {
                    throw new Error(`Expected 1 field, received ${raw.fields.length}`);
                }
                const row = this.processRow(raw.rows[0]);
                const names = raw.fields[0].name.split("--");
                return row[names[0]][names[1]];
            }) as any;
    }
    fetchValueArray () {
        this.assertAllowed(d.SelectBuilderOperation.FETCH);
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
                if (raw.fields.length != 1) {
                    throw new Error(`Expected 1 field, received ${raw.fields.length}`);
                }
                const names  = raw.fields[0].name.split("--");
                const table  = names[0];
                const column = names[1];

                return Promise.all(raw.rows
                    .map(this.processRow)
                    .map(row => row[table][column])
                );
            }) as any;
    }
    count () : Promise<number> {
        if (this.data.unionLimit != undefined) {
            return this.unsetUnionLimit()
                .count();
        }
        if (this.data.limit != undefined && this.extraData.union == undefined) {
            return this.unsetLimit()
                .count();
        }
        //We should now have one of the following,
        //+ (SELECT ...)
        //+ (SELECT ... LIMIT) UNION (SELECT ...)
        //+ (SELECT ...) UNION (SELECT ...)
        //+ (... FROM ...); If count() is called before select()

        if (this.data.selectTuple == undefined) {
            //We have not called select() yet
            return this.select(() => [e.COUNT_ALL.as("count")])
                .fetchValue();
        } else {
            //Already called select
            return this.extraData.db.getNaturalNumber(`
                SELECT
                    COUNT(*) AS count
                FROM
                    (${this.getQuery()}) AS tmp
            `);
        }
    }
    paginate (rawPaginationArgs : d.RawPaginationArgs={}) {
        this.assertAllowed(d.SelectBuilderOperation.FETCH);

        const paginationArgs = mysql.toPaginationArgs(
            rawPaginationArgs,
            this.extraData.db.getPaginationConfiguration()
        );

        return this.count()
            .then((itemsFound) => {
                const pagesFound = (
                    Math.floor(itemsFound/paginationArgs.itemsPerPage) +
                    (
                        (itemsFound%paginationArgs.itemsPerPage == 0) ?
                            0 : 1
                    )
                );
                if (this.extraData.union == undefined) {
                    return this
                        .limit(paginationArgs.itemsPerPage)
                        .offset(mysql.getPaginationStart(paginationArgs))
                        .fetchAll()
                        .then((rows : any[]) => {
                            return {
                                info : {
                                    itemsFound : itemsFound,
                                    pagesFound : pagesFound,
                                    ...paginationArgs,
                                },
                                rows : rows,
                            };
                        });
                } else {
                    return this
                        .unionLimit(paginationArgs.itemsPerPage)
                        .unionOffset(mysql.getPaginationStart(paginationArgs))
                        .fetchAll()
                        .then((rows : any[]) => {
                            return {
                                info : {
                                    itemsFound : itemsFound,
                                    pagesFound : pagesFound,
                                    ...paginationArgs,
                                },
                                rows : rows,
                            };
                        });
                }
            }) as any;
    }
}

export function newCreateSelectBuilderDelegate (db : Database) : d.CreateSelectBuilderDelegate {
    return <TableT extends d.AnyAliasedTable> (table : TableT) => {
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
        }, {
            db : db,
        });
    }
}
