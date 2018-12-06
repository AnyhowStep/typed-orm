import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

const table = o.table(
    //Name is __aliased
    o.ALIASED,
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
        w : sd.string(),
    }
);

export const query = o.QueryUtil.select(
    o.from(table),
    c => [
        c.x,
        //Duplicate because tableAlias is __aliased
        o.eq(c.y, c.w).as("x")
    ]
);