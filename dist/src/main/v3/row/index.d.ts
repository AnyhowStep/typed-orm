import { ITable } from "../table";
export declare type Row<TableT extends ITable> = ({
    readonly [columnName in Extract<keyof TableT["columns"], string>]: (ReturnType<TableT["columns"][columnName]["assertDelegate"]>);
});
//# sourceMappingURL=index.d.ts.map