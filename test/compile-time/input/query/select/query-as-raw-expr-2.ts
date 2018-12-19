import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);

export const query = o.select(() => [
    o.nullSafeEq(
        o.from(table)
            .select(c => [c.x])
            .limit(1),
        32
    ).as("value")
]);