import {IAliasedTable} from "../aliased-table";
import {JoinType} from "../join";
import {IColumn} from "../column";
import * as JoinDeclarationUtil from "./util";

export interface JoinDeclarationData {
    readonly fromTable : IAliasedTable;
    readonly toTable : IAliasedTable;
    readonly nullable : boolean;
}
export interface IJoinDeclaration<DataT extends JoinDeclarationData=JoinDeclarationData> {
    readonly fromTable : DataT["fromTable"];
    readonly toTable : DataT["toTable"];
    readonly nullable : DataT["nullable"];

    //For now, RIGHT JOIN is not allowed
    //because it complicates things
    readonly joinType : JoinType.INNER|JoinType.LEFT;
    readonly from : IColumn[];
    readonly to : IColumn[];
}

export class JoinDeclaration<DataT extends JoinDeclarationData> implements IJoinDeclaration<DataT> {
    readonly fromTable : DataT["fromTable"];
    readonly toTable : DataT["toTable"];
    readonly nullable : DataT["nullable"];

    readonly joinType : JoinType.INNER|JoinType.LEFT;
    readonly from : IColumn[];
    readonly to : IColumn[];

    constructor (
        data : DataT,
        joinType : JoinType.INNER|JoinType.LEFT,
        from : IColumn[],
        to : IColumn[]
    ) {
        this.fromTable = data.fromTable;
        this.toTable = data.toTable;
        this.nullable = data.nullable;
        this.joinType = joinType;
        this.from = from;
        this.to = to;
    }

    swap () : JoinDeclarationUtil.Swap<this> {
        return JoinDeclarationUtil.swap(this);
    }
    /*
        So you may write queries like this,
        o.requireParentJoins(outer)
            .from(inner)
            .where(
                o.innerJoinPk(
                    inner,
                    outer
                ).eq
            )

        Equivalent to,
        o.requireParentJoins(outer)
            .from(inner)
            .where(c => o.eq(
                c.outer.outerId,
                c.inner.outerId
            ))
    */
    readonly eq = () : JoinDeclarationUtil.Eq<IJoinDeclaration<DataT>> => {
        return JoinDeclarationUtil.eq(this);
    }
}