"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_collection_1 = require("./join-collection");
const type_util_1 = require("@anyhowstep/type-util");
const join_1 = require("./join");
const select_collection_1 = require("./select-collection");
const fetch_row_1 = require("./fetch-row");
const type_narrow_delegate_1 = require("./type-narrow-delegate");
const column_1 = require("./column");
const where_delegate_1 = require("./where-delegate");
const group_by_delegate_1 = require("./group-by-delegate");
const having_delegate_1 = require("./having-delegate");
const order_by_delegate_1 = require("./order-by-delegate");
const type_widen_delegate_1 = require("./type-widen-delegate");
const sd = require("schema-decorator");
const table_1 = require("./table");
const expr_1 = require("./expr");
const StringBuilder_1 = require("./StringBuilder");
const e = require("./expression");
const aliased_expr_1 = require("./aliased-expr");
const mysql = require("typed-mysql");
const subquery_table_1 = require("./subquery-table");
const raw_expr_1 = require("./raw-expr");
const update_builder_1 = require("./update-builder");
const insert_select_builder_1 = require("./insert-select-builder");
const delete_builder_1 = require("./delete-builder");
const table_2 = require("./table");
table_2.Table;
//TODO Move elsewhere
exports.ARBITRARY_ROW_COUNT = 999999999;
exports.__DUMMY_FROM_TABLE = table_1.table("__DUMMY_FROM_TABLE", {});
class SelectBuilder {
    constructor(data, extraData) {
        this.rowAssertDelegate = undefined;
        this.processRow = (rawRow) => {
            let result = {};
            for (let mangledName in rawRow) {
                const names = mangledName.split("--");
                const table = names[0];
                const column = names[1];
                if (result[table] == undefined) {
                    result[table] = {};
                }
                result[table][column] = rawRow[mangledName];
            }
            const tableAliases = Object.keys(result);
            if (tableAliases.length == 1) {
                result = result[tableAliases[0]];
            }
            result = this.getRowAssertDelegate()("row", result);
            return result;
        };
        this.aggregateRow = (rawRow) => {
            let result = this.processRow(rawRow);
            if (this.data.aggregateDelegate == undefined) {
                return result;
            }
            else {
                return this.data.aggregateDelegate(result);
            }
        };
        this.data = data;
        this.extraData = extraData;
    }
    assertAfterFrom() {
        if (!this.data.hasFrom) {
            throw new Error(`Must be called after FROM clause`);
        }
    }
    assertBeforeSelect() {
        if (this.data.hasSelect) {
            throw new Error(`Must be called before SELECT clause`);
        }
    }
    assertAfterSelect() {
        if (!this.data.hasSelect) {
            throw new Error(`Must be called after SELECT clause`);
        }
    }
    assertBeforeUnion() {
        if (this.data.hasUnion) {
            throw new Error(`Must be called before UNION clause`);
        }
    }
    //Must be done before any JOINs, as per MySQL
    from(toTable) {
        if (this.data.hasFrom) {
            throw new Error(`FROM clause already exists`);
        }
        if (this.data.hasParentJoins) {
            join_collection_1.JoinCollectionUtil.assertNonDuplicateTableAlias(this.data.parentJoins, toTable.alias);
        }
        return new SelectBuilder(type_util_1.spread(this.data, {
            hasFrom: true,
            joins: [
                new join_1.Join(join_1.JoinType.FROM, toTable, toTable.columns, false, [], [])
            ]
        }), this.extraData);
    }
    join(toTable, fromDelegate, toDelegate) {
        this.assertAfterFrom();
        return new SelectBuilder(type_util_1.spread(this.data, {
            joins: join_collection_1.JoinCollectionUtil.innerJoin(this, toTable, fromDelegate, toDelegate)
        }), this.extraData);
    }
    joinUsing(toTable, fromDelegate) {
        this.assertAfterFrom();
        return new SelectBuilder(type_util_1.spread(this.data, {
            joins: join_collection_1.JoinCollectionUtil.innerJoinUsing(this, toTable, fromDelegate)
        }), this.extraData);
    }
    //We don't allow right joins after selecting
    //because it'll narrow the data type of selected columns
    rightJoin(toTable, fromDelegate, toDelegate) {
        this.assertBeforeSelect();
        this.assertAfterFrom();
        return new SelectBuilder(type_util_1.spread(this.data, {
            joins: join_collection_1.JoinCollectionUtil.rightJoin(this, toTable, fromDelegate, toDelegate)
        }), this.extraData);
    }
    //We don't allow right joins after selecting
    //because it'll narrow the data type of selected columns
    rightJoinUsing(toTable, fromDelegate) {
        this.assertBeforeSelect();
        this.assertAfterFrom();
        return new SelectBuilder(type_util_1.spread(this.data, {
            joins: join_collection_1.JoinCollectionUtil.rightJoinUsing(this, toTable, fromDelegate)
        }), this.extraData);
    }
    leftJoin(toTable, fromDelegate, toDelegate) {
        this.assertAfterFrom();
        return new SelectBuilder(type_util_1.spread(this.data, {
            joins: join_collection_1.JoinCollectionUtil.leftJoin(this, toTable, fromDelegate, toDelegate)
        }), this.extraData);
    }
    leftJoinUsing(toTable, fromDelegate) {
        this.assertAfterFrom();
        return new SelectBuilder(type_util_1.spread(this.data, {
            joins: join_collection_1.JoinCollectionUtil.leftJoinUsing(this, toTable, fromDelegate)
        }), this.extraData);
    }
    //Must be called before UNION because it will change the number of
    //columns expected.
    select(selectDelegate) {
        this.assertBeforeUnion();
        const selects = select_collection_1.SelectCollectionUtil.appendSelect(this.data.selects, this, selectDelegate);
        return new SelectBuilder(type_util_1.spread(this.data, {
            hasSelect: true,
            selects: selects
        }), this.extraData);
    }
    //Must be called before any other `SELECT` methods
    //because it'll set the select clause to whatever is at the joins,
    //We never want to overwrite the select clause, only append.
    //Must be called after `FROM` to have tables to select from.
    //Must be called before `UNION` because it will change the number of
    //columns expected.
    selectAll() {
        this.assertBeforeSelect();
        this.assertAfterFrom();
        this.assertBeforeUnion();
        return new SelectBuilder(type_util_1.spread(this.data, {
            hasSelect: true,
            selects: select_collection_1.SelectCollectionUtil.fromJoinCollection(this.data.joins)
        }), this.extraData);
    }
    //Must be called after `FROM`; makes no sense
    //to replace tables if there aren't any...
    replaceTable(tableA, tableB) {
        this.assertAfterFrom();
        const replaced = join_collection_1.JoinCollectionUtil.replaceTable(this.data.joins, tableA, tableB);
        return new SelectBuilder(type_util_1.spread(this.data, {
            joins: replaced
        }), this.extraData);
    }
    //Must be called after `SELECT` or there will be
    //no columns to aggregate...
    aggregate(aggregateDelegate) {
        this.assertAfterSelect();
        return new SelectBuilder(type_util_1.spread(this.data, {
            aggregateDelegate: aggregateDelegate
        }), this.extraData);
    }
    getRowAssertDelegate() {
        if (this.rowAssertDelegate == undefined) {
            this.rowAssertDelegate = fetch_row_1.FetchRowUtil.assertDelegate(this.data.joins, select_collection_1.SelectCollectionUtil.toColumnReferences(this.data.selects));
        }
        return this.rowAssertDelegate;
    }
    fetchAll() {
        this.assertAfterSelect();
        return this.extraData.db.selectAllAny(this.getQuery())
            .then(({ rows }) => {
            return Promise.all(rows.map(this.aggregateRow));
        });
    }
    fetchOne() {
        this.assertAfterSelect();
        return this.extraData.db.selectOneAny(this.getQuery())
            .then(({ row }) => {
            return this.aggregateRow(row);
        });
    }
    fetchZeroOrOne() {
        this.assertAfterSelect();
        return this.extraData.db.selectZeroOrOneAny(this.getQuery())
            .then(({ row }) => {
            if (row == undefined) {
                return undefined;
            }
            return this.aggregateRow(row);
        });
    }
    //TODO May not always work if GROUP BY, HAVING clauses use a select-expression,
    //TODO May not work as intended with UNION selects
    //Maybe just unset UNION LIMIT, or LIMIT
    //Must be called after `FROM` or there will be no tables to count from
    count() {
        this.assertAfterFrom();
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
        if (this.data.selects == undefined) {
            //We have not called select() yet
            return this.select(() => [e.COUNT_ALL.as("count")])
                .fetchValue();
        }
        else {
            //Already called select
            return this.extraData.db.selectNaturalNumber(`
                SELECT
                    COUNT(*) AS count
                FROM
                    (${this.getQuery()}) AS tmp
            `);
        }
    }
    //Must be called after `FROM` or there will be no tables to check existence from
    exists() {
        this.assertAfterFrom();
        if (this.data.selects == undefined) {
            return this.extraData.db.selectBoolean(`
                SELECT EXISTS (
                    SELECT
                        *
                    ${this.getQuery()}
                )
            `);
        }
        else {
            return this.extraData.db.selectBoolean(`
                SELECT EXISTS (
                    ${this.getQuery()}
                )
            `);
        }
    }
    //Uses count() internally
    paginate(rawPaginationArgs = {}) {
        this.assertAfterSelect();
        const paginationArgs = mysql.toPaginationArgs(rawPaginationArgs, this.extraData.db.getPaginationConfiguration());
        return this.count()
            .then((itemsFound) => {
            const pagesFound = mysql.calculatePagesFound(paginationArgs, itemsFound);
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
    fetchValue() {
        this.assertAfterSelect();
        return this.extraData.db.selectOneAny(this.getQuery())
            .then(({ row, fields }) => {
            if (fields.length != 1) {
                throw new Error(`Expected one field, received ${fields.length}`);
            }
            const result = this.processRow(row);
            return result[Object.keys(result)[0]];
        });
    }
    fetchValueOrUndefined() {
        this.assertAfterSelect();
        return this.extraData.db.selectZeroOrOneAny(this.getQuery())
            .then(({ row, fields }) => {
            if (fields.length != 1) {
                throw new Error(`Expected one field, received ${fields.length}`);
            }
            if (row == undefined) {
                return undefined;
            }
            const result = this.processRow(row);
            return result[Object.keys(result)[0]];
        });
    }
    fetchValueArray() {
        this.assertAfterSelect();
        return this.extraData.db.selectAllAny(this.getQuery())
            .then(({ rows, fields }) => {
            if (fields.length != 1) {
                throw new Error(`Expected one field, received ${fields.length}`);
            }
            const columnName = fields[0].name.split("--")[1];
            return rows
                .map(this.processRow)
                .map((row) => row[columnName]);
        });
    }
    narrow(column, condition) {
        const joins = join_collection_1.JoinCollectionUtil.replaceColumnType(this.data.joins, column.tableAlias, column.name, column.assertDelegate);
        const selects = select_collection_1.SelectCollectionUtil.replaceSelectType(this.data.selects, column.tableAlias, column.name, column.assertDelegate);
        let narrowExpr = this.extraData.narrowExpr;
        if (narrowExpr == undefined) {
            narrowExpr = condition;
        }
        else {
            narrowExpr = e.and(narrowExpr, condition);
        }
        let whereExpr = this.extraData.whereExpr;
        if (whereExpr == undefined) {
            whereExpr = condition;
        }
        else {
            whereExpr = e.and(condition, whereExpr);
        }
        return new SelectBuilder(type_util_1.spread(this.data, {
            joins: joins,
            selects: selects,
        }), Object.assign({}, this.extraData, { narrowExpr: narrowExpr, whereExpr: whereExpr }));
    }
    //Narrowing is only allowed before UNION
    //because columns of the UNION may require
    //a data type that could become disallowed by narrowing.
    //Cannot un-narrow; should not be allowed to un-narrow,
    //other expressions may rely on the narrowed type.
    //Must be called after `FROM` or there will be no columns
    //to narrow.
    whereIsNotNull(typeNarrowDelegate) {
        this.assertAfterFrom();
        this.assertBeforeUnion();
        const column = type_narrow_delegate_1.TypeNarrowDelegateUtil.getColumn(this.data.joins, typeNarrowDelegate);
        return this.narrow(new column_1.Column(column.tableAlias, column.name, sd.notNullable(column.assertDelegate), column.subTableName, column.isSelectReference), e.isNotNull(column));
    }
    ;
    whereIsNull(typeNarrowDelegate) {
        this.assertAfterFrom();
        this.assertBeforeUnion();
        const column = type_narrow_delegate_1.TypeNarrowDelegateUtil.getColumn(this.data.joins, typeNarrowDelegate);
        return this.narrow(new column_1.Column(column.tableAlias, column.name, sd.nil(), column.subTableName, column.isSelectReference), e.isNull(column));
    }
    ;
    whereIsEqual(typeNarrowDelegate, value) {
        this.assertAfterFrom();
        this.assertBeforeUnion();
        sd.or(sd.boolean(), sd.number(), sd.string())("value", value);
        const column = type_narrow_delegate_1.TypeNarrowDelegateUtil.getColumn(this.data.joins, typeNarrowDelegate);
        let assertDelegate = sd.oneOf(value);
        if (value === true) {
            assertDelegate = ((name, mixed) => {
                const b = sd.numberToBoolean()(name, mixed);
                return sd.oneOf(true)(name, b);
            });
        }
        else if (value === false) {
            assertDelegate = ((name, mixed) => {
                const b = sd.numberToBoolean()(name, mixed);
                return sd.oneOf(false)(name, b);
            });
        }
        return this.narrow(new column_1.Column(column.tableAlias, column.name, assertDelegate, column.subTableName, column.isSelectReference), e.and(e.isNotNull(column), e.eq(column, value)));
    }
    ;
    //WHERE CLAUSE
    //Replaces but ANDs with NARROW
    //Must be called after `FROM` as per MySQL
    where(whereDelegate) {
        this.assertAfterFrom();
        let whereExpr = where_delegate_1.WhereDelegateUtil.execute(this, whereDelegate);
        if (this.extraData.narrowExpr != undefined) {
            whereExpr = e.and(this.extraData.narrowExpr, whereExpr);
        }
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { whereExpr: whereExpr }));
    }
    //Appends
    andWhere(whereDelegate) {
        this.assertAfterFrom();
        if (this.extraData.whereExpr == undefined) {
            return this.where(whereDelegate);
        }
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { whereExpr: e.and(this.extraData.whereExpr, where_delegate_1.WhereDelegateUtil.execute(this, whereDelegate)) }));
    }
    //DISTINCT CLAUSE
    distinct(distinct = true) {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { distinct: distinct }));
    }
    //SQL_CALC_FOUND_ROWS CLAUSE
    sqlCalcFoundRows(sqlCalcFoundRows = true) {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { sqlCalcFoundRows: sqlCalcFoundRows }));
    }
    //GROUP BY CLAUSE
    //Replaces
    //Must be called after `FROM` as per MySQL
    groupBy(groupByDelegate) {
        this.assertAfterFrom();
        const groupBy = group_by_delegate_1.GroupByDelegateUtil.execute(this, groupByDelegate);
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { groupBy: groupBy }));
    }
    //Appends
    appendGroupBy(groupByDelegate) {
        this.assertAfterFrom();
        if (this.extraData.groupBy == undefined) {
            return this.groupBy(groupByDelegate);
        }
        const groupBy = group_by_delegate_1.GroupByDelegateUtil.execute(this, groupByDelegate);
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { groupBy: this.extraData.groupBy.concat(groupBy) }));
    }
    //REMOVES GROUP BY
    unsetGroupBy() {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { groupBy: undefined }));
    }
    //HAVING CLAUSE
    //TECHNICALLY, can only use columns in GROUP BY, or columns in aggregate functions,
    //But MySQL supports an extension that allows columns from SELECT
    //As such, this library does not check for valid columns here
    //As long as it is in columnReferences or selectReferences.
    //Replaces
    //Must be called after `FROM` as per MySQL
    having(havingDelegate) {
        this.assertAfterFrom();
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { havingExpr: having_delegate_1.HavingDelegateUtil.execute(this, havingDelegate) }));
    }
    //Appends
    andHaving(havingDelegate) {
        this.assertAfterFrom();
        if (this.extraData.havingExpr == undefined) {
            return this.having(havingDelegate);
        }
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { havingExpr: e.and(this.extraData.havingExpr, having_delegate_1.HavingDelegateUtil.execute(this, havingDelegate)) }));
    }
    //ORDER BY CLAUSE
    //Replaces
    orderBy(orderByDelegate) {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { orderBy: order_by_delegate_1.OrderByDelegateUtil.execute(this, orderByDelegate) }));
    }
    //Appends
    appendOrderBy(orderByDelegate) {
        if (this.extraData.orderBy == undefined) {
            return this.orderBy(orderByDelegate);
        }
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { orderBy: this.extraData.orderBy.concat(order_by_delegate_1.OrderByDelegateUtil.execute(this, orderByDelegate)) }));
    }
    //REMOVES ORDER BY
    unsetOrderBy() {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { orderBy: undefined }));
    }
    //LIMIT CLAUSE
    limit(rowCount) {
        let limit = this.extraData.limit;
        if (limit == undefined) {
            limit = {
                rowCount: rowCount,
                offset: 0,
            };
        }
        else {
            limit = {
                rowCount: rowCount,
                offset: limit.offset,
            };
        }
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { limit: limit }));
    }
    //OFFSET CLAUSE
    offset(offset) {
        let limit = this.extraData.limit;
        if (limit == undefined) {
            limit = {
                rowCount: exports.ARBITRARY_ROW_COUNT,
                offset: offset,
            };
        }
        else {
            limit = {
                rowCount: limit.rowCount,
                offset: offset,
            };
        }
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { limit: limit }));
    }
    //REMOVES LIMIT
    unsetLimit() {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { limit: undefined }));
    }
    //UNION ORDER BY CLAUSE
    //Replaces
    unionOrderBy(orderByDelegate) {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { unionOrderBy: order_by_delegate_1.OrderByDelegateUtil.execute(this, orderByDelegate) }));
    }
    //Appends
    appendUnionOrderBy(orderByDelegate) {
        if (this.extraData.unionOrderBy == undefined) {
            return this.unionOrderBy(orderByDelegate);
        }
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { unionOrderBy: this.extraData.unionOrderBy.concat(order_by_delegate_1.OrderByDelegateUtil.execute(this, orderByDelegate)) }));
    }
    //UNION REMOVES ORDER BY
    unsetUnionOrderBy() {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { unionOrderBy: undefined }));
    }
    //UNION LIMIT CLAUSE
    unionLimit(rowCount) {
        let unionLimit = this.extraData.unionLimit;
        if (unionLimit == undefined) {
            unionLimit = {
                rowCount: rowCount,
                offset: 0,
            };
        }
        else {
            unionLimit = {
                rowCount: rowCount,
                offset: unionLimit.offset,
            };
        }
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { unionLimit: unionLimit }));
    }
    //UNION OFFSET CLAUSE
    unionOffset(offset) {
        let unionLimit = this.extraData.unionLimit;
        if (unionLimit == undefined) {
            unionLimit = {
                rowCount: exports.ARBITRARY_ROW_COUNT,
                offset: offset,
            };
        }
        else {
            unionLimit = {
                rowCount: unionLimit.rowCount,
                offset: offset,
            };
        }
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { unionLimit: unionLimit }));
    }
    //UNION REMOVES LIMIT
    unsetUnionLimit() {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { unionLimit: undefined }));
    }
    //Must be done after select or there will be no columns to widen.
    //Must be done before `aggregate()` because
    //it'll make the data type wider than `aggregate()` expects.
    widen(typeWidenDelegate, assertWidened) {
        this.assertAfterSelect();
        const widenedColumn = type_widen_delegate_1.TypeWidenDelegateUtil.execute(this.data.selects, typeWidenDelegate, assertWidened);
        const joins = join_collection_1.JoinCollectionUtil.replaceColumnType(this.data.joins, widenedColumn.tableAlias, widenedColumn.name, widenedColumn.assertDelegate);
        const selects = select_collection_1.SelectCollectionUtil.replaceSelectType(this.data.selects, widenedColumn.tableAlias, widenedColumn.name, widenedColumn.assertDelegate);
        return new SelectBuilder(type_util_1.spread(this.data, {
            joins: joins,
            selects: selects,
        }), this.extraData);
    }
    ;
    //UNION CLAUSE
    //Implicitly UNION DISTINCT
    union(target, 
    //Set to `false` to UNION ALL
    distinct = true) {
        this.assertAfterSelect();
        if (target.data.selects == undefined) {
            throw new Error(`Union target does not have a SELECT clause`);
        }
        if (this.data.selects == undefined) {
            throw new Error(`Could not find SELECT clause`);
        }
        select_collection_1.SelectCollectionUtil.assertHasCompatibleTypes(target.data.selects, this.data.selects);
        let union = this.extraData.union;
        if (union == undefined) {
            union = [];
        }
        union = union.concat({
            target: target,
            distinct: distinct,
        });
        return new SelectBuilder(type_util_1.spread(this.data, {
            hasUnion: true,
        }), Object.assign({}, this.extraData, { union: union }));
    }
    querifyJoins(sb) {
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
        const hasUnionSelect = (this.data.selects != undefined &&
            (this.extraData.union != undefined ||
                this.extraData.unionOrderBy != undefined ||
                this.extraData.unionLimit != undefined));
        if (hasUnionSelect) {
            sb.appendLine("(");
            sb.indent();
        }
        if (this.data.selects != undefined) {
            sb.append("SELECT");
            if (this.extraData.distinct) {
                sb.append(" DISTINCT");
            }
            if (this.extraData.sqlCalcFoundRows) {
                sb.append(" SQL_CALC_FOUND_ROWS");
            }
            sb.appendLine();
            const selects = this.data.selects;
            sb.scope((sb) => {
                sb.map(selects, (sb, element) => {
                    if (element instanceof aliased_expr_1.AliasedExpr) {
                        element.querify(sb);
                    }
                    else if (element instanceof column_1.Column) {
                        //const str = element.as(element.name).querify();
                        //return `\t${str}`;
                        const alias = mysql.escapeId(`${element.tableAlias}--${element.name}`);
                        element.querify(sb);
                        sb.append(` AS ${alias}`);
                    }
                    else if (element instanceof Object) {
                        const names = Object.keys(element).sort();
                        sb.map(names, (sb, name) => {
                            const sub = element[name];
                            const alias = mysql.escapeId(`${sub.tableAlias}--${sub.name}`);
                            sub.querify(sb);
                            sb.append(` AS ${alias}`);
                        }, ",\n");
                    }
                    else {
                        throw new Error(`Unknown select (${typeof element})${element}`);
                    }
                }, ",\n");
            });
        }
        if (this.data.hasFrom) {
            sb.appendLine("FROM");
            this.querifyJoins(sb);
        }
        this.querifyWhere(sb);
        if (this.extraData.groupBy != undefined) {
            sb.appendLine("GROUP BY");
            const groupBy = this.extraData.groupBy;
            sb.scope((sb) => {
                sb.map(groupBy, (sb, e) => {
                    if (e instanceof column_1.Column) {
                        e.querify(sb);
                    }
                    else {
                        sb.map(Object.keys(e), (sb, columnName) => {
                            e[columnName].querify(sb);
                        }, ",\n");
                    }
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
        if (this.extraData.orderBy != undefined) {
            sb.appendLine("ORDER BY");
            const orderBy = this.extraData.orderBy;
            sb.scope((sb) => {
                sb.map(orderBy, (sb, e) => {
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
        if (hasUnionSelect) {
            sb.unindent();
            sb.appendLine(")");
        }
        if (this.extraData.union != undefined) {
            sb.map(this.extraData.union, (sb, u) => {
                sb.append("UNION");
                if (u.distinct) {
                    sb.append(" DISTINCT");
                }
                else {
                    sb.append(" ALL");
                }
                sb.appendLine();
                sb.appendLine("(");
                sb.scope((sb) => {
                    u.target.querify(sb);
                });
                sb.appendLine(")");
            }, "\n");
        }
        if (this.extraData.unionOrderBy != undefined) {
            sb.appendLine("ORDER BY");
            const unionOrderBy = this.extraData.unionOrderBy;
            sb.scope((sb) => {
                sb.map(unionOrderBy, (sb, e) => {
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
    }
    getQuery() {
        const sb = new StringBuilder_1.StringBuilder();
        this.querify(sb);
        return sb.toString();
    }
    printQuery() {
        console.log(this.getQuery());
        return this;
    }
    as(alias) {
        this.assertAfterSelect();
        return new subquery_table_1.SubqueryTable(alias, this);
    }
    ;
    asExpr(alias) {
        this.assertAfterSelect();
        if (this.data.selects == undefined || this.data.selects.length != 1) {
            throw new Error(`Must SELECT one column only`);
        }
        if (!(this.data.selects[0] instanceof aliased_expr_1.AliasedExpr) &&
            !(this.data.selects[0] instanceof column_1.Column)) {
            throw new Error(`Invalid SELECT; must select a column or column expression`);
        }
        return raw_expr_1.RawExprUtil.toExpr(this).as(alias);
    }
    subQuery() {
        if (this.data.hasParentJoins) {
            const childBuilder = new SelectBuilder({
                hasSelect: false,
                hasFrom: false,
                hasUnion: false,
                //This is just a dummy JOIN
                //It will be replaced when the FROM clause is added
                joins: [
                    new join_1.Join(join_1.JoinType.FROM, exports.__DUMMY_FROM_TABLE, exports.__DUMMY_FROM_TABLE.columns, true, [], [])
                ],
                selects: undefined,
                aggregateDelegate: undefined,
                //Give this builder access to our JOINs
                hasParentJoins: true,
                parentJoins: (this.data.hasFrom ?
                    (this.data.parentJoins.concat(this.data.joins)) :
                    this.data.parentJoins),
            }, {
                db: this.extraData.db,
                distinct: false,
                sqlCalcFoundRows: false,
            });
            return childBuilder;
        }
        else {
            const childBuilder = new SelectBuilder({
                hasSelect: false,
                hasFrom: false,
                hasUnion: false,
                //This is just a dummy JOIN
                //It will be replaced when the FROM clause is added
                joins: [
                    new join_1.Join(join_1.JoinType.FROM, exports.__DUMMY_FROM_TABLE, exports.__DUMMY_FROM_TABLE.columns, true, [], [])
                ],
                selects: undefined,
                aggregateDelegate: undefined,
                //Give this builder access to our JOINs
                hasParentJoins: this.data.hasFrom,
                parentJoins: this.data.joins,
            }, {
                db: this.extraData.db,
                distinct: false,
                sqlCalcFoundRows: false,
            });
            return childBuilder;
        }
    }
    //Convenience
    insertInto(table, delegate) {
        return new insert_select_builder_1.InsertSelectBuilder(table, this, undefined, "NORMAL", this.extraData.db).set(delegate);
    }
    set(delegate) {
        return new update_builder_1.UpdateBuilder(this, undefined, false, this.extraData.db).set(delegate);
    }
    delete(delegate) {
        return new delete_builder_1.DeleteBuilder(this, undefined, false, this.extraData.db).tables(delegate);
    }
}
exports.SelectBuilder = SelectBuilder;
//# sourceMappingURL=select-builder.js.map