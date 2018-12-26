import {getAllTsFiles} from "./util";
import * as tape from "tape";

let assertCount = 0;
tape.createStream({ objectMode : true }).on("data", (row) => {
    if (row.ok === false) {
        console.error(row);
    }
    if (row.type === "assert") {
        ++assertCount;
    }
}).on("close", () => {
    console.log(assertCount, "assertions");
});

const start = new Date().getTime();
for (let path of getAllTsFiles(__dirname + "/input")) {
    require(path);
}
const end = new Date().getTime();
const timeTaken = end-start;
console.log("Execution tests completed in", timeTaken/1000.0, "s");

import {pool} from "./pool";
tape(__filename, async (t) => {
    console.log("Disconnecting");
    await pool.disconnect()
        .then(() => {
            console.log("Disconnected");
        })
        .catch((err) => {
            console.log("Disconnected with error", err);
        });

    t.end();
});
