"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
function jsonDelegate(dataTypeStr, absoluteMax, defaultSize) {
    return (a, b) => {
        if (a == undefined) {
            return sd.chain(sd.jsonObjectStr(), sd.varChar(defaultSize));
        }
        else if (b == undefined) {
            a = sd.chain(sd.integer(), sd.gtEq(1), sd.ltEq(absoluteMax))("maxLength", a);
            return sd.chain(sd.jsonObjectStr(), sd.varChar(a));
        }
        else {
            a = sd.chain(sd.integer(), sd.gtEq(0), sd.ltEq(absoluteMax))("minLength", a);
            b = sd.chain(sd.integer(), sd.gtEq(1), sd.ltEq(absoluteMax))("maxLength", b);
            if (a > b) {
                throw new Error(`${dataTypeStr} minLength must be <= maxLength`);
            }
            return sd.chain(sd.jsonObjectStr(), sd.varChar(a, b));
        }
    };
}
exports.jsonDelegate = jsonDelegate;
/*
    he space required to store a JSON document is roughly
    the same as for LONGBLOB or LONGTEXT.

    In addition, MySQL imposes a limit on the size of any JSON
    document stored in a JSON column such that it cannot be any
    larger than the value of max_allowed_packet.

    The default for max_allowed_packet is 4194304, 4MB.

    The maximum is 1073741824, 1GB.

    The value should be a multiple of 1024;
    nonmultiples are rounded down to the nearest multiple.

    -----

    I set the default to 1MB arbitrarily.
*/
exports.json = jsonDelegate("JSON", 4294967295, 1048576);
//# sourceMappingURL=json.js.map