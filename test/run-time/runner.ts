import {getAllTsFiles} from "./util";
import * as tape from "tape";

tape.createStream({ objectMode : true }).on("data", (row) => {
    if (row.ok === false) {
        console.error(row);
    }
});

for (let path of getAllTsFiles(__dirname + "/input")) {
    require(path);
}