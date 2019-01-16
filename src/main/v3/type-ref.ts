import {ColumnRef} from "./column-ref";

export type TypeRef = {
    readonly [tableAlias : string] : {
        readonly [columnName : string] : any
    }
};
export namespace TypeRefUtil {
    export type FromColumnRef<
        RefT extends ColumnRef
    > = (
        {
            readonly [tableAlias in keyof RefT] : {
                readonly [columnName in keyof RefT[tableAlias]] : (
                    ReturnType<RefT[tableAlias][columnName]["assertDelegate"]>
                )
            }
        }
    );
}