import * as sd from "type-mapping";
import * as o from "../../../../../dist/src/main";
import * as tape from "tape";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
        }
    ).setPrimaryKey(c => [c.x]);

    t.throws(() => {
        o.innerJoinPk(
            table,
            table as any
        );
    });
    t.end();
});