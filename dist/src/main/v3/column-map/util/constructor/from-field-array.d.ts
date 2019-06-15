import * as sd from "type-mapping";
import { Column } from "../../../column";
export declare type FromFieldArray<TableAliasT extends string, FieldsT extends sd.AnyField[]> = (FieldsT[number] extends never ? {} : {
    readonly [columnName in FieldsT[number]["__name"]]: (Column<{
        tableAlias: TableAliasT;
        name: columnName;
        assertDelegate: sd.SafeMapper<sd.OutputOf<Extract<FieldsT[number], sd.Name<columnName>>>>;
    }>);
});
export declare function fromFieldArray<TableAliasT extends string, FieldsT extends sd.AnyField[]>(tableAlias: TableAliasT, fields: FieldsT): (FromFieldArray<TableAliasT, FieldsT>);
