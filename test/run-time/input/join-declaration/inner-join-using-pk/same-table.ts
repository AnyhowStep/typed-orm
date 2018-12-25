import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
import * as tape from "tape";

tape(__filename, (t) => {
    const table = o.table(
        "table",
        {
            x : sd.naturalNumber(),
            y : sd.string(),
            z : sd.boolean(),
        }
    ).setPrimaryKey(c => [c.x]);

    t.throws(() => {
        o.innerJoinUsingPk(
            table,
            table as any
        );
    });
    t.end();
});