import { MainQuery, OneSelectItemQuery } from "../predicate";
import { IConnection } from "../../../execution";
import { SelectItemUtil } from "../../../select-item";
export declare type FetchValueArray<QueryT extends MainQuery & OneSelectItemQuery<any>> = (SelectItemUtil.TypeOf<QueryT["_selects"][0]>[]);
export declare function fetchValueArray<QueryT extends MainQuery & OneSelectItemQuery<any>>(query: QueryT, connection: IConnection): Promise<FetchValueArray<QueryT>>;
//# sourceMappingURL=fetch-value-array.d.ts.map