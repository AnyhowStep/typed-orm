import * as d from "../declaration";
import * as sd from "schema-decorator";
import {tableToReference} from "./table-operation";
import * as tuple from "./tuple";
import {spread, check} from "@anyhowstep/type-util";
import {getJoinFrom, getJoinTo, toNullableJoinTuple, getJoinToUsingFrom, replaceColumnOfJoinTuple, Join} from "./join";
import {toNullableColumnReferences, replaceColumnOfReference, combineReferences, columnReferencesToSchemaWithJoins} from "./column-references-operation";
import {and} from "./expr-logical";
import {isNull, isNotNull, eq} from "./expr-comparison";
import {Column} from "./column";
import {replaceColumnOfSelectTuple, selectTupleHasDuplicateColumn, selectTupleToReferences, selectAllReference, joinTupleToSelectTuple} from "./select";
import {SubSelectJoinTable} from "./sub-select-join-table";
import {ColumnExpr, Expr} from "./expr";
import {Database} from "./Database";
import {StringBuilder} from "./StringBuilder";
import * as e from "./expr-library";
import * as mysql from "typed-mysql";
import {toExpr} from "./expr-operation";
import {ConnectedDatabase} from "./ConnectedDatabase";

export const ArbitraryRowCount = 999999999;

export interface LimitData {
    readonly rowCount : number,
    readonly offset   : number,
}

export interface ExtraSelectBuilderData {
    readonly db : Database|ConnectedDatabase;
    readonly narrowExpr? : d.IExpr<any, boolean>;
    readonly whereExpr? : d.IExpr<any, boolean>;
    readonly havingExpr? : d.IExpr<any, boolean>;
    readonly union? : d.ISelectBuilder<any>[];

    readonly distinct : boolean,
    readonly sqlCalcFoundRows : boolean,
    readonly groupByTuple? : d.AnyGroupByTupleElement[],
    readonly orderByTuple? : d.AnyOrderByTupleElement[],
    readonly limit? : LimitData,
    readonly unionOrderByTuple? : d.AnyOrderByTupleElement[],
    readonly unionLimit? : LimitData,
}

export class SelectBuilder<DataT extends d.AnySelectBuilderData> implements d.ISelectBuilder<DataT> {
    readonly data : DataT;
    readonly extraData : ExtraSelectBuilderData;

    public constructor (data : DataT, extraData : ExtraSelectBuilderData) {
        this.data = data;
        this.extraData = extraData;
    }

