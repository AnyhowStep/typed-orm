"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("type-mapping");
function set(...elements) {
    if (elements.length > 64) {
        throw new Error(`SET type can only have up to 64 elements`);
    }
    sd.array(sd.notMatch(/\,/, name => `${name} must not have commas`))("elements", elements);
    return sd.pipe(sd.string(), (name, raw) => {
        const arr = raw.split(",");
        for (let e of arr) {
            if (elements.indexOf(e) < 0) {
                throw new Error(`${name} has unknown set element; ${e}`);
            }
        }
        return raw;
    });
}
exports.set = set;
set.nullable = (...elements) => (sd.orNull(set(...elements)));
//# sourceMappingURL=set.js.map