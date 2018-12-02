export interface QueryStringTreeNode extends Array<string | QueryStringTree> {
}
export declare type QueryStringTree = string | QueryStringTreeNode;
export declare namespace QueryStringTreeUtil {
    function isQueryStringTree(raw: any): raw is QueryStringTree;
}
//# sourceMappingURL=query-string-tree.d.ts.map