import { Expr } from "../expr";
import { JoinCollectionUtil } from "../join-collection";
import { AnySelectBuilder } from "../select-builder";
export declare function exists<SubQueryT extends AnySelectBuilder>(subQuery: SubQueryT): (true extends SubQueryT["data"]["hasParentJoins"] ? Expr<JoinCollectionUtil.ToColumnReferences<SubQueryT["data"]["parentJoins"]>, boolean> : Expr<{}, boolean>);
