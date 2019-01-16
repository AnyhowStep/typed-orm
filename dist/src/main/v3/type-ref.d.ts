import { ColumnRef } from "./column-ref";
export declare type TypeRef = {
    readonly [tableAlias: string]: {
        readonly [columnName: string]: any;
    };
};
export declare namespace TypeRefUtil {
    type FromColumnRef<RefT extends ColumnRef> = ({
        readonly [tableAlias in keyof RefT]: {
            readonly [columnName in keyof RefT[tableAlias]]: (ReturnType<RefT[tableAlias][columnName]["assertDelegate"]>);
        };
    });
}
//# sourceMappingURL=type-ref.d.ts.map