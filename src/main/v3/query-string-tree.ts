//TODO better naming
export interface QueryStringTreeNode extends Array<string|QueryStringTree> {
}
export type QueryStringTree = string|QueryStringTreeNode;