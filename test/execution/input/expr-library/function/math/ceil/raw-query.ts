import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
import {pool} from "../../../../../pool";

tape(__filename, async (t) => {
    await pool.acquire((connection) => {
        return connection.rawQuery("SELECT CEIL(1.5 + 0e0) AS ceil")
            .then((obj) => {
                if (obj.fields == undefined) {
                    t.fail("Expected fields to be dictionary, received undefined");
                } else {
                    t.deepEqual(
                        obj.fields.ceil.type,
                        o.Types.DOUBLE
                    );
                }
                t.deepEqual(obj.results[0].ceil, 2.0);
            })
            .catch((err) => {
                t.fail(err.message);
            });
    });

    t.end();
});
