"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
function enumDelegate(...elements) {
    if (elements.length > 65535) {
        throw new Error(`ENUM type can only have up to 65,535 elements`);
    }
    return sd.literal(...elements);
}
exports.enum = enumDelegate;
enumDelegate.nullable = (...elements) => (sd.nullable(enumDelegate(...elements)));
//# sourceMappingURL=enum.js.map