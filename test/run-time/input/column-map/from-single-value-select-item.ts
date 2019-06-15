import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const column = o.column("tableAlias", "name", sd.unsignedInteger());
    const columnMap = o.ColumnMapUtil.fromSingleValueSelectItem(column);

    t.true(o.ColumnMapUtil.isColumnMap(columnMap));
    t.deepEqual(Object.keys(columnMap), ["name"]);

    t.deepEqual(columnMap.name.tableAlias, "tableAlias");
    t.deepEqual(columnMap.name.name, "name");
    t.deepEqual(columnMap.name.assertDelegate("", 999), 999);

    t.end();
});

tape(__filename, (t) => {
    const item : o.IExprSelectItem<{
        readonly usedRef : {
            someTable : {
                someColumn : o.IColumn<{
                    tableAlias : "someTable",
                    name : "someColumn",
                    assertDelegate : sd.SafeMapper<boolean>,
                }>
            }
        };
        readonly assertDelegate : sd.SafeMapper<Date>;

        readonly tableAlias : "someTableAlias";
        readonly alias : "someAlias";
    }> = {
        usedRef : {
            someTable : {
                someColumn : new o.Column<{
                    tableAlias : "someTable",
                    name : "someColumn",
                    assertDelegate : sd.SafeMapper<boolean>,
                }>({
                    tableAlias : "someTable",
                    name : "someColumn",
                    assertDelegate : sd.boolean(),
                }),
            },
        },
        assertDelegate : sd.mysql.dateTime(3),

        tableAlias : "someTableAlias",
        alias : "someAlias",
        unaliasedQuery : "NOT IMPLEMENTED",
    };
    const columnMap = o.ColumnMapUtil.fromSingleValueSelectItem(item);

    t.true(o.ColumnMapUtil.isColumnMap(columnMap));
    t.deepEqual(Object.keys(columnMap), ["someAlias"]);

    t.deepEqual(columnMap.someAlias.tableAlias, "someTableAlias");
    t.deepEqual(columnMap.someAlias.name, "someAlias");
    t.deepEqual(columnMap.someAlias.assertDelegate("", new Date("2010-10-10")), new Date("2010-10-10"));

    t.end();
});