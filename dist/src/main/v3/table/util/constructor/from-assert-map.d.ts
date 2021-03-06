import { Table } from "../../table";
import { ColumnMapUtil } from "../../../column-map";
import { AssertMap, AssertMapUtil } from "../../../assert-map";
export declare type FromAssertMap<NameT extends string, AssertMapT extends AssertMap> = (Table<{
    readonly usedRef: {};
    readonly alias: NameT;
    readonly columns: ColumnMapUtil.FromAssertMap<NameT, AssertMapT>;
    readonly autoIncrement: undefined;
    readonly id: undefined;
    readonly primaryKey: undefined;
    readonly candidateKeys: [];
    readonly generated: [];
    readonly isNullable: AssertMapUtil.NullableNameUnion<AssertMapT>[];
    readonly hasExplicitDefaultValue: [];
    readonly mutable: Extract<keyof AssertMapT, string>[];
    readonly parents: [];
    readonly insertAllowed: true;
    readonly deleteAllowed: true;
}>);
export declare function fromAssertMap<NameT extends string, AssertMapT extends AssertMap>(name: NameT, assertMap: AssertMapT): (FromAssertMap<NameT, AssertMapT>);
