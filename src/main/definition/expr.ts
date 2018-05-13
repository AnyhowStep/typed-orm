import * as d from "../declaration";
import * as sd from "schema-decorator";
import {Database} from "typed-mysql";

export class ColumnExpr<
    UsedReferencesT extends d.PartialColumnReferences,
    TableNameT extends string,
    NameT extends string,
    TypeT
> implements d.IColumnExpr<UsedReferencesT, TableNameT, NameT, TypeT> {
    readonly usedReferences : UsedReferencesT;

    readonly table : TableNameT;
    readonly name  : NameT;
    readonly assertDelegate : sd.AssertDelegate<TypeT>;

    readonly query : string;

    public constructor (
        usedReferences : UsedReferencesT,
        table : TableNameT,
        name : NameT,
        assert : sd.AssertFunc<TypeT>,
        query : string
    ) {
        this.usedReferences = usedReferences;
        this.table = table;
        this.name = name;
        this.assertDelegate = sd.toAssertDelegateExact(assert);

        const alias = Database.EscapeId(`${table}.${name}`);
        this.query = `(${query}) AS ${alias}`;
    }

    public querify () {
        return this.query;
    }
}

export class Expr<
    UsedReferencesT extends d.PartialColumnReferences,
    TypeT
> implements d.IExpr<UsedReferencesT, TypeT> {
    readonly usedReferences : UsedReferencesT;
    readonly assertDelegate : sd.AssertDelegate<TypeT>;

    readonly query : string;

    public constructor (
        usedReferences : UsedReferencesT,
        assert : sd.AssertFunc<TypeT>,
        query : string
    ) {
        this.usedReferences = usedReferences;
        this.assertDelegate = sd.toAssertDelegateExact(assert);
        this.query = `(${query})`;
    }

    as<AliasT extends string>(alias : AliasT) : d.IColumnExpr<
        UsedReferencesT,
        "__expr",
        AliasT,
        TypeT
    > {
        return new ColumnExpr(
            this.usedReferences,
            "__expr",
            alias,
            this.assertDelegate,
            this.query
        );
    }

    public querify () {
        return this.query;
    }
}
