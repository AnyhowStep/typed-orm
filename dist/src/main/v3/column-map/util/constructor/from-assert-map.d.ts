import * as sd from "type-mapping";
import { Column } from "../../../column";
import { AssertMap } from "../../../assert-map";
export declare type FromAssertMap<TableAliasT extends string, AssertMapT extends AssertMap> = ({
    readonly [columnName in Extract<keyof AssertMapT, string>]: (Column<{
        tableAlias: TableAliasT;
        name: columnName;
        assertDelegate: sd.SafeMapper<sd.OutputOf<AssertMapT[columnName]>>;
    }>);
});
export declare function fromAssertMap<TableAliasT extends string, AssertMapT extends {
    readonly [columnName: string]: sd.AnySafeMapper;
}>(tableAlias: TableAliasT, assertMap: AssertMapT): (FromAssertMap<TableAliasT, AssertMapT>);
