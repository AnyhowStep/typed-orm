"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unique_key_1 = require("../unique-key");
const sd = require("schema-decorator");
var UniqueKeyCollectionUtil;
(function (UniqueKeyCollectionUtil) {
    function assertDelegate(tuple, columns) {
        return sd.or(...tuple.map((uniqueKey) => {
            return unique_key_1.UniqueKeyUtil.assertDelegate(uniqueKey, columns);
        }));
    }
    UniqueKeyCollectionUtil.assertDelegate = assertDelegate;
    function commonUniqueKeys(collectionA, collectionB) {
        const result = [];
        for (let a of collectionA) {
            for (let b of collectionB) {
                if (unique_key_1.UniqueKeyUtil.isEqual(a, b)) {
                    result.push(a);
                    break;
                }
            }
        }
        return result;
    }
    UniqueKeyCollectionUtil.commonUniqueKeys = commonUniqueKeys;
})(UniqueKeyCollectionUtil = exports.UniqueKeyCollectionUtil || (exports.UniqueKeyCollectionUtil = {}));
//# sourceMappingURL=util.js.map