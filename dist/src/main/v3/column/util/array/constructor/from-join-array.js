"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const from_join_1 = require("./from-join");
function fromJoinArray(joins) {
    const result = [];
    for (let join of joins) {
        result.push(...from_join_1.fromJoin(join));
    }
    return result;
}
exports.fromJoinArray = fromJoinArray;
//# sourceMappingURL=from-join-array.js.map