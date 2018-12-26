import { MainQuery, OneSelectItemQuery } from "../predicate";
import { IConnection } from "../../../execution";
import { SelectItemUtil } from "../../../select-item";
export declare type FetchValue<QueryT extends MainQuery & OneSelectItemQuery<any>> = (SelectItemUtil.TypeOf<QueryT["_selects"][0]>);
export declare function fetchValue<QueryT extends MainQuery & OneSelectItemQuery<any>>(query: QueryT, connection: IConnection): Promise<FetchValue<QueryT>>;
//# sourceMappingURL=fetch-value.d.ts.map