import { Table } from "./table";
import { ColumnMapUtil } from "../column-map";
import { AssertMap, AssertMapUtil } from "../assert-map";
export declare function tableFromAssertMap<NameT extends string, AssertMapT extends AssertMap>(name: NameT, assertMap: AssertMapT): (Table<{
    readonly usedRef: {};
    readonly alias: NameT;
    readonly name: NameT;
    readonly columns: ColumnMapUtil.FromAssertMap<NameT, AssertMapT>;
    readonly autoIncrement: undefined;
    readonly generated: [];
    readonly isNullable: AssertMapUtil.NullableNameUnion<AssertMapT>[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: Extract<keyof AssertMapT, string>[];
    readonly id: undefined;
    readonly candidateKeys: [];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>);
//# sourceMappingURL=from-assert-map.d.ts.map