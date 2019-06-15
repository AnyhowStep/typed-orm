"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_tree_1 = require("../query-tree");
const ExprUtil = require("./util");
class Expr {
    constructor(data, queryTree) {
        this.usedRef = data.usedRef;
        this.assertDelegate = data.assertDelegate;
        //Gotta' play it safe.
        //We want to preserve the order of operations.
        this.queryTree = query_tree_1.Parentheses.Create(queryTree);
    }
    as(alias
    //This particular method has always given me problems
    //Always reaching the max instantiation depth.
    //https://github.com/microsoft/TypeScript/issues/29511
    //It seems like using `DataT & {queryTree : QueryTree}`
    //is better than using `this`.
    //I don't understand typescript
    //However, with enough calls to `as`, you still run into the max instantiation depth.
    //Better to just keep using `ExprUtil.as()` for now
    //) : ExprUtil.As<this, AliasT> {
    ) {
        /*) : (
            Expr<{
                readonly usedRef : DataT["usedRef"];
                readonly assertDelegate : DataT["assertDelegate"];
            }> &
            IExprSelectItem<{
                readonly usedRef : DataT["usedRef"];
                readonly assertDelegate : DataT["assertDelegate"];
    
                //TODO-DEBATE Consider allowing tableAlias to change?
                //There doesn't seem to be any harm in it.
                readonly tableAlias : typeof ALIASED;
                readonly alias : AliasT;
            }>
        ) {*/
        return ExprUtil.as(this, alias);
    }
    asc() {
        return ExprUtil.asc(this);
    }
    desc() {
        return ExprUtil.desc(this);
    }
    sort(sortDirection) {
        return ExprUtil.sort(this, sortDirection);
    }
}
exports.Expr = Expr;
//# sourceMappingURL=expr.js.map