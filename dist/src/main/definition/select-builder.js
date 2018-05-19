"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const expr_operation_1 = require("./expr-operation");
exports.ArbitraryRowCount = 999999999;
class SelectBuilder {
    constructor(data, extraData) {
        //SUBSELECT
        this.from = ((table) => {
            if (this.data.columnReferences[table.alias] != undefined) {
                throw new Error(`Duplicate alias ${table.alias}, try using AS clause`);
            }
            return new SelectBuilder({
                hasSelect: false,
                hasUnion: false,
                columnReferences: column_references_operation_1.combineReferences(this.data.columnReferences, table_operation_1.tableToReference(table)),
                joins: [type_util_1.check({
                        joinType: "FROM",
                        table: table,
                        columnReferences: table_operation_1.tableToReference(table),
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
                aggregateCallback: undefined,
            }, {
                db: this.extraData.db,
                distinct: false,
                sqlCalcFoundRows: false,
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
        this.aggregateRow = (row) => {
            row = this.processRow(row);
            const keys = Object.keys(row);
            if (keys.length == 1) {
                row = Object.assign({}, row[keys[0]]);
            }
            if (this.data.aggregateCallback == undefined) {
                return row;
            }
            else {
                return this.data.aggregateCallback(row);
            }
        };
        this.data = data;
        this.extraData = extraData;
    }
    assertAfterSelect() {
        if (!this.data.hasSelect) {
            throw new Error(`SELECT clause required`);
        }
    }
    assertBeforeUnion() {
        if (this.data.hasUnion) {
            throw new Error(`Must be before UNION clause`);
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
    //JOIN CLAUSE
    join(toTable, from, to) {
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = join_1.getJoinFrom(this.data.columnReferences, from);
        const toTuple = join_1.getJoinTo(toTable, to);
        this.assertEqualLength(fromTuple, toTuple);
        return new SelectBuilder(type_util_1.spread(this.data, {
            columnReferences: column_references_operation_1.combineReferences(this.data.columnReferences, table_operation_1.tableToReference(toTable)),
            joins: tuple.push(this.data.joins, {
                joinType: "INNER",
                table: toTable,
                columnReferences: table_operation_1.tableToReference(toTable),
                nullable: false,
                from: fromTuple,
                to: toTuple,
            }),
        }), this.extraData);
    }
    rightJoin(toTable, from, to) {
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = join_1.getJoinFrom(this.data.columnReferences, from);
        const toTuple = join_1.getJoinTo(toTable, to);
        this.assertEqualLength(fromTuple, toTuple);
        return new SelectBuilder(type_util_1.spread(this.data, {
            columnReferences: column_references_operation_1.combineReferences(column_references_operation_1.toNullableColumnReferences(this.data.columnReferences), table_operation_1.tableToReference(toTable)),
            joins: tuple.push(join_1.toNullableJoinTuple(this.data.joins), {
                joinType: "RIGHT",
                table: toTable,
                columnReferences: table_operation_1.tableToReference(toTable),
                nullable: false,
                from: fromTuple,
                to: toTuple,
            }),
        }), this.extraData);
    }
    ;
    leftJoin(toTable, from, to) {
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = join_1.getJoinFrom(this.data.columnReferences, from);
        const toTuple = join_1.getJoinTo(toTable, to);
        this.assertEqualLength(fromTuple, toTuple);
        return new SelectBuilder(type_util_1.spread(this.data, {
            columnReferences: column_references_operation_1.combineReferences(this.data.columnReferences, column_references_operation_1.toNullableColumnReferences(table_operation_1.tableToReference(toTable))),
            joins: tuple.push(this.data.joins, {
                joinType: "LEFT",
                table: toTable,
                //Not nullable reference!
                columnReferences: table_operation_1.tableToReference(toTable),
                nullable: true,
                from: fromTuple,
                to: toTuple,
            }),
        }), this.extraData);
    }
    ;
    //JOIN USING CLAUSE
    joinUsing(toTable, from) {
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = join_1.getJoinFrom(this.data.columnReferences, from);
        const toTuple = join_1.getJoinToUsingFrom(toTable, fromTuple);
        this.assertEqualLength(fromTuple, toTuple);
        return new SelectBuilder(type_util_1.spread(this.data, {
            columnReferences: column_references_operation_1.combineReferences(this.data.columnReferences, table_operation_1.tableToReference(toTable)),
            joins: tuple.push(this.data.joins, {
                joinType: "INNER",
                table: toTable,
                columnReferences: table_operation_1.tableToReference(toTable),
                nullable: false,
                from: fromTuple,
                to: toTuple,
            }),
        }), this.extraData);
    }
    rightJoinUsing(toTable, from) {
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = join_1.getJoinFrom(this.data.columnReferences, from);
        const toTuple = join_1.getJoinToUsingFrom(toTable, fromTuple);
        this.assertEqualLength(fromTuple, toTuple);
        return new SelectBuilder(type_util_1.spread(this.data, {
            columnReferences: column_references_operation_1.combineReferences(column_references_operation_1.toNullableColumnReferences(this.data.columnReferences), table_operation_1.tableToReference(toTable)),
            joins: tuple.push(join_1.toNullableJoinTuple(this.data.joins), {
                joinType: "RIGHT",
                table: toTable,
                columnReferences: table_operation_1.tableToReference(toTable),
                nullable: false,
                from: fromTuple,
                to: toTuple,
            }),
        }), this.extraData);
    }
    ;
    leftJoinUsing(toTable, from) {
        this.assertNonDuplicateAlias(toTable.alias);
        const fromTuple = join_1.getJoinFrom(this.data.columnReferences, from);
        const toTuple = join_1.getJoinToUsingFrom(toTable, fromTuple);
        this.assertEqualLength(fromTuple, toTuple);
        return new SelectBuilder(type_util_1.spread(this.data, {
            columnReferences: column_references_operation_1.combineReferences(this.data.columnReferences, column_references_operation_1.toNullableColumnReferences(table_operation_1.tableToReference(toTable))),
            joins: tuple.push(this.data.joins, {
                joinType: "LEFT",
                table: toTable,
                columnReferences: table_operation_1.tableToReference(toTable),
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
            joins: join_1.replaceColumnOfJoinTuple(this.data.joins, newColumn),
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
        this.assertBeforeUnion();
        const toReplace = typeNarrowCallback(this.data.columnReferences);
        if (!(toReplace instanceof column_1.Column)) {
            throw new Error(`Expected a column`);
        }
        return new SelectBuilder(this.appendNarrowData(new column_1.Column(toReplace.table, toReplace.name, sd.notOptional(toReplace.assertDelegate))), this.appendNarrowExpr(expr_comparison_1.isNotNull(toReplace)));
    }
    ;
    whereIsNull(typeNarrowCallback) {
        this.assertBeforeUnion();
        const toReplace = typeNarrowCallback(this.data.columnReferences);
        if (!(toReplace instanceof column_1.Column)) {
            throw new Error(`Expected a column`);
        }
        return new SelectBuilder(this.appendNarrowData(new column_1.Column(toReplace.table, toReplace.name, sd.nil())), this.appendNarrowExpr(expr_comparison_1.isNull(toReplace)));
    }
    ;
    whereIsEqual(value, typeNarrowCallback) {
        this.assertBeforeUnion();
        const toReplace = typeNarrowCallback(this.data.columnReferences);
        if (!(toReplace instanceof column_1.Column)) {
            throw new Error(`Expected a column`);
        }
        return new SelectBuilder(this.appendNarrowData(new column_1.Column(toReplace.table, toReplace.name, sd.oneOf(value))), this.appendNarrowExpr(expr_logical_1.and(
        //Adding this so we don't compare against NULL
        expr_comparison_1.isNotNull(toReplace), expr_comparison_1.eq(toReplace, value))));
    }
    ;
    //WHERE CLAUSE
    //Replaces but ANDs with NARROW
    where(whereCallback) {
        let condition = whereCallback(this.data.columnReferences, this);
        if (this.extraData.narrowExpr != undefined) {
            condition = expr_logical_1.and(this.extraData.narrowExpr, condition);
        }
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { whereExpr: condition }));
    }
    ;
    //Appends
    andWhere(whereCallback) {
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
        this.assertBeforeUnion();
        const selectTuple = selectCallback(this.data.columnReferences, this);
        const newTuple = this.appendSelectTuple(selectTuple);
        if (select_1.selectTupleHasDuplicateColumn(newTuple)) {
            throw new Error(`Duplicate column found, try aliasing`);
        }
        return new SelectBuilder(type_util_1.spread(this.data, {
            hasSelect: true,
            selectReferences: column_references_operation_1.combineReferences(this.data.selectReferences, 
            //We don't need to convert the entire newTuple to references
            //Since part of newTuple was already converted before
            select_1.selectTupleToReferences(selectTuple)),
            selectTuple: newTuple,
        }), this.extraData);
    }
    ;
    selectAll() {
        this.assertBeforeUnion();
        if (this.data.selectTuple != undefined) {
            throw new Error("selectAll() must be called before select()");
        }
        return new SelectBuilder(type_util_1.spread(this.data, {
            hasSelect: true,
            selectReferences: select_1.selectAllReference(this.data.columnReferences),
            selectTuple: select_1.joinTupleToSelectTuple(this.data.joins),
        }), this.extraData);
    }
    ;
    //DISTINCT CLAUSE
    //distinct ();
    //distinct<DistinctT extends boolean> (distinct : DistinctT);
    distinct(distinct = true) {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { distinct: distinct }));
    }
    //SQL_CALC_FOUND_ROWS CLAUSE
    //sqlCalcFoundRows ();
    //sqlCalcFoundRows<SqlCalcFoundRowsT extends boolean> (sqlCalcFoundRows : SqlCalcFoundRowsT);
    sqlCalcFoundRows(sqlCalcFoundRows = true) {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { sqlCalcFoundRows: sqlCalcFoundRows }));
    }
    //GROUP BY CLAUSE
    //Replaces
    groupBy(groupByCallback) {
        const tuple = groupByCallback(column_references_operation_1.combineReferences(
        //For GROUP BY, we replace the selectReferences with columnReferences
        this.data.selectReferences, this.data.columnReferences), this);
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { groupByTuple: tuple }));
    }
    ;
    //Appends
    appendGroupBy(groupByCallback) {
        const tuple = groupByCallback(column_references_operation_1.combineReferences(
        //For GROUP BY, we replace the selectReferences with columnReferences
        this.data.selectReferences, this.data.columnReferences), this);
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { groupByTuple: (this.extraData.groupByTuple == undefined) ?
                tuple :
                this.extraData.groupByTuple.concat(tuple) }));
    }
    ;
    //REMOVES GROUP BY
    unsetGroupBy() {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { groupByTuple: undefined }));
    }
    ;
    //HAVING CLAUSE
    having(havingCallback) {
        let condition = havingCallback(column_references_operation_1.combineReferences(this.data.columnReferences, this.data.selectReferences), this);
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { havingExpr: condition }));
    }
    ;
    //Appends
    andHaving(havingCallback) {
        let condition = havingCallback(type_util_1.spread(this.data.columnReferences, this.data.selectReferences), this);
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { havingExpr: (this.extraData.havingExpr == undefined) ?
                condition :
                expr_logical_1.and(this.extraData.havingExpr, condition) }));
    }
    ;
    //ORDER BY CLAUSE
    //Replaces
    orderBy(orderByCallback) {
        const tuple = orderByCallback(column_references_operation_1.combineReferences(this.data.columnReferences, this.data.selectReferences), this);
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { orderByTuple: tuple }));
    }
    ;
    //Appends
    appendOrderBy(orderByCallback) {
        const tuple = orderByCallback(column_references_operation_1.combineReferences(this.data.columnReferences, this.data.selectReferences), this);
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { orderByTuple: (this.extraData.orderByTuple == undefined) ?
                tuple :
                this.extraData.orderByTuple.concat(tuple) }));
    }
    ;
    //REMOVES ORDER BY
    unsetOrderBy() {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { orderByTuple: undefined }));
    }
    ;
    //LIMIT CLAUSE
    limit(rowCount) {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { limit: (this.extraData.limit == undefined) ?
                {
                    rowCount: rowCount,
                    offset: 0,
                } :
                {
                    rowCount: rowCount,
                    offset: this.extraData.limit.offset,
                } }));
    }
    ;
    //OFFSET CLAUSE
    offset(offset) {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { limit: (this.extraData.limit == undefined) ?
                {
                    rowCount: exports.ArbitraryRowCount,
                    offset: offset,
                } :
                {
                    rowCount: this.extraData.limit.rowCount,
                    offset: offset,
                } }));
    }
    ;
    //REMOVES LIMIT
    unsetLimit() {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { limit: undefined }));
    }
    ;
    //WIDEN CLAUSE
    widen(typeWidenCallback, assertWidened) {
        this.assertAfterSelect();
        const column = typeWidenCallback(this.data.selectReferences);
        if (!(column instanceof column_1.Column)) {
            throw new Error(`Expected a column`);
        }
        const newColumn = new column_1.Column(column.table, column.name, sd.or(column.assertDelegate, assertWidened));
        return new SelectBuilder(type_util_1.spread(this.data, {
            joins: join_1.replaceColumnOfJoinTuple(this.data.joins, newColumn),
            selectReferences: column_references_operation_1.replaceColumnOfReference(this.data.selectReferences, newColumn),
            selectTuple: (this.data.selectTuple == undefined ?
                undefined :
                select_1.replaceColumnOfSelectTuple(this.data.selectTuple, newColumn)),
        }), this.extraData);
    }
    ;
    //UNION CLAUSE
    union(other) {
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
        return new SelectBuilder(type_util_1.spread(this.data, {
            hasUnion: true,
        }), Object.assign({}, this.extraData, { union: (this.extraData.union == undefined) ?
                [other] :
                this.extraData.union.concat([other]) }));
    }
    ;
    //UNION ORDER BY CLAUSE
    //Replaces
    unionOrderBy(orderByCallback) {
        const tuple = orderByCallback(column_references_operation_1.combineReferences(this.data.columnReferences, this.data.selectReferences), this);
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { unionOrderByTuple: tuple }));
    }
    ;
    //Appends
    appendUnionOrderBy(orderByCallback) {
        const tuple = orderByCallback(column_references_operation_1.combineReferences(this.data.columnReferences, this.data.selectReferences), this);
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { unionOrderByTuple: (this.extraData.unionOrderByTuple == undefined) ?
                tuple :
                this.extraData.unionOrderByTuple.concat(tuple) }));
    }
    ;
    //REMOVES UNION ORDER BY
    unsetUnionOrderBy() {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { unionOrderByTuple: undefined }));
    }
    ;
    //UNION LIMIT CLAUSE
    unionLimit(rowCount) {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { unionLimit: (this.extraData.unionLimit == undefined) ?
                {
                    rowCount: rowCount,
                    offset: 0,
                } :
                {
                    rowCount: rowCount,
                    offset: this.extraData.unionLimit.offset,
                } }));
    }
    ;
    //UNION OFFSET CLAUSE
    unionOffset(offset) {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { unionLimit: (this.extraData.unionLimit == undefined) ?
                {
                    rowCount: exports.ArbitraryRowCount,
                    offset: offset,
                } :
                {
                    rowCount: this.extraData.unionLimit.rowCount,
                    offset: offset,
                } }));
    }
    ;
    //REMOVES UNION LIMIT
    unsetUnionLimit() {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { unionLimit: undefined }));
    }
    ;
    //AS CLAUSE
    as(alias) {
        this.assertAfterSelect();
        return new sub_select_join_table_1.SubSelectJoinTable(alias, this);
    }
    ;
    asExpr(alias) {
        this.assertAfterSelect();
        if (this.data.selectTuple == undefined || this.data.selectTuple.length != 1) {
            throw new Error(`Must SELECT one column only`);
        }
        if (!(this.data.selectTuple[0] instanceof expr_1.ColumnExpr) &&
            !(this.data.selectTuple[0] instanceof column_1.Column)) {
            throw new Error(`Invalid SELECT; must select a column or column expression`);
        }
        return expr_operation_1.toExpr(this).as(alias);
    }
    //AGGREGATE
    aggregate(aggregateCallback) {
        this.assertAfterSelect();
        return new SelectBuilder(type_util_1.spread(this.data, {
            aggregateCallback: aggregateCallback,
        }), this.extraData);
    }
    //QUERIFY
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
            this.extraData.unionOrderByTuple != undefined ||
            this.extraData.unionLimit != undefined);
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
        if (this.extraData.groupByTuple != undefined) {
            sb.appendLine("GROUP BY");
            const groupByTuple = this.extraData.groupByTuple;
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
        if (this.extraData.orderByTuple != undefined) {
            sb.appendLine("ORDER BY");
            const orderByTuple = this.extraData.orderByTuple;
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
            sb.map(this.extraData.union, (sb, u) => {
                sb.appendLine("UNION");
                sb.appendLine("(");
                sb.scope((sb) => {
                    u.querify(sb);
                });
                sb.appendLine(")");
            }, "\n");
        }
        if (this.extraData.unionOrderByTuple != undefined) {
            sb.appendLine("ORDER BY");
            const unionOrderByTuple = this.extraData.unionOrderByTuple;
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
    getSchema() {
        if (this.schema == undefined) {
            this.schema = column_references_operation_1.columnReferencesToSchemaWithJoins(this.data.selectReferences, this.data.joins);
        }
        return this.schema;
    }
    getQuery() {
        const sb = new StringBuilder_1.StringBuilder();
        this.querify(sb);
        return sb.toString();
    }
    fetchAll() {
        this.assertAfterSelect();
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
            return Promise.all(raw.rows.map(this.aggregateRow));
        });
    }
    fetchOne() {
        this.assertAfterSelect();
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
            if (raw.rows.length != 1) {
                throw new Error(`Expected one result, received ${raw.rows.length}`);
            }
            return this.aggregateRow(raw.rows[0]);
        });
    }
    fetchZeroOrOne() {
        this.assertAfterSelect();
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
            if (raw.rows.length > 1) {
                throw new Error(`Expected zero or one result, received ${raw.rows.length}`);
            }
            if (raw.rows.length == 0) {
                return undefined;
            }
            else {
                return this.aggregateRow(raw.rows[0]);
            }
        });
    }
    fetchValue() {
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
            return row[names[0]][names[1]];
        });
    }
    fetchValueOrUndefined() {
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
            return row[names[0]][names[1]];
        });
    }
    fetchValueArray() {
        this.assertAfterSelect();
        return this.extraData.db.selectAny(this.getQuery())
            .then((raw) => {
            if (raw.fields.length != 1) {
                throw new Error(`Expected one field, received ${raw.fields.length}`);
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
    exists() {
        if (this.data.selectTuple == undefined) {
            return this.extraData.db.getBoolean(`
                SELECT EXISTS (
                    SELECT
                        *
                    FROM
                        ${this.getQuery()}
                )
            `);
        }
        else {
            return this.extraData.db.getBoolean(`
                SELECT EXISTS (
                    ${this.getQuery()}
                )
            `);
        }
    }
    paginate(rawPaginationArgs = {}) {
        this.assertAfterSelect();
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
            hasSelect: false,
            hasUnion: false,
            columnReferences: table_operation_1.tableToReference(table),
            joins: [type_util_1.check({
                    joinType: "FROM",
                    table: table,
                    columnReferences: table_operation_1.tableToReference(table),
                    nullable: false,
                    from: undefined,
                    to: undefined,
                })],
            selectReferences: {},
            selectTuple: undefined,
            aggregateCallback: undefined,
        }, {
            db: db,
            distinct: false,
            sqlCalcFoundRows: false,
        });
    };
}
exports.newCreateSelectBuilderDelegate = newCreateSelectBuilderDelegate;
//# sourceMappingURL=select-builder.js.map