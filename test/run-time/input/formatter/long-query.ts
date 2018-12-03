import * as tape from "tape";
import * as o from "../../../../dist/src/main";
import * as fs from "fs";

tape(__filename, (t) => {
    const actual = new o.SqlFormatter().format(
        fs.readFileSync(__dirname + "/long-query-sql.txt")
            .toString()
    );
    const expected = fs
        .readFileSync(__dirname + "/long-query-sql-expected.txt")
        .toString();
    t.deepEqual(actual, expected);

    t.end();
});