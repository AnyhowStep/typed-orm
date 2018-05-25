import * as sd from "schema-decorator";
import { AnyRawColumn } from "./raw-column";
import { Column, AnyColumn } from "../column";
export declare namespace RawColumnUtil {
    type TypeOf<RawColumnT extends AnyRawColumn> = (RawColumnT extends sd.AssertFunc<infer T> ? T : RawColumnT extends Column<any, any, infer T> ? T : never);
    type ToColumn<TableAliasT extends string, NameT extends string, RawColumnT extends AnyRawColumn> = (Column<TableAliasT, NameT, TypeOf<RawColumnT>>);
    function isColumn(rawColumn: AnyRawColumn): rawColumn is AnyColumn;
    function isAssertFunc(rawColumn: AnyRawColumn): rawColumn is sd.AssertFunc<any>;
    function toColumn<TableAliasT extends string, NameT extends string, RawColumnT extends AnyRawColumn>(tableAlias: TableAliasT, name: NameT, rawColumn: RawColumnT): (ToColumn<TableAliasT, NameT, RawColumnT>);
}
