import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
        }
    ).setId(c => c.z);

    t.deepEqual(table.alias, "table");


    t.true(o.ColumnMapUtil.isColumnMap(table.columns));
    t.deepEqual(Object.keys(table.columns).length, 3);

    t.deepEqual(table.columns.x.tableAlias, "table");
    t.deepEqual(table.columns.x.name, "x");
    t.deepEqual(table.columns.x.assertDelegate("", 67), 67);

    t.deepEqual(table.columns.y.tableAlias, "table");
    t.deepEqual(table.columns.y.name, "y");
    t.deepEqual(table.columns.y.assertDelegate("", "hey"), "hey");

    t.deepEqual(table.columns.z.tableAlias, "table");
    t.deepEqual(table.columns.z.name, "z");
    t.deepEqual(table.columns.z.assertDelegate("", true), true);
    t.deepEqual(table.columns.z.assertDelegate("", false), false);

    t.deepEqual(table.autoIncrement, undefined);
    t.deepEqual(table.generated.length, 0);
    t.deepEqual(table.hasExplicitDefaultValue.length, 0);
    t.deepEqual(table.mutable.length, 3);
    t.true(table.mutable.indexOf("x") >= 0);
    t.true(table.mutable.indexOf("y") >= 0);
    t.true(table.mutable.indexOf("z") >= 0);
    t.deepEqual(table.id, "z");
    t.deepEqual(table.candidateKeys.length, 1);
    t.deepEqual(table.candidateKeys[0], ["z"]);
    t.deepEqual(table.parents.length, 0);
    t.deepEqual(table.insertAllowed, true);
    t.deepEqual(table.deleteAllowed, true);

    t.end();
});