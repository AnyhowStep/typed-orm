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

    //HACK for JOINING with nested queries
    readonly subTableName : string|undefined;
    //HACK for referencing selected columns
    readonly isSelectReference : boolean;

    constructor (table : TableNameT, name : NameT, assert : sd.AssertFunc<TypeT>, subTableName? : string, isSelectReference? : boolean) {
        this.table = table;
        this.name = name;
        this.assertDelegate = sd.toAssertDelegateExact(assert);

        //HACK
        this.subTableName = subTableName;
        //HACK
        this.isSelectReference = (isSelectReference === true);

        if (table == "__expr") {
            this.fullName = Database.EscapeId(`${table}--${name}`);
            //this.fullName = Database.EscapeId(`${name}`);
        } else {
            if (subTableName == undefined) {
                if (this.isSelectReference) {
                    this.fullName = Database.EscapeId(`${table}--${name}`);
                } else {
                    this.fullName = `${Database.EscapeId(table)}.${Database.EscapeId(name)}`;
                }

            } else {
                const hackedName = Database.EscapeId(`${subTableName}--${name}`);
                this.fullName = `${Database.EscapeId(table)}.${hackedName}`;
            }

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

    public querify (sb : d.IStringBuilder) {
        sb.append(this.fullName);
    }
}
