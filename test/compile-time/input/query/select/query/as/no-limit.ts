import * as o from "../../../../../../../dist/src/main";

export const selectItem = o.select(() => [o.utcTimestamp().as("now")])
    .as("test");

export const query = o.select(() => [
    selectItem
]);
declare const isExprSelectItem : (
    typeof selectItem extends o.IExprSelectItem<o.ExprSelectItemData> ?
        "y" : "n"
);
export const y : "y" = isExprSelectItem;