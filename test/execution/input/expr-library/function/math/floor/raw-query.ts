import * as tape from "tape";
import * as o from "../../../../../../../dist/src/main";
import {pool} from "../../../../../pool";

tape(__filename, async (t) => {
    await pool.acquire((connection) => {
        return connection.rawQuery("SELECT FLOOR(1.5 + 0e0) AS floor")
            .then((obj) => {
                if (obj.fields == undefined) {
                    t.fail("Expected fields to be dictionary, received undefined");
                } else {
                    t.deepEqual(
                        obj.fields.floor.type,
                        o.Types.DOUBLE
                    );
                }
                t.deepEqual(obj.results[0].floor, 1.0);
            })
            .catch((err) => {
                t.fail(err.message);
            });
    });

    t.end();
});
