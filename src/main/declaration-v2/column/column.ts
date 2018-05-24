import * as sd from "schema-decorator";
import {Querify} from "../querify";
import {StringBuilder} from "../StringBuilder";
import * as mysql from "typed-mysql";

export class Column<
    TableAliasT extends string,
    NameT extends string,
    TypeT
> implements Querify {
    readonly fullName : string;
    //HACK for JOINING with nested queries
    readonly subTableName : string|undefined;
    //HACK for referencing selected columns
    readonly isSelectReference : boolean;

    constructor (
        readonly tableAlias : TableAliasT,
        readonly name : NameT,
        readonly assertDelegate : sd.AssertDelegate<TypeT>,
        subTableName? : string,
        isSelectReference? : boolean
    ) {

        //HACK
        this.subTableName = subTableName;
        //HACK
        this.isSelectReference = (isSelectReference === true);

        if (tableAlias == "__expr") {
            this.fullName = mysql.escapeId(`${tableAlias}--${name}`);
            //this.fullName = Database.EscapeId(`${name}`);
        } else {
            if (subTableName == undefined) {
                if (this.isSelectReference) {
                    this.fullName = mysql.escapeId(`${tableAlias}--${name}`);
                } else {
                    this.fullName = `${mysql.escapeId(tableAlias)}.${mysql.escapeId(name)}`;
                }

            } else {
                const hackedName = mysql.escapeId(`${subTableName}--${name}`);
                this.fullName = `${mysql.escapeId(tableAlias)}.${hackedName}`;
            }

        }
    }

    querify (sb : StringBuilder) {
        sb.append(this.fullName);
    }
    /*as<AliasT extends string>(alias : AliasT) : IColumnExpr<
        ColumnToReference<IColumn<TableNameT, NameT, TypeT>>,
        "__expr",
        AliasT,
        TypeT
    >;*/
}
export type AnyColumn = Column<string, string, any>;
