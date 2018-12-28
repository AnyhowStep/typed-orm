import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";

/*
    parentExplicitDefault, childExplicitDefault
    Y Y = Y
    Y - = Y
    Y N = Y
    - Y = N
    - - = N
    - N = N
    N Y = Y
    N - = N
    N N = N
*/
const parent = o.table(
    "parent",
    {
        someId : o.bigint(),

        row0 : sd.string(),
        row1 : sd.string(),
        row2 : sd.string(),
        row3 : sd.string(),
        row4 : sd.string(),
        row5 : sd.string(),
    }
).setAutoIncrement(c => c.someId)
.addHasExplicitDefaultValue(c => [
    c.row0,
    c.row1,
    c.row2
]);
const child = o.table(
    "child",
    {
        someId : o.bigint(),

        row0 : sd.string(),
        row1 : sd.string(),

        row3 : sd.string(),
        row4 : sd.string(),

        row6 : sd.string(),
        row7 : sd.string(),
    }
).setId(c => c.someId)
.addParent(parent)
.addHasExplicitDefaultValue(c => [
    c.row0,
    c.row3,
    c.row6
]);

export const hasExplicitDefaultValue_row0 = o.PolymorphismUtil.hasExplicitDefaultValue(child, "row0");
export const hasExplicitDefaultValue_row1 = o.PolymorphismUtil.hasExplicitDefaultValue(child, "row1");
export const hasExplicitDefaultValue_row2 = o.PolymorphismUtil.hasExplicitDefaultValue(child, "row2");
export const hasExplicitDefaultValue_row3 = o.PolymorphismUtil.hasExplicitDefaultValue(child, "row3");
export const hasExplicitDefaultValue_row4 = o.PolymorphismUtil.hasExplicitDefaultValue(child, "row4");
export const hasExplicitDefaultValue_row5 = o.PolymorphismUtil.hasExplicitDefaultValue(child, "row5");
export const hasExplicitDefaultValue_row6 = o.PolymorphismUtil.hasExplicitDefaultValue(child, "row6");
export const hasExplicitDefaultValue_row7 = o.PolymorphismUtil.hasExplicitDefaultValue(child, "row7");
export const hasExplicitDefaultValue_row8 = o.PolymorphismUtil.hasExplicitDefaultValue(child, "row8");