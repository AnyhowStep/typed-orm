import {ColumnCollection} from "../column-collection";
import {Querify} from "../querify";
import {StringBuilder} from "../StringBuilder";
import * as mysql from "typed-mysql";

export class AliasedTable<
    AliasT extends string,
    NameT extends string,
    ColumnCollectionT extends ColumnCollection
> implements Querify {
    readonly query : string;

    constructor (
        readonly alias : AliasT,
        readonly name  : NameT,
        readonly columns : ColumnCollectionT
    ) {
        if ((name as string) == (alias as string)) {
            this.query = mysql.escapeId(name);
        } else {
            this.query = `${mysql.escapeId(name)} AS ${mysql.escapeId(alias)}`
        }
    }

    querify (sb : StringBuilder) {
        sb.append(this.query);
    }
}
export type AnyAliasedTable = AliasedTable<string, string, ColumnCollection>;
