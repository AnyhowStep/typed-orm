"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
Every time you see a return type of `this`, it is an ugly hack.
It doesn't actually return `this`.

It returns a new instance with the same `DataT` as `this`.
Required because TypeScript gets confused with generics.
*/
const join_collection_1 = require("./join-collection");
const type_util_1 = require("@anyhowstep/type-util");
const join_1 = require("./join");
const select_collection_1 = require("./select-collection");
const fetch_row_1 = require("./fetch-row");
const aggregate_delegate_1 = require("./aggregate-delegate");
const type_narrow_delegate_1 = require("./type-narrow-delegate");
const column_1 = require("./column");
const where_delegate_1 = require("./where-delegate");
const group_by_delegate_1 = require("./group-by-delegate");
const having_delegate_1 = require("./having-delegate");
const order_by_delegate_1 = require("./order-by-delegate");
const type_widen_delegate_1 = require("./type-widen-delegate");
const union_order_by_delegate_1 = require("./union-order-by-delegate");
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
const select_builder_util_1 = require("./select-builder-util");
const join_declaration_1 = require("./join-declaration");
const table_2 = require("./table");
table_2.Table;
//TODO Move elsewhere
exports.ARBITRARY_ROW_COUNT = 999999999;
exports.__DUMMY_FROM_TABLE = table_1.table("__DUMMY_FROM_TABLE", {}).build();
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
            if (this.extraData.db.isUtcOnly()) {
                //We do this because, sometimes, we get dates in string format,
                //without the timezone part.
                //Then, when attempting to convert to `Date`, we lose the
                //timezone information.
                //This code block attempts to correct for Timezone differences
                const stringPaths = SelectBuilder.FindStringPaths(result);
                result = this.getRowAssertDelegate()("row", result);
                for (let path of stringPaths) {
                    const date = SelectBuilder.TryGetDateAtPath(result, path);
                    if (date != undefined) {
                        date.setUTCHours(date.getUTCHours() - date.getTimezoneOffset() / 60);
                    }
                }
            }
            else {
                result = this.getRowAssertDelegate()("row", result);
            }
            return result;
        };
        this.aggregateRow = (rawRow) => __awaiter(this, void 0, void 0, function* () {
            let result = this.processRow(rawRow);
            if (this.extraData.aggregateDelegates == undefined) {
                return result;
            }
            else {
                const originalRow = result;
                for (let d of this.extraData.aggregateDelegates) {
                    if (aggregate_delegate_1.AggregateDelegateUtil.isAggregateDelegate(d)) {
                        result = yield d(result);
                    }
                    else {
                        result = yield d(result, originalRow);
                    }
                }
                return result;
            }
        });
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
        return select_builder_util_1.SelectBuilderUtil.from(this, toTable);
    }
    join(toTable, fromDelegate, toDelegate) {
        return select_builder_util_1.SelectBuilderUtil.doJoin(this, toTable, fromDelegate, toDelegate);
    }
    //Unsafe because it does not check for duplicates during compile-time
    joinUnsafe(toTable, fromDelegate, toDelegate) {
        return this.join(toTable, fromDelegate, toDelegate);
    }
    joinUsing(toTable, fromDelegate) {
        this.assertAfterFrom();
        return new SelectBuilder(type_util_1.spread(this.data, {
            joins: join_collection_1.JoinCollectionUtil.innerJoinUsing(this, toTable, fromDelegate)
        }), this.extraData);
    }
    //Unsafe because it does not check for duplicates during compile-time
    joinUsingUnsafe(toTable, fromDelegate) {
        return this.joinUsing(toTable, fromDelegate);
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
    //Unsafe because it does not check for duplicates during compile-time
    rightJoinUnsafe(toTable, fromDelegate, toDelegate) {
        return this.rightJoin(toTable, fromDelegate, toDelegate);
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
    //Unsafe because it does not check for duplicates during compile-time
    rightJoinUsingUnsafe(toTable, fromDelegate) {
        return this.rightJoinUsing(toTable, fromDelegate);
    }
    leftJoin(toTable, fromDelegate, toDelegate) {
        this.assertAfterFrom();
        return new SelectBuilder(type_util_1.spread(this.data, {
            joins: join_collection_1.JoinCollectionUtil.leftJoin(this, toTable, fromDelegate, toDelegate)
        }), this.extraData);
    }
    //Unsafe because it does not check for duplicates during compile-time
    leftJoinUnsafe(toTable, fromDelegate, toDelegate) {
        return this.leftJoinUnsafe(toTable, fromDelegate, toDelegate);
    }
    leftJoinUsing(toTable, fromDelegate) {
        this.assertAfterFrom();
        return new SelectBuilder(type_util_1.spread(this.data, {
            joins: join_collection_1.JoinCollectionUtil.leftJoinUsing(this, toTable, fromDelegate)
        }), this.extraData);
    }
    //Unsafe because it does not check for duplicates during compile-time
    leftJoinUsingUnsafe(toTable, fromDelegate) {
        return this.leftJoinUsing(toTable, fromDelegate);
    }
    /*
        Gives the Cartesian product.
        Example:
        |      Table A      |
        | columnA | columnB |
        | 1       | hello   |
        | 2       | world   |

        |      Table B      |
        | columnC | columnD |
        | qwerty  | 321     |
        | stuff   | 654     |
        | yellow  | 987     |

        SELECT
            *
        FROM
            `Table A`
        CROSS JOIN
            `Table B`

        Will give you:
        | columnA | columnB | columnC | columnD |
        | 1       | hello   | qwerty  | 321     |
        | 1       | hello   | stuff   | 654     |
        | 1       | hello   | yellow  | 987     |
        | 2       | world   | qwerty  | 321     |
        | 2       | world   | stuff   | 654     |
        | 2       | world   | yellow  | 987     |

        { a, b } x { 1, 2, 3 } = { (a,1), (a,2), (a,3), (b,1), (b,2), (b,3) }
    */
    crossJoin(toTable) {
        this.assertAfterFrom();
        return new SelectBuilder(type_util_1.spread(this.data, {
            joins: join_collection_1.JoinCollectionUtil.crossJoin(this, toTable)
        }), this.extraData);
    }
    //Unsafe because it does not check for duplicates during compile-time
    crossJoinUnsafe(toTable) {
        return this.crossJoin(toTable);
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
    selectUnsafe(selectDelegate) {
        return this.select(selectDelegate);
    }
    //Must be called before any other `SELECT` methods
    //because it'll set the select clause to whatever is at the joins,
    //We never want to overwrite the select clause, only append.
    //Must be called after `FROM` to have tables to select from.
    //Must be called before `UNION` because it will change the number of
    //columns expected.
    selectAll() {
        return select_builder_util_1.SelectBuilderUtil.selectAll(this);
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
    aggregate(aggregateDelegate) {
        this.assertAfterSelect();
        return new SelectBuilder(type_util_1.spread(this.data, {
            aggregateDelegate: aggregateDelegate
        }), type_util_1.spread(this.extraData, {
            aggregateDelegates: ((this.extraData.aggregateDelegates == undefined) ?
                [aggregateDelegate] :
                this.extraData.aggregateDelegates.concat(aggregateDelegate))
        }));
    }
    unsetAggregate() {
        return new SelectBuilder(type_util_1.spread(this.data, {
            aggregateDelegate: undefined
        }), type_util_1.spread(this.extraData, {
            aggregateDelegates: undefined
        }));
    }
    getRowAssertDelegate() {
        if (this.rowAssertDelegate == undefined) {
            this.rowAssertDelegate = fetch_row_1.FetchRowUtil.assertDelegate(this.data.joins, select_collection_1.SelectCollectionUtil.toColumnReferences(this.data.selects));
        }
        return this.rowAssertDelegate;
    }
    static FindStringPaths(obj, path = [], result = []) {
        if (obj == undefined) {
            return result;
        }
        if (obj instanceof Date) {
            return result;
        }
        if (!(obj instanceof Object)) {
            return result;
        }
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                if (typeof value == "string") {
                    result.push(path.concat(key));
                }
                else {
                    SelectBuilder.FindStringPaths(value, path.concat(key), result);
                }
            }
        }
        return result;
    }
    static TryGetDateAtPath(obj, path) {
        for (let key of path) {
            if (obj == undefined || !(obj instanceof Object)) {
                return undefined;
            }
            if (!obj.hasOwnProperty(key)) {
                return undefined;
            }
            obj = obj[key];
        }
        //`obj` should be the value we are testing
        if (obj instanceof Date) {
            return obj;
        }
        else {
            return undefined;
        }
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
    /*
        TODO Improve this, technically, `FROM` clause isn't even required,
        even if that means the query isn't very useful.

        The following are valid, even if nonsensical,

        SELECT EXISTS (SELECT *)    //Returns TRUE
        SELECT EXISTS (SELECT NULL) //Returns TRUE
    */
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
    cursor() {
        //In case Symbol.asyncIterator is not defined
        Symbol.asyncIterator = (Symbol.asyncIterator == undefined) ?
            Symbol.for("Symbol.asyncIterator") :
            Symbol.asyncIterator;
        let rowIndex = 0;
        let paginateResultCache = undefined;
        const getOrFetchPaginated = () => __awaiter(this, void 0, void 0, function* () {
            if (paginateResultCache == undefined) {
                rowIndex = 0;
                paginateResultCache = (yield this.paginate({ page: 0 }));
            }
            return paginateResultCache;
        });
        const tryFetchNextPage = () => __awaiter(this, void 0, void 0, function* () {
            const paginated = yield getOrFetchPaginated();
            const nextPage = paginated.info.page + 1;
            if (nextPage < paginated.info.pagesFound) {
                rowIndex = 0;
                paginateResultCache = (yield this.paginate({ page: nextPage }));
                return paginateResultCache;
            }
            else {
                return undefined;
            }
        });
        const tryGetNextItem = () => __awaiter(this, void 0, void 0, function* () {
            const paginated = yield getOrFetchPaginated();
            if (rowIndex < paginated.rows.length) {
                const value = paginated.rows[rowIndex];
                ++rowIndex;
                return value;
            }
            else {
                return undefined;
            }
        });
        return {
            next: () => __awaiter(this, void 0, void 0, function* () {
                //Try and get the next item of the current page
                const value = yield tryGetNextItem();
                if (value !== undefined) {
                    return {
                        done: false,
                        value: value,
                    };
                }
                //If we're here, we passed the end of the current page
                {
                    //Load the next page
                    yield tryFetchNextPage();
                    //Try to get the next item
                    const value = yield tryGetNextItem();
                    if (value !== undefined) {
                        return {
                            done: false,
                            value: value,
                        };
                    }
                    else {
                        //We passed the end of the last page
                        return {
                            done: true,
                            value: undefined,
                        };
                    }
                }
            }),
            [Symbol.asyncIterator]() {
                return this;
            }
        };
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
        let assertDelegate = sd.literal(value);
        if (value === true) {
            assertDelegate = sd.numberToTrue();
        }
        else if (value === false) {
            assertDelegate = sd.numberToFalse();
        }
        return this.narrow(new column_1.Column(column.tableAlias, column.name, assertDelegate, column.subTableName, column.isSelectReference), e.isNotNullAndEq(column, value));
    }
    ;
    //WHERE CLAUSE
    //Unsets the `WHERE` clause but retains the `NARROW` part
    unsetWhere() {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { whereExpr: this.extraData.narrowExpr }));
    }
    //Must be called after `FROM` as per MySQL
    //where() and andWhere() are synonyms
    where(whereDelegate) {
        return this.andWhere(whereDelegate);
    }
    //Must be called after `FROM` as per MySQL
    //where() and andWhere() are synonyms
    andWhere(whereDelegate) {
        this.assertAfterFrom();
        let whereExpr = where_delegate_1.WhereDelegateUtil.execute(this, whereDelegate);
        if (this.extraData.whereExpr == undefined) {
            if (this.extraData.narrowExpr != undefined) {
                whereExpr = e.and(this.extraData.narrowExpr, whereExpr);
            }
            return new SelectBuilder(this.data, Object.assign({}, this.extraData, { whereExpr: whereExpr }));
        }
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { whereExpr: e.and(this.extraData.whereExpr, whereExpr) }));
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
        const orderBy = order_by_delegate_1.OrderByDelegateUtil.execute(this, orderByDelegate);
        if (orderBy == undefined) {
            return this;
        }
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { orderBy: this.extraData.orderBy.concat(orderBy) }));
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
    unionOrderBy(unionOrderByDelegate) {
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { unionOrderBy: union_order_by_delegate_1.UnionOrderByDelegateUtil.execute(this, unionOrderByDelegate) }));
    }
    //Appends
    appendUnionOrderBy(unionOrderByDelegate) {
        if (this.extraData.unionOrderBy == undefined) {
            return this.unionOrderBy(unionOrderByDelegate);
        }
        const orderBy = union_order_by_delegate_1.UnionOrderByDelegateUtil.execute(this, unionOrderByDelegate);
        if (orderBy == undefined) {
            return this;
        }
        return new SelectBuilder(this.data, Object.assign({}, this.extraData, { unionOrderBy: this.extraData.unionOrderBy.concat(orderBy) }));
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
            if (join.joinType == join_1.JoinType.CROSS) {
                return;
            }
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
    setParentQuery(parent) {
        if (this.data.hasParentJoins) {
            throw new Error(`This query already has a parent query`);
        }
        if (this.data.hasFrom) {
            if (parent.data.hasParentJoins) {
                join_collection_1.JoinCollectionUtil.assertNoDuplicates(this.data.joins, parent.data.parentJoins);
            }
            if (parent.data.hasFrom) {
                join_collection_1.JoinCollectionUtil.assertNoDuplicates(this.data.joins, parent.data.joins);
            }
        }
        if (this.data.hasParentJoins) {
            if (parent.data.hasParentJoins) {
                join_collection_1.JoinCollectionUtil.assertNoDuplicates(this.data.parentJoins, parent.data.parentJoins);
            }
            if (parent.data.hasFrom) {
                join_collection_1.JoinCollectionUtil.assertNoDuplicates(this.data.parentJoins, parent.data.joins);
            }
        }
        if (parent.data.hasParentJoins) {
            if (parent.data.hasFrom) {
                return new SelectBuilder(Object.assign({}, this.data, { hasParentJoins: true, parentJoins: parent.data.parentJoins
                        .concat(parent.data.joins) }), this.extraData);
            }
            else {
                return new SelectBuilder(Object.assign({}, this.data, { hasParentJoins: true, parentJoins: parent.data.parentJoins }), this.extraData);
            }
        }
        else {
            if (parent.data.hasFrom) {
                return new SelectBuilder(Object.assign({}, this.data, { hasParentJoins: true, parentJoins: parent.data.joins }), this.extraData);
            }
            else {
                //Unchanged, the parent doesn't even have its own JOINS
                //or a parent scope
                return this;
            }
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
    declareInnerJoinsUnsafe(...tables) {
        return new SelectBuilder(Object.assign({}, this.data, { declaredInnerJoins: tables }), this.extraData);
    }
    //Unsafe because a lot of compile-time checks are missing
    defineInnerJoinsUnsafe(arr) {
        let result = this;
        for (let i = 0; i < arr.length; ++i) {
            const t = this.data.declaredInnerJoins[i];
            const f = arr[i];
            result = result.joinUsing(t, f);
        }
        return result;
    }
    declareJoinsUnsafe(...arr) {
        return new SelectBuilder(Object.assign({}, this.data, { declaredJoins: arr }), this.extraData);
    }
    //Unsafe because a lot of compile-time checks are missing
    defineJoinsUnsafe(arr) {
        let result = this;
        for (let i = 0; i < arr.length; ++i) {
            const t = this.data.declaredJoins[i][1];
            const f = arr[i];
            const type = this.data.declaredJoins[i][0];
            if (type == join_1.JoinType.INNER) {
                result = result.joinUsing(t, f);
            }
            else if (type == join_1.JoinType.LEFT) {
                result = result.leftJoinUsing(t, f);
            }
            else if (type == join_1.JoinType.CROSS) {
                result = result.crossJoin(t);
            }
            else {
                throw new Error(`Unknown JoinType ${type}`);
            }
        }
        return result;
    }
    useJoins(...arr) {
        let result = this;
        for (let i = 0; i < arr.length; ++i) {
            const toTable = join_declaration_1.JoinDeclarationUtil.toTableOf(arr[i]);
            const fromD = () => join_declaration_1.JoinDeclarationUtil.fromColumnsOf(arr[i]);
            const toD = () => join_declaration_1.JoinDeclarationUtil.toColumnsOf(arr[i]);
            const type = join_declaration_1.JoinDeclarationUtil.joinTypeOf(arr[i]);
            if (type == join_1.JoinType.INNER) {
                result = result.join(toTable, fromD, toD);
            }
            else if (type == join_1.JoinType.LEFT) {
                result = result.leftJoin(toTable, fromD, toD);
            }
            else if (type == join_1.JoinType.CROSS) {
                result = result.crossJoin(toTable);
            }
            else {
                throw new Error(`Unknown JoinType ${type}`);
            }
        }
        return result;
    }
}
exports.SelectBuilder = SelectBuilder;
//# sourceMappingURL=select-builder.js.map