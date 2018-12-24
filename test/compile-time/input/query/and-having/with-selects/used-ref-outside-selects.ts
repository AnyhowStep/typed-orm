import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);
const test = o.ColumnUtil.fromExprSelectItem(table.columns.y.as("test"));


export const query = o.from(table)
    .having(c => o.eq(
        c.y,
        test
    ));