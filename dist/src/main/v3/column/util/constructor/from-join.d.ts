import { IJoin } from "../../../join";
import { ColumnMapUtil } from "../../../column-map";
import { FromColumnMap } from "./from-column-map";
export declare type FromJoin<JoinT extends IJoin> = (JoinT extends IJoin ? FromColumnMap<ColumnMapUtil.FromJoin<JoinT>> : never);
//# sourceMappingURL=from-join.d.ts.map