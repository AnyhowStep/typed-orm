import { SelectItem } from "../../../select-item";
import { IJoin } from "../../../join";
import { IQuery } from "../../../query";
import { FromJoin } from "./from-join";
import { FromSelectItem } from "./from-select-item";
export declare type FromQuery<QueryT extends IQuery> = ((QueryT["_joins"] extends IJoin[] ? FromJoin<QueryT["_joins"][number]> : never) | (QueryT["_parentJoins"] extends IJoin[] ? FromJoin<QueryT["_parentJoins"][number]> : never) | (QueryT["_selects"] extends SelectItem[] ? FromSelectItem<QueryT["_selects"][number]> : never));
