import * as sd from "schema-decorator";
import { ITable } from "./table";
import { Tuple } from "../tuple";
import { AssertMap } from "../assert-map";
import { FromAssertMap } from "./util";
import { FromFieldTuple } from "./util";
import { FromTable } from "./util";
import { FromName } from "./util";
export declare function table<NameT extends string, AssertMapT extends AssertMap>(name: NameT, assertMap: AssertMapT): (FromAssertMap<NameT, AssertMapT>);
export declare function table<NameT extends string, FieldsT extends Tuple<sd.AnyField>>(name: NameT, fields: FieldsT): (FromFieldTuple<NameT, FieldsT>);
export declare function table<NameT extends string>(name: NameT): (FromName<NameT>);
export declare function table<TableT extends ITable>(table: TableT): (FromTable<TableT>);
//# sourceMappingURL=instantiate.d.ts.map