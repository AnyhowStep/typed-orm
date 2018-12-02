"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringArrayUtil;
(function (StringArrayUtil) {
    function uniqueString(arr) {
        return [...new Set(arr)];
    }
    StringArrayUtil.uniqueString = uniqueString;
    function isUnorderedEqual(a, b) {
        return (a.every(str => b.indexOf(str) >= 0) &&
            b.every(str => a.indexOf(str) >= 0));
    }
    StringArrayUtil.isUnorderedEqual = isUnorderedEqual;
    function contains(arr, item) {
        return arr.some(element => isUnorderedEqual(item, element));
    }
    function uniqueStringArray(arr) {
        const result = [];
        for (let item of arr) {
            if (!contains(result, item)) {
                result.push(uniqueString(item));
            }
        }
        return result;
    }
    StringArrayUtil.uniqueStringArray = uniqueStringArray;
})(StringArrayUtil = exports.StringArrayUtil || (exports.StringArrayUtil = {}));
//# sourceMappingURL=string-array.js.map