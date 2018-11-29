import {getAllTsFiles} from "./util";

for (let path of getAllTsFiles(__dirname + "/input")) {
    require(path);
}