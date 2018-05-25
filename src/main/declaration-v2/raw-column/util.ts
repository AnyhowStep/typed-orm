import * as sd from "schema-decorator";
import {AnyRawColumn} from "./raw-column";
import {Column, AnyColumn} from "../column";

export namespace RawColumnUtil {
    export type TypeOf<RawColumnT extends AnyRawColumn> = (
        RawColumnT extends sd.AssertFunc<infer T> ?
        T :
        RawColumnT extends Column<any, any, infer T> ?
        T :
        never
    );

    export type ToColumn<
        TableAliasT extends string,
        NameT extends string,
        RawColumnT extends AnyRawColumn
    > = (
        Column<
            TableAliasT,
            NameT,
            TypeOf<RawColumnT>
        >
    );
    export function isColumn (rawColumn : AnyRawColumn) : rawColumn is AnyColumn {
        return rawColumn instanceof Column;
    }
    export function isAssertFunc (rawColumn : AnyRawColumn) : rawColumn is sd.AssertFunc<any> {
        return !(rawColumn instanceof Column);
    }
    export function toColumn<
        TableAliasT extends string,
        NameT extends string,
        RawColumnT extends AnyRawColumn
    > (
        tableAlias : TableAliasT,
        name : NameT,
        rawColumn : RawColumnT
    ) : (
        ToColumn<TableAliasT, NameT, RawColumnT>
    ) {
        if (isColumn(rawColumn)) {
            if (tableAlias == rawColumn.tableAlias && name == rawColumn.name) {
                return rawColumn as any;
            } else {
                return new Column(
                    tableAlias,
                    name,
                    rawColumn.assertDelegate
                ) as any;
            }
        } else if (isAssertFunc(rawColumn)) {
            return new Column(
                tableAlias,
                name,
                sd.toAssertDelegateExact(rawColumn)
            ) as any;
        } else {
            throw new Error(`Unknown raw column ${typeof rawColumn}`);
        }
    }
}