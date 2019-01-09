import { SelectItem } from "../../../select-item";
import { IJoin } from "../../../join";
import { IQuery } from "../../../query";
import { FromJoinArray } from "./from-join-array";
import { FromSelectItemArray } from "./from-select-item-array";
export declare type FromQuery<QueryT extends IQuery> = ((QueryT["_joins"] extends IJoin[] ? FromJoinArray<QueryT["_joins"]> : {}) & (QueryT["_parentJoins"] extends IJoin[] ? FromJoinArray<QueryT["_parentJoins"]> : {}) & (QueryT["_selects"] extends SelectItem[] ? FromSelectItemArray<QueryT["_selects"]> : {}));
export declare function fromQuery<QueryT extends IQuery>(query: QueryT): FromQuery<QueryT>;
//# sourceMappingURL=from-query.d.ts.map