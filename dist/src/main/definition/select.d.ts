import * as d from "../declaration";
import { Column } from "./column";
export declare function replaceColumnOfSelectTuple<TupleT extends d.Tuple<d.AnySelectTupleElement>, TableNameT extends string, NameT extends string, NewTypeT>(tuple: TupleT, newColumn: Column<TableNameT, NameT, NewTypeT>): d.ReplaceColumnOfSelectTuple<TupleT, TableNameT, NameT, NewTypeT>;
export declare function selectTupleHasDuplicateColumn(tuple: d.Tuple<d.AnySelectTupleElement>): boolean;
export declare function selectTupleToReferences<TupleT extends d.Tuple<d.AnySelectTupleElement>>(tuple: TupleT): d.SelectTupleToReferences<TupleT>;
