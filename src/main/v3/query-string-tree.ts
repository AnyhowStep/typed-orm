//TODO better naming
export interface QueryStringTreeNode extends Array<string|QueryStringTree> {
}
export type QueryStringTree = string|QueryStringTreeNode;

export namespace QueryStringTreeUtil {
    export function isQueryStringTree (raw : any) : raw is QueryStringTree {
        if (typeof raw == "string") {
            return true;
        }
        if (raw instanceof Array) {
            for (let item of raw) {
                if (!isQueryStringTree(item)) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }
}