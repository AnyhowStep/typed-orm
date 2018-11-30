import * as sd from "schema-decorator";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const column = o.column("tableAlias", "name", sd.naturalNumber());
    const columnMap = o.ColumnMapUtil.fromColumn(column);

    t.true(o.ColumnMapUtil.isColumnMap(columnMap));
    t.deepEqual(Object.keys(columnMap), ["name"]);

    t.deepEqual(columnMap.name.tableAlias, "tableAlias");
    t.deepEqual(columnMap.name.name, "name");
    t.deepEqual(columnMap.name.assertDelegate("", 999), 999);

    t.end();
});