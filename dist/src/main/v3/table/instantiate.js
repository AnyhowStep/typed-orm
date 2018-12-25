"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const util_2 = require("./util");
const util_3 = require("./util");
function table(arg0, arg1) {
    if (arg1 == undefined) {
        return util_3.fromTable(arg0);
    }
    if (arg1 instanceof Array) {
        return util_2.fromFieldTuple(arg0, arg1);
    }
    else {
        return util_1.fromAssertMap(arg0, arg1);
    }
}
exports.table = table;
//# sourceMappingURL=instantiate.js.map