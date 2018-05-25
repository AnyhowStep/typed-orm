"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("typed-mysql");
const column_1 = require("../column");
const StringBuilder_1 = require("../StringBuilder");
const expr_1 = require("../expr");
const select_builder_1 = require("../select-builder");
const sd = require("schema-decorator");
var RawExprUtil;
(function (RawExprUtil) {
    function isAllowedExprConstant(raw) {
        if (raw == undefined) {
            return true;
        }
        if (raw instanceof Date) {
            return true;
        }
        switch (typeof raw) {
            case "number":
            case "string":
            case "boolean": {
                return true;
            }
        }
        return false;
    }
    RawExprUtil.isAllowedExprConstant = isAllowedExprConstant;
    function querify(raw) {
        if (isAllowedExprConstant(raw)) {
            if (raw == undefined) {
                return mysql.escape(null);
            }
            if (raw instanceof Date) {
                //TODO Make this toggleable
                return mysql.escape(raw, true);
            }
            switch (typeof raw) {
                case "number": {
                    return mysql.escape(raw);
                }
                case "string": {
                    return mysql.escape(raw);
                }
                case "boolean": {
                    return mysql.escape(raw);
                }
            }
        }
        if (raw instanceof column_1.Column) {
            const sb = new StringBuilder_1.StringBuilder();
            raw.querify(sb);
            return sb.toString();
        }
        if (raw instanceof expr_1.Expr) {
            const sb = new StringBuilder_1.StringBuilder();
            raw.querify(sb);
            return sb.toString();
        }
        if (raw instanceof select_builder_1.SelectBuilder) {
            const sb = new StringBuilder_1.StringBuilder();
            raw.querify(sb);
            return "(" + sb.toString() + ")";
        }
        throw new Error(`Unknown raw expression (${typeof raw})${raw}`);
    }
    RawExprUtil.querify = querify;
    function usedReferences(raw) {
        if (isAllowedExprConstant(raw)) {
            return {};
        }
        if (raw instanceof column_1.Column) {
            return {
                [raw.tableAlias]: {
                    [raw.name]: raw
                }
            };
        }
        if (raw instanceof expr_1.Expr) {
            return raw.usedReferences;
        }
        if (raw instanceof select_builder_1.SelectBuilder) {
            return {};
        }
        throw new Error(`Unknown raw expression (${typeof raw})${raw}`);
    }
    RawExprUtil.usedReferences = usedReferences;
    function assertDelegate(raw) {
        if (isAllowedExprConstant(raw)) {
            if (raw == undefined) {
                return sd.nil();
            }
            if (raw instanceof Date) {
                return sd.date();
            }
            switch (typeof raw) {
                case "number": {
                    return sd.number();
                }
                case "string": {
                    return sd.string();
                }
                case "boolean": {
                    //MySQL returns `number` instead of `boolean`
                    return sd.numberToBoolean();
                }
            }
        }
        if (raw instanceof column_1.Column) {
            return raw.assertDelegate;
        }
        if (raw instanceof expr_1.Expr) {
            return raw.assertDelegate;
        }
        if (raw instanceof select_builder_1.SelectBuilder) {
            //If it's from a subquery. it's possible it may be null
            //because subqueries can return zero rows
            return sd.nullable(raw.data.selects[0].assertDelegate);
        }
        throw new Error(`Unknown raw expression (${typeof raw})${raw}`);
    }
    RawExprUtil.assertDelegate = assertDelegate;
    function toExpr(raw) {
        return new expr_1.Expr(usedReferences(raw), assertDelegate(raw), querify(raw));
    }
    RawExprUtil.toExpr = toExpr;
    function assertNonNullable(raw) {
        try {
            assertDelegate(raw)("", null);
        }
        catch (_err) {
            //If we encounter an error, we know this raw expression
            //is non-nullable
            return;
        }
        throw new Error(`Expected expression to be non-nullable, but it is`);
    }
    RawExprUtil.assertNonNullable = assertNonNullable;
})(RawExprUtil = exports.RawExprUtil || (exports.RawExprUtil = {}));
//# sourceMappingURL=util.js.map