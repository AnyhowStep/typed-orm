"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const update_and_fetch_one_1 = require("./update-and-fetch-one");
function updateAndFetchOneByCk(connection, table, ck, delegate) {
    return update_and_fetch_one_1.updateAndFetchOne(connection, table, table_1.TableUtil.eqCandidateKey(table, ck), delegate);
}
exports.updateAndFetchOneByCk = updateAndFetchOneByCk;
//# sourceMappingURL=update-and-fetch-one-by-ck.js.map