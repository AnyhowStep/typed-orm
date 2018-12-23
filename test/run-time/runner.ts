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

for (let path of getAllTsFiles(__dirname + "/input")) {
    require(path);
}