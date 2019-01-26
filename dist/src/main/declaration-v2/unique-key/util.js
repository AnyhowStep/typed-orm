"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
var UniqueKeyUtil;
(function (UniqueKeyUtil) {
    function assertDelegate(uniqueKey, columns) {
        const fields = [];
        for (let columnName in columns) {
            const column = columns[columnName];
            if (uniqueKey[columnName] === true) {
                fields.push(sd.field(column.name, column.assertDelegate));
            }
            else {
                fields.push(sd.field(column.name, sd.optional(column.assertDelegate)));
            }
        }
        return sd.schema(...fields);
    }
    UniqueKeyUtil.assertDelegate = assertDelegate;
    function minimalAssertDelegate(uniqueKey, columns) {
        const fields = [];
        for (let columnName in columns) {
            const column = columns[columnName];
            if (uniqueKey[columnName] === true) {
                fields.push(sd.field(column.name, column.assertDelegate));
            }
        }
        return sd.schema(...fields);
    }
    UniqueKeyUtil.minimalAssertDelegate = minimalAssertDelegate;
    function isEqual(a, b) {
        for (let aKey in a) {
            if (a.hasOwnProperty(aKey) && !b.hasOwnProperty(aKey)) {
                return false;
            }
        }
        for (let bKey in b) {
            if (b.hasOwnProperty(bKey) && !a.hasOwnProperty(bKey)) {
                return false;
            }
        }
        return true;
    }
    UniqueKeyUtil.isEqual = isEqual;
})(UniqueKeyUtil = exports.UniqueKeyUtil || (exports.UniqueKeyUtil = {}));
//# sourceMappingURL=util.js.map