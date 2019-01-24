import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
import {pool} from "../../../../../pool";

tape(__filename, async (t) => {
    await pool.acquire(async (connection) => {
        const value = await o.selectExpr(() => o.ExprUtil.fromRawExpr(99n))
            .fetchValue(connection);
        t.deepEqual(value, 99n);
        const value2 = await o.selectExpr(() => o.castAsDouble(99n))
            .fetchValue(connection);
        t.deepEqual(value2, 99.0);
    });

    t.end();
});
