"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SelectBuilderOperation;
(function (SelectBuilderOperation) {
    SelectBuilderOperation["JOIN"] = "JOIN";
    SelectBuilderOperation["NARROW"] = "NARROW";
    SelectBuilderOperation["WHERE"] = "WHERE";
    SelectBuilderOperation["SELECT"] = "SELECT";
    SelectBuilderOperation["DISTINCT"] = "DISTINCT";
    SelectBuilderOperation["SQL_CALC_FOUND_ROWS"] = "SQL_CALC_FOUND_ROWS";
    SelectBuilderOperation["GROUP_BY"] = "GROUP_BY";
    SelectBuilderOperation["HAVING"] = "HAVING";
    SelectBuilderOperation["ORDER_BY"] = "ORDER_BY";
    SelectBuilderOperation["LIMIT"] = "LIMIT";
    SelectBuilderOperation["OFFSET"] = "OFFSET";
    SelectBuilderOperation["WIDEN"] = "WIDEN";
    SelectBuilderOperation["UNION"] = "UNION";
    SelectBuilderOperation["UNION_ORDER_BY"] = "UNION_ORDER_BY";
    SelectBuilderOperation["UNION_LIMIT"] = "UNION_LIMIT";
    SelectBuilderOperation["UNION_OFFSET"] = "UNION_OFFSET";
    SelectBuilderOperation["AS"] = "AS";
    //After SELECT
    SelectBuilderOperation["FETCH"] = "FETCH";
})(SelectBuilderOperation = exports.SelectBuilderOperation || (exports.SelectBuilderOperation = {}));
exports.ArbitraryRowCount = 999999999;
//# sourceMappingURL=select-builder.js.map