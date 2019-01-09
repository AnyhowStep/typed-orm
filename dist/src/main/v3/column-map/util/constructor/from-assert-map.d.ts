import * as sd from "schema-decorator";
import { Column } from "../../../column";
import { AssertMap } from "../../../assert-map";
export declare type FromAssertMap<TableAliasT extends string, AssertMapT extends AssertMap> = ({
    readonly [columnName in Extract<keyof AssertMapT, string>]: (Column<{
        tableAlias: TableAliasT;
        name: columnName;
        assertDelegate: sd.ToAssertDelegate<AssertMapT[columnName]>;
    }>);
});
export declare function fromAssertMap<TableAliasT extends string, AssertMapT extends {
    readonly [columnName: string]: sd.AnyAssertFunc;
}>(tableAlias: TableAliasT, assertMap: AssertMapT): (FromAssertMap<TableAliasT, AssertMapT>);
//# sourceMappingURL=from-assert-map.d.ts.map