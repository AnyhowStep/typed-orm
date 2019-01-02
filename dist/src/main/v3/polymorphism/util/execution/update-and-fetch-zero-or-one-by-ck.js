"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const update_and_fetch_zero_or_one_1 = require("./update-and-fetch-zero-or-one");
function updateAndFetchZeroOrOneByCk(connection, table, ck, delegate) {
    return update_and_fetch_zero_or_one_1.updateAndFetchZeroOrOne(connection, table, table_1.TableUtil.eqCandidateKey(table, ck), delegate);
}
exports.updateAndFetchZeroOrOneByCk = updateAndFetchZeroOrOneByCk;
//# sourceMappingURL=update-and-fetch-zero-or-one-by-ck.js.map