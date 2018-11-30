"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
var FieldArrayUtil;
(function (FieldArrayUtil) {
    function nullableNames(fields) {
        return fields
            .filter(field => sd.isNullable(field.assertDelegate))
            .map(field => field.name);
    }
    FieldArrayUtil.nullableNames = nullableNames;
})(FieldArrayUtil = exports.FieldArrayUtil || (exports.FieldArrayUtil = {}));
//# sourceMappingURL=field-array.js.map