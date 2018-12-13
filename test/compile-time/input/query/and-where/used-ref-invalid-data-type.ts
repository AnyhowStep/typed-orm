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
const sameName = o.table(
    "table",
    {
        x : sd.date()
    }
)

export const query = o.from(table)
    .andWhere(() => o.eq(
        sameName.columns.x,
        sameName.columns.x
    ));