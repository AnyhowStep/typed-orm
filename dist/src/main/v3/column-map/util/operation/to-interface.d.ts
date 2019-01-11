import { ColumnMap } from "../../column-map";
import { ColumnUtil } from "../../../column";
export declare type ToInterface<MapT extends ColumnMap> = ({
    readonly [columnName in keyof MapT]: (ColumnUtil.ToInterface<MapT[columnName]>);
});
//# sourceMappingURL=to-interface.d.ts.map