"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parentheses {
    constructor(tree) {
        this.cachedSql = undefined;
        this.tree = tree;
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
    static Create(tree) {
        if (tree instanceof Parentheses) {
            //No need to wrap parentheses in parentheses
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
                return new Parentheses(tree);
            }
        }
        else if (typeof tree == "string") {
            //No need to wrap parentheses against unit expressions
            return tree;
        }
        else {
            return new Parentheses(tree);
        }
    }
}
exports.Parentheses = Parentheses;
class FunctionCall {
    constructor(functionName, args) {
        this.cachedSql = undefined;
        this.functionName = functionName;
        this.args = args.map((arg) => {
            if (arg instanceof Parentheses) {
                //No need to wrap arguments in parentheses
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