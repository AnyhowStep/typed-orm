"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("../../../table");
const fetch_one_1 = require("./fetch-one");
function fetchOneByCk(connection, table, ck) {
    return fetch_one_1.fetchOne(connection, table, table_1.TableUtil.eqCandidateKey(table, ck));
}
exports.fetchOneByCk = fetchOneByCk;
//# sourceMappingURL=fetch-one-by-ck.js.map