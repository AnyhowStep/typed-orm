"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoinDeclarationUtil = require("./util");
class JoinDeclaration {
    constructor(data, joinType, from, to) {
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
        this.eq = () => {
            return JoinDeclarationUtil.eq(this);
        };
        this.fromTable = data.fromTable;
        this.toTable = data.toTable;
        this.nullable = data.nullable;
        this.joinType = joinType;
        this.from = from;
        this.to = to;
    }
    swap() {
        return JoinDeclarationUtil.swap(this);
    }
}
exports.JoinDeclaration = JoinDeclaration;
//# sourceMappingURL=join-declaration.js.map