    public assertAfterSelect () {
        if (!this.data.hasSelect) {
            throw new Error(`SELECT clause required`);
        }
    }
    public assertBeforeUnion () {
        if (this.data.hasUnion) {
            throw new Error(`Must be before UNION clause`);
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
        FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"]>
    > (
        toTable : ToTableT,
        from : FromTupleT,
        to : d.JoinToTupleCallback<ToTableT, d.JoinFromTupleOfCallback<FromTupleT>>
    ) {
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = getJoinFrom(this.data.columnReferences, from as any);
        const toTuple = getJoinTo(toTable, to);
        this.assertEqualLength(fromTuple, toTuple);

        return new SelectBuilder(spread(
            this.data,
            {
                columnReferences : combineReferences(
                    this.data.columnReferences,
                    tableToReference(toTable)
                ),
                joins : {
                    ...this.data.joins,
                    [toTable.alias] : new Join(
                        "INNER",
                        joinsLength(this.data.joins),
                        toTable,
                        tableToReference(toTable),
                        false,
                        fromTuple,
                        toTuple
                    )
                },
            }
        ), this.extraData) as any;
    }
    rightJoin<
        ToTableT extends d.AnyAliasedTable,
        FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"]>
    > (
        toTable : ToTableT,
        from : FromTupleT,
        to : d.JoinToTupleCallback<ToTableT, d.JoinFromTupleOfCallback<FromTupleT>>
    ) {
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = getJoinFrom(this.data.columnReferences, from as any);
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
                        columnReferences : tableToReference(toTable),
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
        FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"]>
    > (
        toTable : ToTableT,
        from : FromTupleT,
        to : d.JoinToTupleCallback<ToTableT, d.JoinFromTupleOfCallback<FromTupleT>>
    ) {
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = getJoinFrom(this.data.columnReferences, from as any);
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
                        //Not nullable reference!
                        columnReferences : tableToReference(toTable),
                        nullable : true,
                        from : fromTuple,
                        to : toTuple,
                    }
                ),
            }
        ), this.extraData) as any;
    };

    //JOIN USING CLAUSE
    joinUsing<
        ToTableT extends d.AnyAliasedTable,
        FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"]>
    > (
        toTable : ToTableT,
        from : FromTupleT
    ) {
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = getJoinFrom(this.data.columnReferences, from as any);
        const toTuple = getJoinToUsingFrom(toTable, fromTuple);
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
                    columnReferences : tableToReference(toTable),
                    nullable : false,
                    from : fromTuple,
                    to : toTuple,
                }),
            }
        ), this.extraData) as any;
    }
    rightJoinUsing<
        ToTableT extends d.AnyAliasedTable,
        FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"]>
    > (
        toTable : ToTableT,
        from : FromTupleT
    ) {
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = getJoinFrom(this.data.columnReferences, from as any);
        const toTuple = getJoinToUsingFrom(toTable, fromTuple);
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
                        columnReferences : tableToReference(toTable),
                        nullable : false,
                        from : fromTuple,
                        to : toTuple,
                    }
                ),
            }
        ), this.extraData) as any;
    };
    leftJoinUsing<
        ToTableT extends d.AnyAliasedTable,
        FromTupleT extends d.JoinFromTupleCallback<DataT["columnReferences"]>
    > (
        toTable : ToTableT,
        from : FromTupleT
    ) {
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = getJoinFrom(this.data.columnReferences, from as any);
        const toTuple = getJoinToUsingFrom(toTable, fromTuple);
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
                        columnReferences : tableToReference(toTable),
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
                joins : replaceColumnOfJoinTuple(
                    this.data.joins,
                    newColumn
                ),
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
    whereIsNotNull<TypeNarrowCallbackT extends d.TypeNarrowCallback<DataT["columnReferences"]>> (
        typeNarrowCallback : TypeNarrowCallbackT
    ) {
        this.assertBeforeUnion();

        const toReplace = typeNarrowCallback(this.data.columnReferences)
        if (!(toReplace instanceof Column)) {
            throw new Error(`Expected a column`);
        }
        return new SelectBuilder(
            this.appendNarrowData(new Column(
                toReplace.table,
                toReplace.name,
                sd.notOptional(toReplace.assertDelegate)
            )),
            this.appendNarrowExpr(isNotNull(toReplace))
        ) as any;
    };
    whereIsNull<TypeNarrowCallbackT extends d.TypeNarrowCallback<DataT["columnReferences"]>> (
        typeNarrowCallback : TypeNarrowCallbackT
    ) {
        this.assertBeforeUnion();

        const toReplace = typeNarrowCallback(this.data.columnReferences);
        if (!(toReplace instanceof Column)) {
            throw new Error(`Expected a column`);
        }
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
        TypeNarrowCallbackT extends d.TypeNarrowCallback<DataT["columnReferences"]>
    > (
        value : ConstT,
        typeNarrowCallback : TypeNarrowCallbackT
    ) {
        this.assertBeforeUnion();

        const toReplace = typeNarrowCallback(this.data.columnReferences)
        if (!(toReplace instanceof Column)) {
            throw new Error(`Expected a column`);
        }

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
        );
    };
    //Appends
    andWhere<WhereCallbackT extends d.WhereCallback<d.ISelectBuilder<DataT>>> (
        whereCallback : WhereCallbackT
    ) {
        let condition : d.IExpr<any, boolean> = whereCallback(
            this.data.columnReferences,
            this as any
        );
        return new SelectBuilder(
            this.data,
            this.appendWhereExpr(condition)
        );
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
        this.assertBeforeUnion();

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
                    hasSelect : true,
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
    selectAll () {
        this.assertBeforeUnion();

        if (this.data.selectTuple != undefined) {
            throw new Error("selectAll() must be called before select()");
        }

        return new SelectBuilder(
            spread(
                this.data,
                {
                    hasSelect : true,
                    selectReferences : selectAllReference(this.data.columnReferences),
                    selectTuple : joinTupleToSelectTuple(this.data.joins),
                }
            ),
            this.extraData
        ) as any;
    };

    //DISTINCT CLAUSE
    //distinct ();
    //distinct<DistinctT extends boolean> (distinct : DistinctT);
    distinct (distinct : boolean = true) {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                distinct : distinct
            }
        );
    }

    //SQL_CALC_FOUND_ROWS CLAUSE
    //sqlCalcFoundRows ();
    //sqlCalcFoundRows<SqlCalcFoundRowsT extends boolean> (sqlCalcFoundRows : SqlCalcFoundRowsT);
    sqlCalcFoundRows (sqlCalcFoundRows : boolean = true) {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                sqlCalcFoundRows : sqlCalcFoundRows
            }
        );
    }

    //GROUP BY CLAUSE
    //Replaces
    groupBy<GroupByCallbackT extends d.GroupByCallback<d.ISelectBuilder<DataT>>> (
        groupByCallback : GroupByCallbackT
    ) {
        const tuple = groupByCallback(
            combineReferences(
                //For GROUP BY, we replace the selectReferences with columnReferences
                this.data.selectReferences,
                this.data.columnReferences
            ),
            this as any
        );
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                groupByTuple : tuple
            }
        );
    };
    //Appends
    appendGroupBy<GroupByCallbackT extends d.GroupByCallback<d.ISelectBuilder<DataT>>> (
        groupByCallback : GroupByCallbackT
    ) {
        const tuple = groupByCallback(
            combineReferences(
                //For GROUP BY, we replace the selectReferences with columnReferences
                this.data.selectReferences,
                this.data.columnReferences
            ),
            this as any
        );
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                groupByTuple : (this.extraData.groupByTuple == undefined) ?
                    tuple :
                    this.extraData.groupByTuple.concat(tuple)
            }
        );
    };

    //REMOVES GROUP BY
    unsetGroupBy () {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                groupByTuple : undefined
            }
        );
    };

    //HAVING CLAUSE
    having<HavingCallbackT extends d.HavingCallback<d.ISelectBuilder<DataT>>> (
        havingCallback : HavingCallbackT
    ) {
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
        );
    };
    //Appends
    andHaving<HavingCallbackT extends d.HavingCallback<d.ISelectBuilder<DataT>>> (
        havingCallback : HavingCallbackT
    ) {
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
        );
    };

    //ORDER BY CLAUSE
    //Replaces
    orderBy<OrderByCallbackT extends d.OrderByCallback<d.ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) {
        const tuple = orderByCallback(combineReferences(
            this.data.columnReferences,
            this.data.selectReferences
        ), this as any);
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                orderByTuple : tuple
            },
        );
    };
    //Appends
    appendOrderBy<OrderByCallbackT extends d.OrderByCallback<d.ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) {
        const tuple = orderByCallback(combineReferences(
            this.data.columnReferences,
            this.data.selectReferences
        ), this as any);
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                orderByTuple : (this.extraData.orderByTuple == undefined) ?
                    tuple :
                    this.extraData.orderByTuple.concat(tuple)
            }
        );
    };

    //REMOVES ORDER BY
    unsetOrderBy () {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                orderByTuple : undefined
            }
        );
    };

    //LIMIT CLAUSE
    limit (rowCount : number) {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                limit : (this.extraData.limit == undefined) ?
                    {
                        rowCount : rowCount,
                        offset : 0,
                    } :
                    {
                        rowCount : rowCount,
                        offset : this.extraData.limit.offset,
                    }
            }
        );
    };

    //OFFSET CLAUSE
    offset (offset : number) {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                limit : (this.extraData.limit == undefined) ?
                    {
                        rowCount : ArbitraryRowCount,
                        offset : offset,
                    } :
                    {
                        rowCount : this.extraData.limit.rowCount,
                        offset : offset,
                    }
            }
        );
    };

    //REMOVES LIMIT
    unsetLimit () {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                limit : undefined
            }
        );
    };

    //WIDEN CLAUSE
    widen<
        TypeWidenCallbackT extends d.TypeWidenCallback<DataT["selectReferences"]>,
        WidenT
    > (
        typeWidenCallback : TypeWidenCallbackT,
        assertWidened : sd.AssertFunc<WidenT>
    ) {
        this.assertAfterSelect();

        const column = typeWidenCallback(this.data.selectReferences);
        if (!(column instanceof Column)) {
            throw new Error(`Expected a column`);
        }
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
                    joins : replaceColumnOfJoinTuple(
                        this.data.joins,
                        newColumn
                    ),
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
        hasSelect : true,
        hasUnion : any,
        columnReferences : any,
        joins : any,
        selectReferences : any,
        selectTuple : any,
        aggregateCallback : any,

        __columnReferencesColumns : any,
        __joinAliases : any,
        __selectReferencesColumns : any,
    }>> (other : SelectBuilderT) {
        this.assertAfterSelect();

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
                    hasUnion : true,
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
        const tuple = orderByCallback(combineReferences(
            this.data.columnReferences,
            this.data.selectReferences
        ), this as any);
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                unionOrderByTuple : tuple
            }
        );
    };
    //Appends
    appendUnionOrderBy<OrderByCallbackT extends d.OrderByCallback<d.ISelectBuilder<DataT>>> (
        orderByCallback : OrderByCallbackT
    ) {
        const tuple = orderByCallback(combineReferences(
            this.data.columnReferences,
            this.data.selectReferences
        ), this as any);
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                unionOrderByTuple : (this.extraData.unionOrderByTuple == undefined) ?
                    tuple :
                    this.extraData.unionOrderByTuple.concat(tuple)
            }
        );
    };

    //REMOVES UNION ORDER BY
    unsetUnionOrderBy () {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                unionOrderByTuple : undefined
            }
        );
    };

    //UNION LIMIT CLAUSE
    unionLimit (rowCount : number) {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                unionLimit : (this.extraData.unionLimit == undefined) ?
                    {
                        rowCount : rowCount,
                        offset : 0,
                    } :
                    {
                        rowCount : rowCount,
                        offset : this.extraData.unionLimit.offset,
                    }
            }
        );
    };

    //UNION OFFSET CLAUSE
    unionOffset (offset : number) {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                unionLimit : (this.extraData.unionLimit == undefined) ?
                    {
                        rowCount : ArbitraryRowCount,
                        offset : offset,
                    } :
                    {
                        rowCount : this.extraData.unionLimit.rowCount,
                        offset : offset,
                    }
            }
        );
    };

    //REMOVES UNION LIMIT
    unsetUnionLimit () {
        return new SelectBuilder(
            this.data,
            {
                ...this.extraData,
                unionLimit : undefined
            }
        );
    };

    //AS CLAUSE
    as<AliasT extends string> (alias : AliasT) {
        this.assertAfterSelect();

        return new SubSelectJoinTable(
            alias,
            this as any
        ) as any;
    };
    asExpr<AliasT extends string> (alias : AliasT) {
        this.assertAfterSelect();
        if (this.data.selectTuple == undefined || this.data.selectTuple.length != 1) {
            throw new Error(`Must SELECT one column only`);
        }
        if (
            !(this.data.selectTuple[0] instanceof ColumnExpr) &&
            !(this.data.selectTuple[0] instanceof Column)
        ) {
            throw new Error(`Invalid SELECT; must select a column or column expression`);
        }
        return toExpr(this).as(alias) as any;
    }

    //SUBSELECT
    readonly from : d.CreateSubSelectBuilderDelegate<DataT["columnReferences"], DataT["__columnReferencesColumns"]> = (
        <TableT extends d.AnyAliasedTable> (table : TableT) => {
            if (this.data.columnReferences[table.alias] != undefined) {
                throw new Error(`Duplicate alias ${table.alias}, try using AS clause`);
            }
            return new SelectBuilder({
                hasSelect : false,
                hasUnion : false,
                columnReferences : combineReferences(
                    this.data.columnReferences,
                    tableToReference(table)
                ),
                joins : [check<d.IJoin<"FROM", TableT, d.TableToReference<TableT>, false>>({
                    joinType : "FROM",
                    table : table,
                    columnReferences : tableToReference(table),
                    nullable : false,
                    from : undefined,
                    to : undefined,
                })],
                selectReferences : {},
                selectTuple : undefined,
                aggregateCallback : undefined,

                __columnReferencesColumns : undefined as any,
                __joinAliases : undefined as any,
                __selectReferencesColumns : undefined as any,
            }, {
                db : this.extraData.db,
                distinct : false,
                sqlCalcFoundRows : false,
            }) as any;
        }
    );

    //AGGREGATE
    aggregate<AggregateCallbackT extends d.AggregateCallback<DataT>> (
        aggregateCallback : AggregateCallbackT
    ) {
        this.assertAfterSelect();

        return new SelectBuilder(
            spread(
                this.data,
                {
                    aggregateCallback : aggregateCallback,
                }
            ),
            this.extraData
        ) as any;
    }

    //QUERIFY
    querifyColumnReferences (sb : d.IStringBuilder) {
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
    }
    querifyWhere (sb : d.IStringBuilder) {
        if (this.extraData.whereExpr != undefined) {
            sb.appendLine("WHERE");
            const whereExpr = this.extraData.whereExpr;
            sb.scope((sb) => {
                whereExpr.querify(sb)
            });
        }
    }

    querify (sb : d.IStringBuilder) {
        const hasUnion = (
            this.extraData.union != undefined ||
            this.extraData.unionOrderByTuple != undefined ||
            this.extraData.unionLimit != undefined
        );
        if (hasUnion) {
            sb.appendLine("(");
            sb.indent();
        }

        if (this.data.selectTuple != undefined) {
            sb.append("SELECT");
            if (this.extraData.distinct) {
                sb.append(" DISTINCT");
            }
            if (this.extraData.sqlCalcFoundRows) {
                sb.append(" SQL_CALC_FOUND_ROWS");
            }
            sb.appendLine();

            const selectTuple = this.data.selectTuple;
            sb.scope((sb) => {
                sb.map(selectTuple, (sb, element) => {
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
            });
            sb.appendLine("FROM");
        }
        this.querifyColumnReferences(sb);
        this.querifyWhere(sb);
        if (this.extraData.groupByTuple != undefined) {
            sb.appendLine("GROUP BY");
            const groupByTuple = this.extraData.groupByTuple;
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
        if (this.extraData.orderByTuple != undefined) {
            sb.appendLine("ORDER BY");
            const orderByTuple = this.extraData.orderByTuple;
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
        if (this.extraData.limit != undefined) {
            const limit = this.extraData.limit;
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
        if (this.extraData.unionOrderByTuple != undefined) {
            sb.appendLine("ORDER BY");
            const unionOrderByTuple = this.extraData.unionOrderByTuple;
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
        if (this.extraData.unionLimit != undefined) {
            const unionLimit = this.extraData.unionLimit;
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
    private schema : sd.AssertDelegate<d.ColumnReferencesToSchemaWithJoins<DataT["selectReferences"], DataT["joins"]>>|undefined = undefined;
    private getSchema () {
        if (this.schema == undefined) {
            this.schema = columnReferencesToSchemaWithJoins<
                DataT["selectReferences"],
                DataT["joins"]
            >(this.data.selectReferences, this.data.joins);
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
    private readonly aggregateRow = (row : any) => {
        row = this.processRow(row);

        const keys = Object.keys(row);
        if (keys.length == 1) {
            row = {...row[keys[0]]};
        }

        if (this.data.aggregateCallback == undefined) {
            return row;
        } else {
            return this.data.aggregateCallback(row);
        }
    }
    private getQuery () {
        const sb = new StringBuilder();
        this.querify(sb);
        return sb.toString();
    }
    fetchAll () {
        this.assertAfterSelect();
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
                return Promise.all(raw.rows.map(this.aggregateRow));
            }) as any;
    }
    fetchOne () {
        this.assertAfterSelect();
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
                if (raw.rows.length != 1) {
                    throw new Error(`Expected one result, received ${raw.rows.length}`);
                }
                return this.aggregateRow(raw.rows[0]);
            }) as any;
    }
    fetchZeroOrOne () {
        this.assertAfterSelect();
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
                if (raw.rows.length > 1) {
                    throw new Error(`Expected zero or one result, received ${raw.rows.length}`);
                }
                if (raw.rows.length == 0) {
                    return undefined;
                } else {
                    return this.aggregateRow(raw.rows[0]);
                }
            }) as any;
    }
    fetchValue () {
        this.assertAfterSelect();
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
                if (raw.rows.length != 1) {
                    throw new Error(`Expected one result, received ${raw.rows.length}`);
                }
                if (raw.fields.length != 1) {
                    throw new Error(`Expected one field, received ${raw.fields.length}`);
                }
                const row = this.processRow(raw.rows[0]);
                const names = raw.fields[0].name.split("--");
                return (row as any)[names[0]][names[1]];
            }) as any;
    }
    fetchValueOrUndefined () {
        this.assertAfterSelect();
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
                if (raw.rows.length == 0) {
                    return undefined;
                }

                if (raw.rows.length > 1) {
                    throw new Error(`Expected zero or one result, received ${raw.rows.length}`);
                }
                if (raw.fields.length != 1) {
                    throw new Error(`Expected one field, received ${raw.fields.length}`);
                }
                const row = this.processRow(raw.rows[0]);
                const names = raw.fields[0].name.split("--");
                return (row as any)[names[0]][names[1]];
            }) as any;
    }
    fetchValueArray () {
        this.assertAfterSelect();
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
                if (raw.fields.length != 1) {
                    throw new Error(`Expected one field, received ${raw.fields.length}`);
                }
                const names  = raw.fields[0].name.split("--");
                const table  = names[0];
                const column = names[1];

                return Promise.all(raw.rows
                    .map(this.processRow)
                    .map(row => (row as any)[table][column])
                );
            }) as any;
    }
    count () : Promise<number> {
        if (this.extraData.unionLimit != undefined) {
            return this.unsetUnionLimit()
                .count();
        }
        if (this.extraData.limit != undefined && this.extraData.union == undefined) {
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
    exists () : Promise<boolean> {
        if (this.data.selectTuple == undefined) {
            return this.extraData.db.getBoolean(`
                SELECT EXISTS (
                    SELECT
                        *
                    FROM
                        ${this.getQuery()}
                )
            `);
        } else {
            return this.extraData.db.getBoolean(`
                SELECT EXISTS (
                    ${this.getQuery()}
                )
            `);
        }
    }
    paginate (rawPaginationArgs : d.RawPaginationArgs={}) {
        this.assertAfterSelect();

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

//TODO Move to Database?
export function newCreateSelectBuilderDelegate (db : Database|ConnectedDatabase) : d.CreateSelectBuilderDelegate {
    return <TableT extends d.AnyAliasedTable> (table : TableT) => {
        return new SelectBuilder({
            hasSelect : false,
            hasUnion : false,
            columnReferences : tableToReference(table),
            joins : {
                [table.alias] : new Join(
                    "FROM",
                    0,
                    table,
                    tableToReference(table),
                    false,
                    [],
                    [],
                )
            } as any,
            selectReferences : {},
            selectTuple : undefined,
            aggregateCallback : undefined,

            __columnReferencesColumns : undefined as any,
            __joinAliases : undefined as any,
            __selectReferencesColumns : undefined as any,
        }, {
            db : db,
            distinct : false,
            sqlCalcFoundRows : false,
        });
    }
}
