import * as d from "../declaration";
import * as sd from "schema-decorator";
import {tableToReference} from "./table-operation";
import * as tuple from "./tuple";
import {spread, check} from "@anyhowstep/type-util";
import {getJoinFrom, getJoinTo, toNullableJoinTuple} from "./join";
import {toNullableColumnReferences} from "./column-references-operation";

export class SelectBuilder<DataT extends d.AnySelectBuilderData> implements d.ISelectBuilder<DataT> {
    data : DataT;

    public constructor (data : DataT) {
        this.data = data;
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
        )) as any;
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
        )) as any;
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
        )) as any;
    };

    //TYPE-NARROW CLAUSE
    whereIsNotNull<TypeNarrowCallbackT extends TypeNarrowCallback<ISelectBuilder<DataT>>> (
        typeNarrowCallback : TypeNarrowCallbackT
    ) {
        return null as any;
    };
    whereIsNull<TypeNarrowCallbackT extends TypeNarrowCallback<ISelectBuilder<DataT>>> (
        typeNarrowCallback : TypeNarrowCallbackT
    ) {
        return null as any;
    };
    whereIsEqual<
        ConstT extends boolean|number|string|null,
        TypeNarrowCallbackT extends TypeNarrowCallback<ISelectBuilder<DataT>>
    > (
        value : ConstT,
        typeNarrowCallback : TypeNarrowCallbackT
    ) {
        return null as any;
    };

    //WHERE CLAUSE
    //Replaces but ANDs with NARROW
    where<WhereCallbackT extends WhereCallback<ISelectBuilder<DataT>>> (
        whereCallback : WhereCallbackT
    ) {
        return null as any;
    };
    //Appends
    andWhere<WhereCallbackT extends WhereCallback<ISelectBuilder<DataT>>> (
        whereCallback : WhereCallbackT
    ) {
        return null as any;
    };

    //SELECT CLAUSE
    select<SelectCallbackT extends SelectCallback<ISelectBuilder<DataT>>> (
        selectCallback : SelectCallbackT
    ) {
        return null as any;
    };

    //DISTINCT CLAUSE
    distinct () {
        return null as any;
    };
    distinct<DistinctT extends boolean> (distinct : DistinctT) {
        return null as any;
    };

    //SQL_CALC_FOUND_ROWS CLAUSE
    sqlCalcFoundRows () {
        return null as any;
    };
    sqlCalcFoundRows<SqlCalcFoundRowsT extends boolean> (sqlCalcFoundRows : SqlCalcFoundRowsT) {
        return null as any;
    };

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
        return null as any;
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
        return null as any;
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
        return null as any;
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
        return null as any;
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
        return null as any;
    };

    //AS CLAUSE
    as<AliasT extends string> (alias : AliasT) {
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
        });
    }
);
