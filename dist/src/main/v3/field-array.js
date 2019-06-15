"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
var FieldArrayUtil;
(function (FieldArrayUtil) {
    function nullableNames(fields) {
        return fields
            .filter(field => sd.canOutputNull(field))
            .map(field => field.__name);
    }
    FieldArrayUtil.nullableNames = nullableNames;
})(FieldArrayUtil = exports.FieldArrayUtil || (exports.FieldArrayUtil = {}));
//# sourceMappingURL=field-array.js.map