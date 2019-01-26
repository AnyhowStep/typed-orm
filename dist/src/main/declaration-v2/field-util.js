"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fieldsToObject(tuple) {
    const result = {};
    for (let f of tuple) {
        result[f.name] = f;
    }
    return result;
}
exports.fieldsToObject = fieldsToObject;
//# sourceMappingURL=field-util.js.map