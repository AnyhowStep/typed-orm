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
    );

    t.throws(() => {
        o.innerJoin(
            table,
            table as any,
            () => [table.columns.x],
            () => [table.columns.x]
        );
    });
    t.end();
});