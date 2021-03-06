import * as sd from "type-mapping";
import { ITable } from "../../table";
import { AssertMap } from "../../../assert-map";
import { AddColumnsFromAssertMap } from "./add-columns-from-assert-map";
import { AddColumnsFromFieldTuple } from "./add-columns-from-field-tuple";
export declare function addColumns<TableT extends ITable, FieldsT extends sd.AnyField[]>(table: TableT, fields: FieldsT): (AddColumnsFromFieldTuple<TableT, FieldsT>);
export declare function addColumns<TableT extends ITable, AssertMapT extends AssertMap>(table: TableT, assertMap: AssertMapT): (AddColumnsFromAssertMap<TableT, AssertMapT>);
