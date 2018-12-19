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
const joined1 = o.table(
    "joined1",
    {
        a : sd.date(),
        b : sd.buffer(),
        y : sd.string()
    }
)

export const query = o.from(table)
    .crossJoin(
        joined1
    )
    .crossJoin(
        joined1
    );