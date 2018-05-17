"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d = require("../declaration");
const sd = require("schema-decorator");
const table_operation_1 = require("./table-operation");
const tuple = require("./tuple");
const type_util_1 = require("@anyhowstep/type-util");
const join_1 = require("./join");
const column_references_operation_1 = require("./column-references-operation");
const expr_logical_1 = require("./expr-logical");
const expr_comparison_1 = require("./expr-comparison");
const column_1 = require("./column");
const select_1 = require("./select");
const sub_select_join_table_1 = require("./sub-select-join-table");
const expr_1 = require("./expr");
const Database_1 = require("./Database");
const StringBuilder_1 = require("./StringBuilder");
const e = require("./expr-library");
const mysql = require("typed-mysql");
class SelectBuilder {
    constructor(data, extraData) {
        //SUBSELECT
        this.from = ((table) => {
            if (this.data.columnReferences[table.alias] != undefined) {
                throw new Error(`Duplicate alias ${table.alias}, try using AS clause`);
            }
            return new SelectBuilder({
                allowed: [
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
                columnReferences: column_references_operation_1.combineReferences(this.data.columnReferences, table_operation_1.tableToReference(table)),
                joins: [type_util_1.check({
                        joinType: "FROM",
                        table: table,
                        nullable: false,
                        from: undefined,
                        to: undefined,
                    })],
                selectReferences: {},
                selectTuple: undefined,
                distinct: false,
                sqlCalcFoundRows: false,
                groupByTuple: undefined,
                orderByTuple: undefined,
                limit: undefined,
                unionOrderByTuple: undefined,
                unionLimit: undefined,
            }, {
                db: this.extraData.db,
            });
        });
        //FETCH CLAUSE
        this.schema = undefined;
        this.processRow = (row) => {
            const result = {};
            for (let mangledName in row) {
                const names = mangledName.split("--");
                const table = names[0];
                const column = names[1];
                if (result[table] == undefined) {
                    result[table] = {};
                }
                result[table][column] = row[mangledName];
            }
            return this.getSchema()("row", result);
        };
        this.data = data;
        this.extraData = extraData;
    }
    assertAllowed(op) {
        if (this.data.allowed.indexOf(op) < 0) {
            throw new Error(`${op} clause not allowed here`);
        }
    }
    assertNonDuplicateAlias(alias) {
        if (this.data.columnReferences[alias] != undefined) {
            throw new Error(`Duplicate alias ${alias}`);
        }
    }
    assertEqualLength(a, b) {
        if (a.length != b.length) {
            throw new Error(`Tuple length mismatch; ${a.length} != ${b.length}`);
        }
    }
    enableOperation(toEnable) {
        return this.data.allowed.concat(toEnable);
    }
    disableOperation(toDisable) {
        return this.data.allowed.filter((i) => {
            return toDisable.indexOf(i) < 0;
        });
    }
    //JOIN CLAUSE
    join(toTable, from, to) {
        this.assertAllowed(d.SelectBuilderOperation.JOIN);
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = join_1.getJoinFrom(this.data.columnReferences, from);
        const toTuple = join_1.getJoinTo(toTable, to);
        this.assertEqualLength(fromTuple, toTuple);
        return new SelectBuilder(type_util_1.spread(this.data, {
            columnReferences: column_references_operation_1.combineReferences(this.data.columnReferences, table_operation_1.tableToReference(toTable)),
            joins: tuple.push(this.data.joins, {
                joinType: "INNER",
                table: toTable,
                nullable: false,
                from: fromTuple,
                to: toTuple,
            }),
        }), this.extraData);
    }
    rightJoin(toTable, from, to) {
        this.assertAllowed(d.SelectBuilderOperation.JOIN);
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = join_1.getJoinFrom(this.data.columnReferences, from);
        const toTuple = join_1.getJoinTo(toTable, to);
        this.assertEqualLength(fromTuple, toTuple);
        return new SelectBuilder(type_util_1.spread(this.data, {
            columnReferences: column_references_operation_1.combineReferences(column_references_operation_1.toNullableColumnReferences(this.data.columnReferences), table_operation_1.tableToReference(toTable)),
            joins: tuple.push(join_1.toNullableJoinTuple(this.data.joins), {
                joinType: "RIGHT",
                table: toTable,
                nullable: false,
                from: fromTuple,
                to: toTuple,
            }),
        }), this.extraData);
    }
    ;
    leftJoin(toTable, from, to) {
        this.assertAllowed(d.SelectBuilderOperation.JOIN);
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = join_1.getJoinFrom(this.data.columnReferences, from);
        const toTuple = join_1.getJoinTo(toTable, to);
        this.assertEqualLength(fromTuple, toTuple);
        return new SelectBuilder(type_util_1.spread(this.data, {
            columnReferences: column_references_operation_1.combineReferences(this.data.columnReferences, column_references_operation_1.toNullableColumnReferences(table_operation_1.tableToReference(toTable))),
            joins: tuple.push(this.data.joins, {
                joinType: "LEFT",
                table: toTable,
                nullable: true,
                from: fromTuple,
                to: toTuple,
            }),
        }), this.extraData);
    }
    ;
    //JOIN USING CLAUSE
    joinUsing(toTable, from) {
        this.assertAllowed(d.SelectBuilderOperation.JOIN);
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = join_1.getJoinFrom(this.data.columnReferences, from);
        const toTuple = join_1.getJoinToUsingFrom(toTable, fromTuple);
        this.assertEqualLength(fromTuple, toTuple);
        return new SelectBuilder(type_util_1.spread(this.data, {
            columnReferences: column_references_operation_1.combineReferences(this.data.columnReferences, table_operation_1.tableToReference(toTable)),
            joins: tuple.push(this.data.joins, {
                joinType: "INNER",
                table: toTable,
                nullable: false,
                from: fromTuple,
                to: toTuple,
            }),
        }), this.extraData);
    }
    rightJoinUsing(toTable, from) {
        this.assertAllowed(d.SelectBuilderOperation.JOIN);
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = join_1.getJoinFrom(this.data.columnReferences, from);
        const toTuple = join_1.getJoinToUsingFrom(toTable, fromTuple);
        this.assertEqualLength(fromTuple, toTuple);
        return new SelectBuilder(type_util_1.spread(this.data, {
            columnReferences: column_references_operation_1.combineReferences(column_references_operation_1.toNullableColumnReferences(this.data.columnReferences), table_operation_1.tableToReference(toTable)),
            joins: tuple.push(join_1.toNullableJoinTuple(this.data.joins), {
                joinType: "RIGHT",
                table: toTable,
                nullable: false,
                from: fromTuple,
                to: toTuple,
            }),
        }), this.extraData);
    }
    ;
    leftJoinUsing(toTable, from) {
        this.assertAllowed(d.SelectBuilderOperation.JOIN);
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = join_1.getJoinFrom(this.data.columnReferences, from);
        const toTuple = join_1.getJoinToUsingFrom(toTable, fromTuple);
        this.assertEqualLength(fromTuple, toTuple);
        return new SelectBuilder(type_util_1.spread(this.data, {
            columnReferences: column_references_operation_1.combineReferences(this.data.columnReferences, column_references_operation_1.toNullableColumnReferences(table_operation_1.tableToReference(toTable))),
            joins: tuple.push(this.data.joins, {
                joinType: "LEFT",
                table: toTable,
                nullable: true,
                from: fromTuple,
                to: toTuple,
            }),
        }), this.extraData);
    }
    ;
    //TYPE-NARROW CLAUSE
    appendNarrowData(newColumn) {
        return type_util_1.spread(this.data, {
            columnReferences: column_references_operation_1.replaceColumnOfReference(this.data.columnReferences, newColumn),
            selectReferences: column_references_operation_1.replaceColumnOfReference(this.data.selectReferences, newColumn),
            selectTuple: (this.data.selectTuple == undefined ?
                undefined :
                select_1.replaceColumnOfSelectTuple(this.data.selectTuple, newColumn)),
        });
    }
    appendWhereExpr(newExpr) {
        if (this.extraData.whereExpr == undefined) {
            return Object.assign({}, this.extraData, { whereExpr: newExpr });
        }
        else {
            return Object.assign({}, this.extraData, { whereExpr: expr_logical_1.and(this.extraData.whereExpr, newExpr) });
        }
    }
    appendNarrowExpr(newExpr) {
        //Must modify WHERE clause
        const result = this.appendWhereExpr(newExpr);
        //Append
        result.narrowExpr = (this.extraData.narrowExpr == undefined) ?
            newExpr :
            expr_logical_1.and(this.extraData.narrowExpr, newExpr);
        return result;
    }
    whereIsNotNull(typeNarrowCallback) {
        this.assertAllowed(d.SelectBuilderOperation.NARROW);
        const toReplace = typeNarrowCallback(this.data.columnReferences);
        return new SelectBuilder(this.appendNarrowData(new column_1.Column(toReplace.table, toReplace.name, sd.notOptional(toReplace.assertDelegate))), this.appendNarrowExpr(expr_comparison_1.isNotNull(toReplace)));
    }
    ;
    whereIsNull(typeNarrowCallback) {
        this.assertAllowed(d.SelectBuilderOperation.NARROW);
        const toReplace = typeNarrowCallback(this.data.columnReferences);
        return new SelectBuilder(this.appendNarrowData(new column_1.Column(toReplace.table, toReplace.name, sd.nil())), this.appendNarrowExpr(expr_comparison_1.isNull(toReplace)));
    }
    ;
    whereIsEqual(value, typeNarrowCallback) {
        this.assertAllowed(d.SelectBuilderOperation.NARROW);
        const toReplace = typeNarrowCallback(this.data.columnReferences);
        return new SelectBuilder(this.appendNarrowData(new column_1.Column(toReplace.table, toReplace.name, sd.oneOf(value))), this.appendNarrowExpr(expr_logical_1.and(
        //Adding this so we don't compare against NULL
        expr_comparison_1.isNotNull(toReplace), expr_comparison_1.eq(toReplace, value))));
    }
    ;
    //WHERE CLAUSE
    //Replaces but ANDs with NARROW
    where(whereCallback) {
        this.assertAllowed(d.SelectBuilderOperation.WHERE);
        let condition = whereCallback(this.data.columnReferences, this);
        if (this.extraData.narrowExpr != undefined) {
            condition = expr_logical_1.and(this.extraData.narrowExpr, condition);
        }
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { whereExpr: condition }));
    }
    ;
    //Appends
    andWhere(whereCallback) {
        this.assertAllowed(d.SelectBuilderOperation.WHERE);
        let condition = whereCallback(this.data.columnReferences, this);
        return new SelectBuilder(this.data, this.appendWhereExpr(condition));
    }
    ;
    //SELECT CLAUSE
    appendSelectTuple(newSelectTuple) {
        if (this.data.selectTuple == undefined) {
            return newSelectTuple;
        }
        else {
            return tuple.concat(this.data.selectTuple, newSelectTuple);
        }
    }
    select(selectCallback) {
        this.assertAllowed(d.SelectBuilderOperation.SELECT);
        const selectTuple = selectCallback(this.data.columnReferences, this);
        const newTuple = this.appendSelectTuple(selectTuple);
        if (select_1.selectTupleHasDuplicateColumn(newTuple)) {
            throw new Error(`Duplicate column found, try aliasing`);
        }
        return new SelectBuilder(type_util_1.spread(this.data, {
            allowed: this.enableOperation([
                d.SelectBuilderOperation.WIDEN,
                d.SelectBuilderOperation.UNION,
                d.SelectBuilderOperation.AS,
                d.SelectBuilderOperation.FETCH,
            ]),
            selectReferences: column_references_operation_1.combineReferences(this.data.selectReferences, 
            //We don't need to convert the entire newTuple to references
            //Since part of newTuple was already converted before
            select_1.selectTupleToReferences(selectTuple)),
            selectTuple: newTuple,
        }), this.extraData);
    }
    ;
    selectAll() {
        this.assertAllowed(d.SelectBuilderOperation.SELECT);
        if (this.data.selectTuple != undefined) {
            throw new Error("selectAll() must be called before select()");
        }
        return new SelectBuilder(type_util_1.spread(this.data, {
            allowed: this.enableOperation([
                d.SelectBuilderOperation.WIDEN,
                d.SelectBuilderOperation.UNION,
                d.SelectBuilderOperation.AS,
                d.SelectBuilderOperation.FETCH,
            ]),
            selectReferences: select_1.selectAllReference(this.data.columnReferences),
            selectTuple: select_1.joinTupleToSelectTuple(this.data.joins),
        }), this.extraData);
    }
    ;
    //DISTINCT CLAUSE
    //distinct ();
    //distinct<DistinctT extends boolean> (distinct : DistinctT);
    distinct(distinct = true) {
        this.assertAllowed(d.SelectBuilderOperation.DISTINCT);
        return new SelectBuilder(type_util_1.spread(this.data, { distinct: distinct }), this.extraData);
    }
    //SQL_CALC_FOUND_ROWS CLAUSE
    //sqlCalcFoundRows ();
    //sqlCalcFoundRows<SqlCalcFoundRowsT extends boolean> (sqlCalcFoundRows : SqlCalcFoundRowsT);
    sqlCalcFoundRows(sqlCalcFoundRows = true) {
        this.assertAllowed(d.SelectBuilderOperation.SQL_CALC_FOUND_ROWS);
        return new SelectBuilder(type_util_1.spread(this.data, { sqlCalcFoundRows: sqlCalcFoundRows }), this.extraData);
    }
    //GROUP BY CLAUSE
    //Replaces
    groupBy(groupByCallback) {
        this.assertAllowed(d.SelectBuilderOperation.GROUP_BY);
        const tuple = groupByCallback(column_references_operation_1.combineReferences(
        //For GROUP BY, we replace the selectReferences with columnReferences
        this.data.selectReferences, this.data.columnReferences), this);
        return new SelectBuilder(type_util_1.spread(this.data, {
            groupByTuple: tuple
        }), this.extraData);
    }
    ;
    //Appends
    appendGroupBy(groupByCallback) {
        this.assertAllowed(d.SelectBuilderOperation.GROUP_BY);
        const tuple = groupByCallback(column_references_operation_1.combineReferences(
        //For GROUP BY, we replace the selectReferences with columnReferences
        this.data.selectReferences, this.data.columnReferences), this);
        return new SelectBuilder(type_util_1.spread(this.data, {
            groupByTuple: (this.data.groupByTuple == undefined) ?
                tuple :
                this.data.groupByTuple.concat(tuple)
        }), this.extraData);
    }
    ;
    //REMOVES GROUP BY
    unsetGroupBy() {
        return new SelectBuilder(type_util_1.spread(this.data, { groupByTuple: undefined }), this.extraData);
    }
    ;
    //HAVING CLAUSE
    having(havingCallback) {
        this.assertAllowed(d.SelectBuilderOperation.HAVING);
        let condition = havingCallback(column_references_operation_1.combineReferences(this.data.columnReferences, this.data.selectReferences), this);
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { havingExpr: condition }));
    }
    ;
    //Appends
    andHaving(havingCallback) {
        this.assertAllowed(d.SelectBuilderOperation.HAVING);
        let condition = havingCallback(type_util_1.spread(this.data.columnReferences, this.data.selectReferences), this);
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { havingExpr: (this.extraData.havingExpr == undefined) ?
                condition :
                expr_logical_1.and(this.extraData.havingExpr, condition) }));
    }
    ;
    //ORDER BY CLAUSE
    //Replaces
    orderBy(orderByCallback) {
        this.assertAllowed(d.SelectBuilderOperation.ORDER_BY);
        const tuple = orderByCallback(column_references_operation_1.combineReferences(this.data.columnReferences, this.data.selectReferences), this);
        return new SelectBuilder(type_util_1.spread(this.data, {
            orderByTuple: tuple
        }), this.extraData);
    }
    ;
    //Appends
    appendOrderBy(orderByCallback) {
        this.assertAllowed(d.SelectBuilderOperation.ORDER_BY);
        const tuple = orderByCallback(column_references_operation_1.combineReferences(this.data.columnReferences, this.data.selectReferences), this);
        return new SelectBuilder(type_util_1.spread(this.data, {
            orderByTuple: (this.data.orderByTuple == undefined) ?
                tuple :
                this.data.orderByTuple.concat(tuple)
        }), this.extraData);
    }
    ;
    //REMOVES ORDER BY
    unsetOrderBy() {
        return new SelectBuilder(type_util_1.spread(this.data, { orderByTuple: undefined }), this.extraData);
    }
    ;
    //LIMIT CLAUSE
    limit(rowCount) {
        this.assertAllowed(d.SelectBuilderOperation.LIMIT);
        return new SelectBuilder(type_util_1.spread(this.data, {
            limit: (this.data.limit == undefined) ?
                {
                    rowCount: rowCount,
                    offset: 0,
                } :
                {
                    rowCount: rowCount,
                    offset: this.data.limit.offset,
                }
        }), this.extraData);
    }
    ;
    //OFFSET CLAUSE
    offset(offset) {
        this.assertAllowed(d.SelectBuilderOperation.OFFSET);
        return new SelectBuilder(type_util_1.spread(this.data, {
            limit: (this.data.limit == undefined) ?
                {
                    rowCount: d.ArbitraryRowCount,
                    offset: offset,
                } :
                {
                    rowCount: this.data.limit.rowCount,
                    offset: offset,
                }
        }), this.extraData);
    }
    ;
    //REMOVES LIMIT
    unsetLimit() {
        return new SelectBuilder(type_util_1.spread(this.data, { limit: undefined }), this.extraData);
    }
    ;
    //WIDEN CLAUSE
    widen(typeWidenCallback, assertWidened) {
        this.assertAllowed(d.SelectBuilderOperation.WIDEN);
        const column = typeWidenCallback(this.data.selectReferences);
        const newColumn = new column_1.Column(column.table, column.name, sd.or(column.assertDelegate, assertWidened));
        return new SelectBuilder(type_util_1.spread(this.data, {
            selectReferences: column_references_operation_1.replaceColumnOfReference(this.data.selectReferences, newColumn),
            selectTuple: (this.data.selectTuple == undefined ?
                undefined :
                select_1.replaceColumnOfSelectTuple(this.data.selectTuple, newColumn)),
        }), this.extraData);
    }
    ;
    //UNION CLAUSE
    union(other) {
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
        return new SelectBuilder(type_util_1.spread(this.data, {
            allowed: this.disableOperation([
                d.SelectBuilderOperation.NARROW,
                d.SelectBuilderOperation.SELECT
            ]),
        }), Object.assign({}, this.extraData, { union: (this.extraData.union == undefined) ?
                [other] :
                this.extraData.union.concat([other]) }));
    }
    ;
    //UNION ORDER BY CLAUSE
    //Replaces
    unionOrderBy(orderByCallback) {
        this.assertAllowed(d.SelectBuilderOperation.UNION_ORDER_BY);
        const tuple = orderByCallback(column_references_operation_1.combineReferences(this.data.columnReferences, this.data.selectReferences), this);
        return new SelectBuilder(type_util_1.spread(this.data, {
            unionOrderByTuple: tuple
        }), this.extraData);
    }
    ;
    //Appends
    appendUnionOrderBy(orderByCallback) {
        this.assertAllowed(d.SelectBuilderOperation.UNION_ORDER_BY);
        const tuple = orderByCallback(column_references_operation_1.combineReferences(this.data.columnReferences, this.data.selectReferences), this);
        return new SelectBuilder(type_util_1.spread(this.data, {
            unionOrderByTuple: (this.data.unionOrderByTuple == undefined) ?
                tuple :
                this.data.unionOrderByTuple.concat(tuple)
        }), this.extraData);
    }
    ;
    //REMOVES UNION ORDER BY
    unsetUnionOrderBy() {
        return new SelectBuilder(type_util_1.spread(this.data, { unionOrderByTuple: undefined }), this.extraData);
    }
    ;
    //UNION LIMIT CLAUSE
    unionLimit(rowCount) {
        this.assertAllowed(d.SelectBuilderOperation.UNION_LIMIT);
        return new SelectBuilder(type_util_1.spread(this.data, {
            unionLimit: (this.data.unionLimit == undefined) ?
                {
                    rowCount: rowCount,
                    offset: 0,
                } :
                {
                    rowCount: rowCount,
                    offset: this.data.unionLimit.offset,
                }
        }), this.extraData);
    }
    ;
    //UNION OFFSET CLAUSE
    unionOffset(offset) {
        this.assertAllowed(d.SelectBuilderOperation.UNION_OFFSET);
        return new SelectBuilder(type_util_1.spread(this.data, {
            unionLimit: (this.data.unionLimit == undefined) ?
                {
                    rowCount: d.ArbitraryRowCount,
                    offset: offset,
                } :
                {
                    rowCount: this.data.unionLimit.rowCount,
                    offset: offset,
                }
        }), this.extraData);
    }
    ;
    //REMOVES UNION LIMIT
    unsetUnionLimit() {
        return new SelectBuilder(type_util_1.spread(this.data, { unionLimit: undefined }), this.extraData);
    }
    ;
    //AS CLAUSE
    as(alias) {
        this.assertAllowed(d.SelectBuilderOperation.AS);
        return new sub_select_join_table_1.SubSelectJoinTable(alias, this);
    }
    ;
    querifyColumnReferences(sb) {
        sb.scope((sb) => {
            this.data.joins[0].table.querify(sb);
        });
        sb.map(this.data.joins.slice(1), (sb, join, index) => {
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
                sb.map(fromArr, (sb, from, index) => {
                    const to = toArr[index];
                    from.querify(sb);
                    sb.append(" = ");
                    to.querify(sb);
                }, " AND\n");
            });
        });
    }
    querifyWhere(sb) {
        if (this.extraData.whereExpr != undefined) {
            sb.appendLine("WHERE");
            const whereExpr = this.extraData.whereExpr;
            sb.scope((sb) => {
                whereExpr.querify(sb);
            });
        }
    }
    querify(sb) {
        const hasUnion = (this.extraData.union != undefined ||
            this.data.unionOrderByTuple != undefined ||
            this.data.unionLimit != undefined);
        if (hasUnion) {
            sb.appendLine("(");
            sb.indent();
        }
        if (this.data.selectTuple != undefined) {
            sb.append("SELECT");
            if (this.data.distinct) {
                sb.append(" DISTINCT");
            }
            if (this.data.sqlCalcFoundRows) {
                sb.append(" SQL_CALC_FOUND_ROWS");
            }
            sb.appendLine();
            const selectTuple = this.data.selectTuple;
            sb.scope((sb) => {
                sb.map(selectTuple, (sb, element) => {
                    if (element instanceof expr_1.ColumnExpr) {
                        element.querify(sb);
                    }
                    else if (element instanceof column_1.Column) {
                        //const str = element.as(element.name).querify();
                        //return `\t${str}`;
                        const alias = Database_1.Database.EscapeId(`${element.table}--${element.name}`);
                        element.querify(sb);
                        sb.append(` AS ${alias}`);
                    }
                    else if (element instanceof Object) {
                        const names = Object.keys(element).sort();
                        sb.map(names, (sb, name) => {
                            const sub = element[name];
                            const alias = Database_1.Database.EscapeId(`${sub.table}--${sub.name}`);
                            sub.querify(sb);
                            sb.append(` AS ${alias}`);
                        }, ",\n");
                    }
                    else {
                        throw new Error(`Unknown select tuple element (${typeof element})${element}`);
                    }
                }, ",\n");
            });
            sb.appendLine("FROM");
        }
        this.querifyColumnReferences(sb);
        this.querifyWhere(sb);
        if (this.data.groupByTuple != undefined) {
            sb.appendLine("GROUP BY");
            const groupByTuple = this.data.groupByTuple;
            sb.scope((sb) => {
                sb.map(groupByTuple, (sb, e) => {
                    e.querify(sb);
                }, ",\n");
            });
        }
        if (this.extraData.havingExpr != undefined) {
            sb.appendLine("HAVING");
            const havingExpr = this.extraData.havingExpr;
            sb.scope((sb) => {
                havingExpr.querify(sb);
            });
        }
        if (this.data.orderByTuple != undefined) {
            sb.appendLine("ORDER BY");
            const orderByTuple = this.data.orderByTuple;
            sb.scope((sb) => {
                sb.map(orderByTuple, (sb, e) => {
                    if ((e instanceof column_1.Column) || (e instanceof expr_1.Expr)) {
                        e.querify(sb);
                        sb.append(" ASC");
                    }
                    else {
                        e[0].querify(sb);
                        sb.append(e[1] ? " ASC" : " DESC");
                    }
                }, ",\n");
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
            sb.map(this.extraData.union, (sb, u) => {
                sb.appendLine("UNION");
                sb.appendLine("(");
                sb.scope((sb) => {
                    u.querify(sb);
                });
                sb.appendLine(")");
            }, "\n");
        }
        if (this.data.unionOrderByTuple != undefined) {
            sb.appendLine("ORDER BY");
            const unionOrderByTuple = this.data.unionOrderByTuple;
            sb.scope((sb) => {
                sb.map(unionOrderByTuple, (sb, e) => {
                    if ((e instanceof column_1.Column) || (e instanceof expr_1.Expr)) {
                        e.querify(sb);
                        sb.append(" ASC");
                    }
                    else {
                        e[0].querify(sb);
                        sb.append(e[1] ? " ASC" : " DESC");
                    }
                }, ",\n");
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
    getSchema() {
        if (this.schema == undefined) {
            this.schema = column_references_operation_1.columnReferencesToSchema(this.data.selectReferences);
        }
        return this.schema;
    }
    getQuery() {
        const sb = new StringBuilder_1.StringBuilder();
        this.querify(sb);
        return sb.toString();
    }
    fetchAll() {
        this.assertAllowed(d.SelectBuilderOperation.FETCH);
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
            return Promise.all(raw.rows.map(this.processRow));
        });
    }
    fetchOne() {
        this.assertAllowed(d.SelectBuilderOperation.FETCH);
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
            if (raw.rows.length != 1) {
                throw new Error(`Expected 1 row, received ${raw.rows.length}`);
            }
            return this.processRow(raw.rows[0]);
        });
    }
    fetchZeroOrOne() {
        this.assertAllowed(d.SelectBuilderOperation.FETCH);
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
            if (raw.rows.length > 1) {
                throw new Error(`Expected zero or one rows, received ${raw.rows.length}`);
            }
            if (raw.rows.length == 0) {
                return undefined;
            }
            else {
                return this.processRow(raw.rows[0]);
            }
        });
    }
    fetchValue() {
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
        });
    }
    fetchValueOrUndefined() {
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
        });
    }
    fetchValueArray() {
        this.assertAllowed(d.SelectBuilderOperation.FETCH);
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
            if (raw.fields.length != 1) {
                throw new Error(`Expected 1 field, received ${raw.fields.length}`);
            }
            const names = raw.fields[0].name.split("--");
            const table = names[0];
            const column = names[1];
            return Promise.all(raw.rows
                .map(this.processRow)
                .map(row => row[table][column]));
        });
    }
    count() {
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
        }
        else {
            //Already called select
            return this.extraData.db.getNaturalNumber(`
                SELECT
                    COUNT(*) AS count
                FROM
                    (${this.getQuery()}) AS tmp
            `);
        }
    }
    paginate(rawPaginationArgs = {}) {
        this.assertAllowed(d.SelectBuilderOperation.FETCH);
        const paginationArgs = mysql.toPaginationArgs(rawPaginationArgs, this.extraData.db.getPaginationConfiguration());
        return this.count()
            .then((itemsFound) => {
            const pagesFound = (Math.floor(itemsFound / paginationArgs.itemsPerPage) +
                ((itemsFound % paginationArgs.itemsPerPage == 0) ?
                    0 : 1));
            if (this.extraData.union == undefined) {
                return this
                    .limit(paginationArgs.itemsPerPage)
                    .offset(mysql.getPaginationStart(paginationArgs))
                    .fetchAll()
                    .then((rows) => {
                    return {
                        info: Object.assign({ itemsFound: itemsFound, pagesFound: pagesFound }, paginationArgs),
                        rows: rows,
                    };
                });
            }
            else {
                return this
                    .unionLimit(paginationArgs.itemsPerPage)
                    .unionOffset(mysql.getPaginationStart(paginationArgs))
                    .fetchAll()
                    .then((rows) => {
                    return {
                        info: Object.assign({ itemsFound: itemsFound, pagesFound: pagesFound }, paginationArgs),
                        rows: rows,
                    };
                });
            }
        });
    }
}
exports.SelectBuilder = SelectBuilder;
//TODO Move to Database?
function newCreateSelectBuilderDelegate(db) {
    return (table) => {
        return new SelectBuilder({
            allowed: [
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
            columnReferences: table_operation_1.tableToReference(table),
            joins: [type_util_1.check({
                    joinType: "FROM",
                    table: table,
                    nullable: false,
                    from: undefined,
                    to: undefined,
                })],
            selectReferences: {},
            selectTuple: undefined,
            distinct: false,
            sqlCalcFoundRows: false,
            groupByTuple: undefined,
            orderByTuple: undefined,
            limit: undefined,
            unionOrderByTuple: undefined,
            unionLimit: undefined,
        }, {
            db: db,
        });
    };
}
exports.newCreateSelectBuilderDelegate = newCreateSelectBuilderDelegate;
//# sourceMappingURL=select-builder.js.map