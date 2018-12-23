import * as sd from "schema-decorator";
import * as o from "../../../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
    }
);

export const selectItem = o.from(table)
    .select(c => [c.x])
    .as("test");

export const query = o.select(() => [
    selectItem
]);
declare const isExprSelectItem : (
    typeof selectItem extends o.IExprSelectItem<o.AliasedExprData> ?
        "y" : "n"
);
export const n : "n" = isExprSelectItem;