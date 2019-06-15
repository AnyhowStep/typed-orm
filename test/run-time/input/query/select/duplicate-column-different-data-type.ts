import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
        }
    );
    const table2 = o.table(
        //Intentionally named "table"
        "table",
        {
            x : sd.orNull(sd.unsignedInteger()),
            y : sd.string(),
            z : sd.boolean(),
        }
    );

    t.throws(() => {
        o.from(table)
            .select(((c : any) => [c.x, table2.columns.x]) as any);
    });
    t.throws(() => {
        o.from(table2)
            .select(((c : any) => [c.x, table.columns.x]) as any);
    });

    const table3 = o.table(
        "table3",
        {
            x : sd.orNull(sd.unsignedInteger()),
            y : sd.string(),
            z : sd.boolean(),
        }
    );
    t.throws(() => {
        o.from(table)
            .rightJoinUsing(
                table3,
                c => [c.x]
            )
            //This isn't allowed because after the RIGHT JOIN,
            //table.x is nullable.
            //But table.columns.x is still asserting NOT NULL.
            .select((() => [table.columns.x]) as any);
    });
    t.doesNotThrow(() => {
        o.from(table)
            .rightJoinUsing(
                table3,
                c => [c.x]
            )
            //OK
            .select(c => [c.table.x]);
    });
    t.end();
});