import {CompletedLog, EntityIdentifier, PreviousRow} from "../../log";
import {TypeMapUtil} from "../../../type-map";
import {IConnection} from "../../../execution";
import {fetchLatestOrUndefined} from "./fetch-latest-or-undefined";
import {fetchDefault} from "./fetch-default";

export type FetchLatestOrDefaultResult<LogT extends CompletedLog> = (
    {
        isDefault : false,
        latest : TypeMapUtil.FromTable<LogT["table"]>,
        row : PreviousRow<LogT>,
    } |
    {
        isDefault : true,
        default : PreviousRow<LogT>,
        row : PreviousRow<LogT>,
    }
);
export function fetchLatestOrDefault<LogT extends CompletedLog> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>,
    connection : IConnection
) : Promise<FetchLatestOrDefaultResult<LogT>> {
    return fetchLatestOrUndefined(log, entityIdentifier, connection)
        .then((latest) : Promise<FetchLatestOrDefaultResult<LogT>> => {
            if (latest != undefined) {
                return Promise.resolve({
                    isDefault : false as false,
                    latest,
                    row : latest as PreviousRow<LogT>,
                });
            }
            return fetchDefault<LogT>(log, entityIdentifier, connection)
                .then((def) : FetchLatestOrDefaultResult<LogT> => {
                    return {
                        isDefault : true,
                        default : def,
                        row : def,
                    };
                });
        });
}