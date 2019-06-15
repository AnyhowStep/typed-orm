import * as sd from "type-mapping";
import {Writable} from "../../../type";
import {ColumnMap} from "../../column-map";
import {Column} from "../../../column";
import {AssertMap} from "../../../assert-map";

export type FromAssertMap<
    TableAliasT extends string,
    AssertMapT extends AssertMap
> = (
    {
        readonly [columnName in Extract<keyof AssertMapT, string>] : (
            Column<{
                tableAlias : TableAliasT,
                name : columnName,
                assertDelegate : sd.SafeMapper<sd.OutputOf<AssertMapT[columnName]>>
            }>
        )
    }
);
export function fromAssertMap<
    TableAliasT extends string,
    AssertMapT extends {
        readonly [columnName : string] : sd.AnySafeMapper
    }
> (
    tableAlias : TableAliasT,
    assertMap : AssertMapT
) : (
    FromAssertMap<TableAliasT, AssertMapT>
) {
    const result : Writable<ColumnMap> = {};
    for (let columnName in assertMap) {
        result[columnName] = new Column({
            tableAlias : tableAlias,
            name : columnName,
            assertDelegate : assertMap[columnName],
        });
    }
    return result as FromAssertMap<TableAliasT, AssertMapT>;
}