"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const join_1 = require("./join");
const aliased_table_1 = require("./aliased-table");
const column_1 = require("./column");
const expr_1 = require("./expr");
const column_ref_1 = require("./column-ref");
const join_array_1 = require("./join-array");
const select_item_array_1 = require("./select-item-array");
class Query {
    constructor(data, extraData) {
        this.joins = data.joins;
        this.parentJoins = data.parentJoins;
        this.unions = data.unions;
        this.selects = data.selects;
        this.limit = data.limit;
        this.unionLimit = data.unionLimit;
        this.extraData = extraData;
    }
    from(aliasedTable) {
        return Query.from(this, aliasedTable);
    }
    innerJoin(aliasedTable, fromDelegate, toDelegate) {
        return Query.innerJoin(this, aliasedTable, fromDelegate, toDelegate);
    }
}
exports.Query = Query;
(function (Query) {
    function isUnionQuery(raw) {
        return (raw != undefined &&
            (raw instanceof Object) &&
            ("distinct" in raw) &&
            ("query" in raw) &&
            (typeof raw.distinct == "boolean") &&
            isQuery(raw.query));
    }
    Query.isUnionQuery = isUnionQuery;
    function isUnionQueryArray(raw) {
        if (!(raw instanceof Array)) {
            return false;
        }
        for (let item of raw) {
            if (!isUnionQuery(item)) {
                return false;
            }
        }
        return true;
    }
    Query.isUnionQueryArray = isUnionQueryArray;
    function isLimit(raw) {
        return (raw != undefined &&
            (raw instanceof Object) &&
            ("rowCount" in raw) &&
            ("offset" in raw) &&
            (typeof raw.rowCount == "number") &&
            (typeof raw.offset == "number"));
    }
    Query.isLimit = isLimit;
    function isExtraQueryData(raw) {
        return (raw != undefined &&
            (raw instanceof Object) &&
            ("where" in raw) &&
            (raw.where == undefined ||
                expr_1.Expr.isExpr(raw.where)));
    }
    Query.isExtraQueryData = isExtraQueryData;
    function isQuery(raw) {
        return (raw != undefined &&
            (raw instanceof Object) &&
            ("joins" in raw) &&
            ("parentJoins" in raw) &&
            ("unions" in raw) &&
            ("selects" in raw) &&
            ("limit" in raw) &&
            ("unionLimit" in raw) &&
            ("extraData" in raw) &&
            (raw.joins == undefined ||
                join_array_1.JoinArrayUtil.isJoinArray(raw.joins)) &&
            (raw.parentJoins == undefined ||
                join_array_1.JoinArrayUtil.isJoinArray(raw.parentJoins)) &&
            (raw.unions == undefined ||
                isUnionQueryArray(raw.unions)) &&
            (raw.selects == undefined ||
                select_item_array_1.SelectItemArrayUtil.isSelectItemArray(raw.selects)) &&
            (raw.limit == undefined ||
                isLimit(raw.limit)) &&
            (raw.unionLimit == undefined ||
                isLimit(raw.unionLimit)) &&
            isExtraQueryData(raw.extraData));
    }
    Query.isQuery = isQuery;
    function newInstance() {
        return new Query({
            joins: undefined,
            parentJoins: undefined,
            unions: undefined,
            selects: undefined,
            limit: undefined,
            unionLimit: undefined,
        }, {
            where: undefined,
        });
    }
    Query.newInstance = newInstance;
    function assertUniqueJoinTarget(query, aliasedTable) {
        if (query.joins != undefined) {
            if (query.joins.some(j => j.aliasedTable.alias == aliasedTable.alias)) {
                throw new Error(`Alias ${aliasedTable.alias} already used in previous JOINs`);
            }
        }
        if (query.parentJoins != undefined) {
            if (query.parentJoins.some(j => j.aliasedTable.alias == aliasedTable.alias)) {
                throw new Error(`Alias ${aliasedTable.alias} already used in parent JOINs`);
            }
        }
    }
    Query.assertUniqueJoinTarget = assertUniqueJoinTarget;
    function isBeforeFromClause(query) {
        return query.joins == undefined;
    }
    Query.isBeforeFromClause = isBeforeFromClause;
    function isAfterFromClause(query) {
        return query.joins != undefined;
    }
    Query.isAfterFromClause = isAfterFromClause;
    function isBeforeUnionClause(query) {
        return query.unions == undefined;
    }
    Query.isBeforeUnionClause = isBeforeUnionClause;
    function isAfterUnionClause(query) {
        return query.unions != undefined;
    }
    Query.isAfterUnionClause = isAfterUnionClause;
    function isBeforeSelectClause(query) {
        return query.selects == undefined;
    }
    Query.isBeforeSelectClause = isBeforeSelectClause;
    function isAfterSelectClause(query) {
        return query.selects != undefined;
    }
    Query.isAfterSelectClause = isAfterSelectClause;
    function isOneRowQuery(query) {
        return isBeforeFromClause(query) && isBeforeUnionClause(query);
    }
    Query.isOneRowQuery = isOneRowQuery;
    function isZeroOrOneRowUnionQuery(query) {
        return (isAfterUnionClause(query) &&
            query.unionLimit != undefined &&
            (query.unionLimit.rowCount == 0 ||
                query.unionLimit.rowCount == 1));
    }
    Query.isZeroOrOneRowUnionQuery = isZeroOrOneRowUnionQuery;
    function isZeroOrOneRowFromQuery(query) {
        return (isAfterFromClause(query) &&
            isBeforeUnionClause(query) &&
            ((query.limit != undefined &&
                (query.limit.rowCount == 0 ||
                    query.limit.rowCount == 1)) ||
                (query.unionLimit != undefined &&
                    (query.unionLimit.rowCount == 0 ||
                        query.unionLimit.rowCount == 1))));
    }
    Query.isZeroOrOneRowFromQuery = isZeroOrOneRowFromQuery;
    function isZeroOrOneRowQuery(query) {
        return (isOneRowQuery(query) ||
            isZeroOrOneRowUnionQuery(query) ||
            isZeroOrOneRowFromQuery(query));
    }
    Query.isZeroOrOneRowQuery = isZeroOrOneRowQuery;
    //Must be done before any JOINs, as per MySQL
    //TODO The aliasedTable must not be in parentJoins
    function from(query, aliasedTable) {
        if (query.joins != undefined) {
            throw new Error(`FROM clause not allowed more than once`);
        }
        assertUniqueJoinTarget(query, aliasedTable);
        const { parentJoins, unions, selects, limit, unionLimit, extraData, } = query;
        return new Query({
            joins: [
                new join_1.Join({
                    aliasedTable,
                    columns: aliasedTable.columns,
                    nullable: false,
                }, join_1.JoinType.FROM, [], []),
            ],
            parentJoins,
            unions,
            selects,
            limit,
            unionLimit,
        }, extraData);
    }
    Query.from = from;
    function innerJoin(query, aliasedTable, fromDelegate, toDelegate) {
        if (query.joins == undefined) {
            throw new Error(`Cannot JOIN before FROM clause`);
        }
        assertUniqueJoinTarget(query, aliasedTable);
        const joins = query.joins;
        const from = fromDelegate(column_ref_1.ColumnRefUtil.toConvenient(column_ref_1.ColumnRefUtil.fromJoinArray(joins)));
        const to = toDelegate(aliasedTable.columns);
        if (from.length != to.length) {
            throw new Error(`Expected JOIN to have ${from.length} target columns`);
        }
        const { parentJoins, unions, selects, limit, unionLimit, extraData, } = query;
        return new Query({
            joins: [
                ...query.joins,
                new join_1.Join({
                    aliasedTable,
                    columns: aliasedTable.columns,
                    nullable: false,
                }, join_1.JoinType.INNER, from, to),
            ],
            parentJoins,
            unions,
            selects,
            limit,
            unionLimit,
        }, extraData);
    }
    Query.innerJoin = innerJoin;
    function leftJoin(query, aliasedTable, fromDelegate, toDelegate) {
        if (query.joins == undefined) {
            throw new Error(`Cannot JOIN before FROM clause`);
        }
        assertUniqueJoinTarget(query, aliasedTable);
        const joins = query.joins;
        const from = fromDelegate(column_ref_1.ColumnRefUtil.toConvenient(column_ref_1.ColumnRefUtil.fromJoinArray(joins)));
        const to = toDelegate(aliasedTable.columns);
        if (from.length != to.length) {
            throw new Error(`Expected JOIN to have ${from.length} target columns`);
        }
        const { parentJoins, unions, selects, limit, unionLimit, extraData, } = query;
        return new Query({
            joins: [
                ...query.joins,
                new join_1.Join({
                    aliasedTable,
                    columns: aliasedTable.columns,
                    nullable: true,
                }, join_1.JoinType.LEFT, from, to),
            ],
            parentJoins,
            unions,
            selects,
            limit,
            unionLimit,
        }, extraData);
    }
    Query.leftJoin = leftJoin;
    //Must be called after `FROM` as per MySQL
    function where(query, delegate) {
        const queryRef = column_ref_1.ColumnRefUtil.fromQuery(query);
        const rawExpr = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef), query);
        const expr = expr_1.Expr.fromRawExpr(rawExpr);
        column_ref_1.ColumnRefUtil.assertIsSubset(expr.usedRef, queryRef);
        return new Query(query, {
            ...query.extraData,
            where: expr,
        });
    }
    Query.where = where;
    function select(query, delegate) {
        const queryRef = column_ref_1.ColumnRefUtil.fromQuery(query);
        const selects = delegate(column_ref_1.ColumnRefUtil.toConvenient(queryRef));
        //TODO
        //+ If SelectItem is IExprSelectItem,
        //  the usedRef must be a subset of the queryRef.
        //+ Selected columns/columnMaps must exist.
        //+ Duplicates not allowed with existing selects
        //+ Duplicates not allowed with new selects
        const newSelects = ((query.selects == undefined) ?
            selects :
            [...query.selects, ...selects]);
        const { joins, parentJoins, unions, limit, unionLimit, extraData, } = query;
        return new Query({
            joins,
            parentJoins,
            unions,
            selects: newSelects,
            limit,
            unionLimit,
        }, extraData);
    }
    Query.select = select;
})(Query = exports.Query || (exports.Query = {}));
(function (Query) {
    function queryTreeJoins(query) {
        const joins = query.joins;
        if (joins == undefined || joins.length == 0) {
            return [];
        }
        const result = [];
        result.push(aliased_table_1.AliasedTable.queryTree(joins[0].aliasedTable));
        for (let i = 1; i < joins.length; ++i) {
            const join = joins[i];
            result.push(`${join.joinType} JOIN`);
            result.push(aliased_table_1.AliasedTable.queryTree(join.aliasedTable));
            if (join.from.length == 0) {
                continue;
            }
            result.push("ON");
            result.push(join.from
                .map((from, index) => {
                const to = join.to[index];
                return [
                    column_1.Column.queryTree(to),
                    "=",
                    column_1.Column.queryTree(from),
                ].join(" ");
            })
                .join(" AND "));
        }
        return result;
    }
    Query.queryTreeJoins = queryTreeJoins;
})(Query = exports.Query || (exports.Query = {}));
function from(aliasedTable) {
    return Query.newInstance()
        .from(aliasedTable);
}
exports.from = from;
/*
import {table} from "./table";
const t = table(
    "test",
    {
        a : sd.number(),
        b : sd.string(),
        c : sd.boolean(),
        d : sd.date(),
        e : sd.buffer(),
        f : sd.nullable(sd.number())
    }
)
    .setId(c => c.c)
    .setAutoIncrement(c => c.a)
    .setGenerated(c => [
        //c.a,
        c.d
    ])
    .setHasExplicitDefaultValue(c => [
        c.e
    ])
    .addCandidateKey(c => [
        c.f,
        c.e
    ]);
const t2 = t.setName("test2");
const q = from(t)

const q2 = Query.innerJoin(
    q,
    t2,
    c => [c.a, c.d],
    t => [t.a, t.d]
);
const s1 = Query.select(q2, c => [c.test.b]);
s1.selects
const s2 = Query.select(s1, c => [c.test2.b]);
s2.selects
const t3 = t.setName("test3");
Query.select(s2, c => [c.test2.c, c.test2.c])
/*
Query.innerJoin(q2, t2);

declare const a : never[];
const arr : number[] = a;

type fja = ColumnRefUtil.FromJoinArray<typeof q["joins"]>
type wtf = ColumnMapUtil.FromJoin<typeof q["joins"][number]>

type G<B extends boolean> = (
    true extends B?
    ["Actual", "true extends", B] :
    "Expected"
)

//OK
//Expected: "Expected"
//Actual: "Expected"
type g = G<false>;
//*/ 
//# sourceMappingURL=query.js.map