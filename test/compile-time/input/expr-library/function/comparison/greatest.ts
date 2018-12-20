import * as sd from "schema-decorator";
import * as o from "../../../../../../dist/src/main";

const t = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.naturalNumber(),
        z : sd.naturalNumber(),
        w : sd.nullable(sd.naturalNumber()),
        a : sd.boolean(),
        b : sd.boolean(),
        c : sd.boolean(),
        h : sd.nullable(sd.string()),
        i : sd.string(),
    }
);

export const expr1 = o.greatest(
    t.columns.x,
    t.columns.y,
    t.columns.z,
    32,
    56
);

export const expr2 = o.greatest(
    t.columns.x,
    t.columns.y,
    t.columns.z,
);

export const expr3 = o.greatest(
    32 as number,
    56,
    56,
    78
);


export const expr4 = o.greatest(
    t.columns.x,
);


export const expr5 = o.greatest(
    t.columns.x,
    t.columns.y,
);

export const expr6 = o.greatest(
    t.columns.x,
    t.columns.a,
);