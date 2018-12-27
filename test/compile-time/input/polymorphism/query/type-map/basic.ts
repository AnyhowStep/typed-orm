import * as o from "../../../../../../dist/src/main";

const table = o.table(
    "table",
    {
        x : () : 3n => 3n,
        y : o.dateTime(),
        z : o.boolean(),
        w : o.boolean(),
    }
).addCandidateKey(c => [c.x]);
const parent2 = o.table(
    "parent2",
    {
        x : o.bigint(),
        y : o.dateTime(),
        w : () : true => true,
    }
).addCandidateKey(c => [c.x]);
export const parent = o.table(
    "parent",
    {
        x : o.bigint(),
        y : o.dateTime(),
        z : o.boolean(),
    }
).addCandidateKey(c => [c.x])
.addParent(parent2);

export const t2 = table.addParent(parent);

export const tm = o.PolymorphismUtil.assertDelegate(table);
export const tm2 = o.PolymorphismUtil.assertDelegate(parent2);
export const tm3 = o.PolymorphismUtil.assertDelegate(parent);
export const tm4 = o.PolymorphismUtil.assertDelegate(t2);