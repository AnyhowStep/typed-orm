"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatter_1 = require("./formatter");
class Parentheses {
    constructor(tree, canUnwrap) {
        this.cachedSql = undefined;
        this.tree = tree;
        this.canUnwrap = canUnwrap;
    }
    getTree() {
        return this.tree;
    }
    toSql() {
        if (this.cachedSql == undefined) {
            const sql = QueryTreeUtil.toSql(this.tree);
            this.cachedSql = `(${sql})`;
        }
        return this.cachedSql;
    }
    static Create(tree, canUnwrap = true) {
        if (tree instanceof Parentheses) {
            //No need to wrap parentheses in parentheses...
            //Unles...
            if (!canUnwrap && tree.canUnwrap) {
                //We don't want this unwrappable paren to be unwrapped...
                return new Parentheses(tree.getTree(), canUnwrap);
            }
            return tree;
        }
        else if (tree instanceof FunctionCall) {
            //We don't need to have parentheses around function calls
            return tree;
        }
        else if (tree instanceof Array) {
            if (tree.length == 0) {
                throw new Error(`Attempt to add parentheses around empty query tree`);
            }
            else if (tree.length == 1) {
                //No need to wrap parentheses against unit expressions
                return tree;
            }
            else {
                return new Parentheses(tree, canUnwrap);
            }
        }
        else if (typeof tree == "string") {
            //No need to wrap parentheses against unit expressions
            return tree;
        }
        else {
            return new Parentheses(tree, canUnwrap);
        }
    }
}
exports.Parentheses = Parentheses;
class FunctionCall {
    constructor(functionName, args) {
        this.cachedSql = undefined;
        this.functionName = functionName;
        this.args = args.map((arg) => {
            if (arg instanceof Parentheses && arg.canUnwrap) {
                //No need to wrap arguments in parentheses...
                //Unless the argument is a sub-query...
                return arg.getTree();
            }
            else {
                return arg;
            }
        });
    }
    toSql() {
        if (this.cachedSql == undefined) {
            const argsSql = this.args
                .map(QueryTreeUtil.toSql)
                .join(",");
            this.cachedSql = `${this.functionName}(${argsSql})`;
        }
        return this.cachedSql;
    }
}
exports.FunctionCall = FunctionCall;
var QueryTreeUtil;
(function (QueryTreeUtil) {
    function toSql(tree) {
        if (tree instanceof Parentheses) {
            return tree.toSql();
        }
        else if (tree instanceof FunctionCall) {
            return tree.toSql();
        }
        else if (typeof tree == "string") {
            return tree;
        }
        else {
            return tree.map(toSql).join("\n");
        }
    }
    QueryTreeUtil.toSql = toSql;
    function toSqlPretty(tree) {
        const sql = toSql(tree);
        return new formatter_1.SqlFormatter().format(sql);
    }
    QueryTreeUtil.toSqlPretty = toSqlPretty;
    function isQueryTree(raw) {
        if (raw instanceof Parentheses) {
            return true;
        }
        if (raw instanceof FunctionCall) {
            return true;
        }
        if (typeof raw == "string") {
            return true;
        }
        if (raw instanceof Array) {
            for (let item of raw) {
                if (!isQueryTree(item)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    QueryTreeUtil.isQueryTree = isQueryTree;
})(QueryTreeUtil = exports.QueryTreeUtil || (exports.QueryTreeUtil = {}));
//# sourceMappingURL=query-tree.js.map