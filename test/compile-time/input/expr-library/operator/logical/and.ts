import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";

const t = o.table(
    "table",
    {
        x : sd.boolean(),
        y : sd.boolean(),
        z : sd.boolean(),
        a : sd.boolean(),
        b : sd.boolean(),
        c : sd.boolean(),
    }
);

export const and1 = o.and(
    t.columns.x,
    t.columns.y
);

export const and2 = o.and(
    t.columns.x,
    t.columns.y,
    t.columns.z,
);

export const and3 = o.and(
    and1,
    t.columns.a
);

export const and4 = o.and(
    and3,
    t.columns.b
);

export const and5 = o.and(
    o.eq(t.columns.x, t.columns.y),
    t.columns.z
);

export const and6 = o.and(
    t.columns.x
);

export const and7 = o.and(
);