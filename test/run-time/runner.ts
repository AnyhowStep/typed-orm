import {getAllTsFiles} from "./util";
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
for (let path of getAllTsFiles(__dirname + "/input")) {
    //console.log("path", path);
    require(path);
}
const end = new Date().getTime();
const timeTaken = end-start;
console.log("Run-time tests completed in", timeTaken/1000.0, "s");