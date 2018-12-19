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
            .selectExpr(() => o.eq<number, number>(32, 45))
            .limit(1),
        true
    ).as("value")
]);