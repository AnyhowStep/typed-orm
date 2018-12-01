"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlstring_1 = require("sqlstring");
const sd = require("schema-decorator");
const constants_1 = require("./constants");
const expr_select_item_1 = require("./expr-select-item");
class Column {
    constructor(data, __subTableName, __isInSelectClause) {
        this.tableAlias = data.tableAlias;
        this.name = data.name;
        this.assertDelegate = data.assertDelegate;
        //HACK
        this.__subTableName = __subTableName;
        //HACK
        this.__isInSelectClause = (__isInSelectClause === true);
    }
    queryStringTree() {
        return Column.queryStringTree(this);
    }
    toNullable() {
        return Column.toNullable(this);
    }
    withTableAlias(newTableAlias) {
        return Column.withTableAlias(this, newTableAlias);
    }
    withType(newAssertFunc) {
        return Column.withType(this, newAssertFunc);
    }
}
exports.Column = Column;
/*
    TODO Consider renaming to ColumnUtil
    to be more consistent with other utility namespaces
*/
(function (Column) {
    function queryStringTree({ tableAlias, name, __subTableName, __isInSelectClause, }) {
        if (tableAlias == constants_1.ALIASED) {
            /*
                When you want to write,
                (1 + 2) AS three

                You write,
                add(1, 2).as("three")

                This "three" is an IExprSelectItem but has no tableAlias
                associated with it.

                So, this library makes up a table alias that is very
                unlikely to be used naturally by others.
            */
            return sqlstring_1.escapeId(`${tableAlias}--${name}`);
        }
        else {
            if (__subTableName == undefined) {
                if (__isInSelectClause) {
                    return sqlstring_1.escapeId(`${tableAlias}--${name}`);
                }
                else {
                    /*
                        The most common case, I think.
                    */
                    return (sqlstring_1.escapeId(tableAlias) +
                        "." +
                        sqlstring_1.escapeId(name));
                }
            }
            else {
                /*
                    {
                        "tableAlias":"otherUser",
                        "name":"externalUserId",
                        "subTableName":"user",
                        "isSelectReference":false,
                        "fullName":"`otherUser`.`user--externalUserId`"
                    }

                    SELECT
                        `otherUser`.`user--externalUserId` AS `otherUser--externalUserId`
                    FROM
                        `app`
                    INNER JOIN
                        (
                            SELECT
                                `user`.`appId` AS `user--appId`,
                                `user`.`externalUserId` AS `user--externalUserId`
                            FROM
                                `user`
                        ) AS `otherUser`
                    ON
                        `app`.`appId` = `otherUser`.`user--appId`
                */
                return (sqlstring_1.escapeId(tableAlias) +
                    "." +
                    sqlstring_1.escapeId(`${__subTableName}--${name}`));
            }
        }
    }
    Column.queryStringTree = queryStringTree;
    function toNullable({ tableAlias, name, assertDelegate, __subTableName, __isInSelectClause, }) {
        return new Column({
            tableAlias,
            name,
            assertDelegate: sd.nullable(assertDelegate),
        }, __subTableName, __isInSelectClause);
    }
    Column.toNullable = toNullable;
    function withTableAlias({ name, assertDelegate, __subTableName, __isInSelectClause, }, newTableAlias) {
        return new Column({
            tableAlias: newTableAlias,
            name,
            assertDelegate,
        }, __subTableName, __isInSelectClause);
    }
    Column.withTableAlias = withTableAlias;
    function withType({ tableAlias, name, __subTableName, __isInSelectClause, }, newAssertFunc) {
        return new Column({
            tableAlias,
            name,
            assertDelegate: sd.toAssertDelegate(newAssertFunc),
        }, __subTableName, __isInSelectClause);
    }
    Column.withType = withType;
    function isColumn(raw) {
        return (raw != undefined &&
            (raw instanceof Object) &&
            ("tableAlias" in raw) &&
            ("name" in raw) &&
            ("assertDelegate" in raw) &&
            (typeof raw.tableAlias == "string") &&
            (typeof raw.name == "string") &&
            (typeof raw.assertDelegate == "function") &&
            (raw.__subTableName === undefined ||
                typeof raw.__subTableName == "string") &&
            ("__isInSelectClause" in raw) &&
            (typeof raw.__isInSelectClause == "boolean"));
    }
    Column.isColumn = isColumn;
    function fromExprSelectItem(item) {
        return new Column({
            tableAlias: item.tableAlias,
            name: item.alias,
            assertDelegate: item.assertDelegate,
        });
    }
    Column.fromExprSelectItem = fromExprSelectItem;
    function fromSingleValueSelectItem(item) {
        if (isColumn(item)) {
            return new Column(item);
        }
        else if (expr_select_item_1.ExprSelectItemUtil.isExprSelectItem(item)) {
            return fromExprSelectItem(item);
        }
        else {
            throw new Error(`Unknown SingleValueSelectItem`);
        }
    }
    Column.fromSingleValueSelectItem = fromSingleValueSelectItem;
    //TODO Figure out naming convention
    function nameArrayFromColumnMap(columnMap) {
        //Technically, this could be wrong.
        //But it shouldn't be wrong, in general.
        return Object.keys(columnMap);
    }
    Column.nameArrayFromColumnMap = nameArrayFromColumnMap;
})(Column = exports.Column || (exports.Column = {}));
function column(tableAlias, name, assertFunc) {
    return new Column({
        tableAlias,
        name,
        assertDelegate: sd.toAssertDelegate(assertFunc),
    });
}
exports.column = column;
/*
    const column = new Column<{
        tableAlias : "hi",
        name : "bye",
        assertDelegate : sd.AssertDelegate<number>
    }>(
        {
            tableAlias : "hi",
            name : "bye",
            assertDelegate : sd.stringToNaturalNumber()
        }
    );
    const n = Column.toNullable(column);
    const n2 = column.toNullable();

    const wta = Column.withTableAlias(column, "newThing");
    const wta2 = column.withTableAlias("newThing");

    const wt = Column.withType(column, sd.boolean());
    const wt2 = column.withType(sd.boolean());

    const test = wta2.withTableAlias("2").withType(sd.date())
//*/ 
//# sourceMappingURL=column.js.map