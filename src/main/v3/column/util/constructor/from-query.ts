import {IQuery} from "../../../query";
import {FromQueryJoins} from "./from-query-joins";
import {FromQuerySelects} from "./from-query-selects";

export type FromQuery<QueryT extends IQuery> = (
    FromQueryJoins<QueryT> |
    FromQuerySelects<QueryT>
);