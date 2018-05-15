"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sd = require("schema-decorator");
const typed_mysql_1 = require("typed-mysql");
const select_builder_1 = require("./select-builder");
const column_1 = require("./column");
const expr_1 = require("./expr");
const StringBuilder_1 = require("./StringBuilder");
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
exports.isAllowedExprConstant = isAllowedExprConstant;
//TODO Make more generic and non-dependent on implementation?
function usedColumns(raw) {
    if (raw instanceof select_builder_1.SelectBuilder) {
        return {};
    }
    if (isAllowedExprConstant(raw)) {
        return {};
    }
    if (raw instanceof column_1.Column) {
        return {
            [raw.table]: {
                [raw.name]: raw
            }
        };
    }
    if (raw instanceof expr_1.Expr) {
        return raw.usedReferences;
    }
    throw new Error(`Unknown raw expression (${typeof raw})${raw}`);
}
exports.usedColumns = usedColumns;
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
        return raw.data.selectTuple[0].assertDelegate;
    }
    throw new Error(`Unknown raw expression (${typeof raw})${raw}`);
}
exports.assertDelegate = assertDelegate;
function querify(raw) {
    if (isAllowedExprConstant(raw)) {
        if (raw == undefined) {
            return typed_mysql_1.Database.Escape(null);
        }
        if (raw instanceof Date) {
            //TODO Make this toggleable
            return typed_mysql_1.Database.Escape(raw, true);
        }
        switch (typeof raw) {
            case "number": {
                return typed_mysql_1.Database.Escape(raw);
            }
            case "string": {
                return typed_mysql_1.Database.Escape(raw);
            }
            case "boolean": {
                return typed_mysql_1.Database.Escape(raw);
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
        return sb.toString();
    }
    throw new Error(`Unknown raw expression (${typeof raw})${raw}`);
}
exports.querify = querify;
function toExpr(raw) {
    return new expr_1.Expr(usedColumns(raw), assertDelegate(raw), querify(raw));
}
exports.toExpr = toExpr;
//# sourceMappingURL=expr-operation.js.map