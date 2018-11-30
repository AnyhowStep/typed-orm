"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
var SuperKeyUtil;
(function (SuperKeyUtil) {
    function toAssertDelegate(candidateKey, columnMap) {
        const fields = [];
        for (let columnName in columnMap) {
            /*
                It's possible that this is not an IColumn.
                But, in general, if we pass in candidateKey and columnMap
                without any outside hack-ery, this should be correct.
            */
            const column = columnMap[columnName];
            if (candidateKey.indexOf(column.name) >= 0) {
                fields.push(sd.field(column.name, column.assertDelegate));
            }
            else {
                fields.push(sd.field(column.name, sd.optional(column.assertDelegate)));
            }
        }
        return sd.schema(...fields);
    }
    SuperKeyUtil.toAssertDelegate = toAssertDelegate;
})(SuperKeyUtil = exports.SuperKeyUtil || (exports.SuperKeyUtil = {}));
//# sourceMappingURL=super-key.js.map