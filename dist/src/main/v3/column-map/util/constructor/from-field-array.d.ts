import * as sd from "schema-decorator";
import { Column } from "../../../column";
export declare type FromFieldArray<TableAliasT extends string, FieldsT extends sd.AnyField[]> = (FieldsT[number] extends never ? {} : {
    readonly [columnName in FieldsT[number]["name"]]: (Column<{
        tableAlias: TableAliasT;
        name: columnName;
        assertDelegate: sd.AssertDelegate<sd.TypeOf<Extract<FieldsT[number], {
            name: columnName;
        }>["assertDelegate"]>>;
    }>);
});
export declare function fromFieldArray<TableAliasT extends string, FieldsT extends sd.AnyField[]>(tableAlias: TableAliasT, fields: FieldsT): (FromFieldArray<TableAliasT, FieldsT>);
