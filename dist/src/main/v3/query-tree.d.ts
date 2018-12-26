export declare class Parentheses {
    private readonly tree;
    private constructor();
    getTree(): QueryTree;
    private cachedSql;
    toSql(): string;
    static Create(tree: QueryTree): QueryTree;
}
export declare class FunctionCall {
    private readonly functionName;
    private readonly args;
    constructor(functionName: string, args: QueryTree[]);
    private cachedSql;
    toSql(): string;
}
export interface QueryTreeArray extends Array<string | QueryTree | Parentheses | FunctionCall> {
}
export declare type QueryTree = string | QueryTreeArray | Parentheses | FunctionCall;
export declare namespace QueryTreeUtil {
    function toSql(tree: QueryTree): string;
    function toSqlPretty(tree: QueryTree): string;
    function isQueryTree(raw: any): raw is QueryTree;
}
//# sourceMappingURL=query-tree.d.ts.map