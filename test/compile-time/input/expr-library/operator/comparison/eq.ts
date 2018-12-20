import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";

const t = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.naturalNumber(),
        z : sd.naturalNumber(),
        a : sd.boolean(),
        b : sd.boolean(),
        c : sd.boolean(),
        h : sd.nullable(sd.string()),
        i : sd.string(),
    }
);

export const eq1 = o.eq(
    t.columns.x,
    t.columns.y
);

export const eq2 = o.eq(
    t.columns.x,
    3242
);

export const eq3 = o.eq(
    eq1,
    t.columns.a
);

export const eq4 = o.eq(
    eq3,
    t.columns.b
);

export const eq5 = o.eq(
    o.eq(t.columns.x, t.columns.y),
    t.columns.c
);

export const eq6 = o.eq(
    t.columns.x
);

export const eq7 = o.eq(
);

export const eq8 = o.eq(
    t.columns.h,
    t.columns.i
);

export const eq9 = o.eq(
    t.columns.i,
    t.columns.h
);