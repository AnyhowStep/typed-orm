import * as sd from "type-mapping";
import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const table = o.table(
        //Name is __aliased
        o.ALIASED,
        {
            x : sd.unsignedInteger(),
            y : sd.string(),
            z : sd.boolean(),
            w : sd.string(),
        }
    );

    t.throws(() => {
        o.from(table)
            .select(((c : any) => [
                c.x,
                //Duplicate because tableAlias is __aliased
                o.eq(c.y, c.w).as("x")
            ]) as any);
    });
    t.end();
});