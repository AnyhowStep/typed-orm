export class Parentheses {
    private readonly tree : QueryTree;
    private constructor (tree : QueryTree) {
        this.tree = tree;
    }
    public getTree () {
        return this.tree;
    }

    private cachedSql : string|undefined = undefined;
    toSql () : string {
        if (this.cachedSql == undefined) {
            const sql = QueryTreeUtil.toSql(this.tree);
            this.cachedSql = `(${sql})`;
        }
        return this.cachedSql;
    }

    public static Create (tree : QueryTree) : QueryTree {
        if (tree instanceof Parentheses) {
            //No need to wrap parentheses in parentheses
            return tree;
        } else if (tree instanceof FunctionCall) {
            //We don't need to have parentheses around function calls
            return tree;
        } else if (tree instanceof Array) {
            if (tree.length == 0) {
                throw new Error(`Attempt to add parentheses around empty query tree`);
            } else if (tree.length == 1) {
                //No need to wrap parentheses against unit expressions
                return tree;
            } else {
                return new Parentheses(tree);
            }
        } else if (typeof tree == "string") {
            //No need to wrap parentheses against unit expressions
            return tree;
        } else {
            return new Parentheses(tree);
        }
    }
}
export class FunctionCall {
    private readonly functionName : string;
    private readonly args : QueryTree[];

    constructor (functionName : string, args : QueryTree[]) {
        this.functionName = functionName;
        this.args = args.map((arg) => {
            if (arg instanceof Parentheses) {
                //No need to wrap arguments in parentheses
                return arg.getTree();
            } else {
                return arg;
            }
        });
    }

    private cachedSql : string|undefined = undefined;
    toSql () : string {
        if (this.cachedSql == undefined) {
            const argsSql = this.args
                .map(QueryTreeUtil.toSql)
                .join(",");
            this.cachedSql = `${this.functionName}(${argsSql})`;
        }
        return this.cachedSql;
    }
}
export interface QueryTreeArray extends Array<string|QueryTree|Parentheses|FunctionCall> {
}
export type QueryTree = string|QueryTreeArray|Parentheses|FunctionCall;

export namespace QueryTreeUtil {
    export function toSql (tree : QueryTree) : string {
        if (tree instanceof Parentheses) {
            return tree.toSql();
        } else if (tree instanceof FunctionCall) {
            return tree.toSql();
        } else if (typeof tree == "string") {
            return tree;
        } else {
            return tree.map(toSql).join("\n");
        }
    }

    export function isQueryTree (raw : any) : raw is QueryTree {
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
}