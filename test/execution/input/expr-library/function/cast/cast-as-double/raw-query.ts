import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
import {pool} from "../../../../../pool";

tape(__filename, async (t) => {
    await pool.acquire((connection) => {
        return connection.rawQuery("SELECT 1 AS `int`, 1+0e0 AS `double`")
            .then((obj) => {
                if (obj.fields == undefined) {
                    t.fail("Expected fields to be dictionary, received undefined");
                } else {
                    t.deepEqual(
                        obj.fields.int.type,
                        o.Types.LONGLONG
                    );
                    t.deepEqual(
                        obj.fields.double.type,
                        o.Types.DOUBLE
                    );
                }
                t.deepEqual(obj.results[0].int, "1");
                t.deepEqual(obj.results[0].double, 1.0);
            })
            .catch((err) => {
                t.fail(err.message);
            });
    });

    t.end();
});
