"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
function assertDelegate(map) {
    const fields = [];
    for (let columnName in map) {
        /*
            It's possible that this is not an IColumnUtil.
            But, in general, if we pass in candidateKey and columnMap
            without any outside hack-ery, this should be correct.
        */
        const column = map[columnName];
        fields.push(sd.withName(column.assertDelegate, column.name));
    }
    return sd.objectFromArray(...fields);
}
exports.assertDelegate = assertDelegate;
//# sourceMappingURL=assert-delegate.js.map