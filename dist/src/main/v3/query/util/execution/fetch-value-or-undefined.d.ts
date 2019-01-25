import { MainQuery, OneSelectItemQuery } from "../predicate";
import { IConnection } from "../../../execution";
import { SelectItemUtil } from "../../../select-item";
export declare type FetchValueOrUndefined<QueryT extends MainQuery & OneSelectItemQuery<any>> = (SelectItemUtil.TypeOf<QueryT["_selects"][0]> | undefined);
export declare function fetchValueOrUndefined<QueryT extends MainQuery & OneSelectItemQuery<any>>(query: QueryT, connection: IConnection): Promise<FetchValueOrUndefined<QueryT>>;
