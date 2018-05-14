import * as d from "../declaration";
import * as sd from "schema-decorator";
import {Database} from "typed-mysql";
import {ColumnExpr} from "./expr";
import {columnToReference} from "./column-operation";

export class Column<
    TableNameT extends string,
    NameT extends string,
    TypeT
> implements d.IColumn<TableNameT, NameT, TypeT> {
    readonly table : TableNameT;
    readonly name  : NameT;
    readonly assertDelegate : sd.AssertDelegate<TypeT>;

    readonly fullName : string;
    //readonly query : string;

    constructor (table : TableNameT, name : NameT, assert : sd.AssertFunc<TypeT>) {
        this.table = table;
        this.name = name;
        this.assertDelegate = sd.toAssertDelegateExact(assert);

        if (table == "__expr") {
            //this.fullName = Database.EscapeId(`${table}--${name}`);
            this.fullName = Database.EscapeId(`${name}`);
        } else {
            this.fullName = `${Database.EscapeId(table)}.${Database.EscapeId(name)}`;
        }
        //const alias = Database.EscapeId(`${table}--${name}`);
        //this.query = `${this.fullName} AS ${alias}`;
    }

    as<AliasT extends string>(alias : AliasT) : d.IColumnExpr<
        d.ColumnToReference<d.IColumn<TableNameT, NameT, TypeT>>,
        "__expr",
        AliasT,
        TypeT
    > {
        return new ColumnExpr(
            columnToReference(this),
            "__expr",
            alias,
            this.assertDelegate,
            this.fullName
        );
    }

    public querify () {
        return this.fullName;
    }
}
