import {CompletedLog, EntityIdentifier, PreviousRow} from "../../log";
import {Row} from "../../../row";
import {IConnection} from "../../../execution";
import {fetchLatestOrUndefined} from "./fetch-latest-or-undefined";
import {fetchDefault} from "./fetch-default";

export type FetchLatestOrDefaultResult<LogT extends CompletedLog> = (
    {
        isDefault : false,
        latest : Row<LogT["table"]>,
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
    connection : IConnection,
    entityIdentifier : EntityIdentifier<LogT>
) : Promise<FetchLatestOrDefaultResult<LogT>> {
    return fetchLatestOrUndefined(log, connection, entityIdentifier)
        .then((latest) : Promise<FetchLatestOrDefaultResult<LogT>> => {
            if (latest != undefined) {
                return Promise.resolve({
                    isDefault : false as false,
                    latest,
                    row : latest as PreviousRow<LogT>,
                });
            }
            return fetchDefault<LogT>(log, connection, entityIdentifier)
                .then((def) : FetchLatestOrDefaultResult<LogT> => {
                    return {
                        isDefault : true,
                        default : def,
                        row : def,
                    };
                });
        });
}