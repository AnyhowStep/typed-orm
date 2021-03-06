import {getAllTsFiles} from "../util";
import * as tape from "tape";

let assertCount = 0;
let failCount = 0;
tape.createStream({ objectMode : true }).on("data", (row) => {
    if (row.ok === false) {
        console.error(row);
        ++failCount;
    }
    if (row.type === "assert") {
        ++assertCount;
    }
}).on("close", () => {
    console.log(assertCount, "assertions");
    console.log(failCount, "failures");
});

const start = new Date().getTime();
const paths = [
    ...getAllTsFiles(__dirname + "/../run-time/input"),
    ...getAllTsFiles(__dirname + "/../execution/input"),
];
import {pool} from "../execution/pool";
for (let i=0; i<paths.length; ++i) {
    const path = paths[i];
    console.log("path", i, "/", paths.length, path);
    require(path);
}
tape(__filename, async (t) => {
    const end = new Date().getTime();
    const timeTaken = end-start;
    console.log("Run-time tests completed in", timeTaken/1000.0, "s");

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