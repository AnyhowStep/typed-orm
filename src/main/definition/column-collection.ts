import * as d from "../declaration";
import * as sd from "schema-decorator";
import {Column} from "./column";

type TypedRawColumn<
    TableNameT extends string,
    NameT extends string,
    TypeT
> = sd.AssertFunc<TypeT>|d.IColumn<TableNameT, NameT, TypeT>;
function isColumn<
    TableNameT extends string,
    NameT extends string,
    TypeT
> (raw : TypedRawColumn<TableNameT, NameT, TypeT>) : raw is d.IColumn<TableNameT, NameT, TypeT> {
    return (
        raw instanceof Object &&
        !(raw instanceof Function) &&
        !(raw instanceof sd.Field)
    );
}
function toColumn<
    TableNameT extends string,
    NameT extends string,
    TypeT
> (table : TableNameT, name : NameT, raw : TypedRawColumn<TableNameT, NameT, TypeT>) : d.IColumn<TableNameT, NameT, TypeT> {
    if (isColumn(raw)) {
        if (raw.table == table && raw.name == name) {
            return raw;
        } else {
            return new Column(table, name, raw.assertDelegate);
        }
    } else {
        return new Column(
            table,
            name,
            sd.toAssertDelegateExact(raw)
        );
    }
}

export function toColumnCollection<
    AliasT extends string,
    RawColumnCollectionT extends d.RawColumnCollection
> (
    alias  : AliasT,
    rawColumns : RawColumnCollectionT
) : d.ColumnCollection<AliasT, RawColumnCollectionT> {
    const result : d.ColumnCollection<AliasT, RawColumnCollectionT> = {} as any;
    for (let name in rawColumns) {
        if (!rawColumns.hasOwnProperty(name)) {
            continue;
        }
        const rawColumn = rawColumns[name];
        const column = toColumn(alias, name, rawColumn);
        result[name] = column as any;
    }
    return result;
}
