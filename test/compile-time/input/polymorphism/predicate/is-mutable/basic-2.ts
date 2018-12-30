import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";

/*
    parent, child
    Y Y = Y
    Y - = N
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
.setMutable(c => [
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
.setMutable(c => [
    c.row0,
    c.row3,
    c.row6
]);

export const isMutable_row0 = o.PolymorphismUtil.isMutable(child, "row0");
export const isMutable_row1 = o.PolymorphismUtil.isMutable(child, "row1");
export const isMutable_row2 = o.PolymorphismUtil.isMutable(child, "row2");
export const isMutable_row3 = o.PolymorphismUtil.isMutable(child, "row3");
export const isMutable_row4 = o.PolymorphismUtil.isMutable(child, "row4");
export const isMutable_row5 = o.PolymorphismUtil.isMutable(child, "row5");
export const isMutable_row6 = o.PolymorphismUtil.isMutable(child, "row6");
export const isMutable_row7 = o.PolymorphismUtil.isMutable(child, "row7");
export const isMutable_row8 = o.PolymorphismUtil.isMutable(child, "row8");