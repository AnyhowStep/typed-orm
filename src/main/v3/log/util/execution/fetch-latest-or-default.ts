import {CompletedLog, EntityIdentifier} from "../../log";
import {TypeMapUtil} from "../../../type-map";
import {IConnection} from "../../../execution";
import {PromiseResult} from "../../../type";
import {fetchLatestOrUndefined} from "./fetch-latest-or-undefined";
import {entityIdentifierAssertDelegate} from "../operation";

export type FetchLatestOrDefaultResult<LogT extends CompletedLog> = (
    {
        isDefault : false,
        latest : TypeMapUtil.FromTable<LogT["table"]>,
    } |
    {
        isDefault : true,
        default : (
            EntityIdentifier<LogT> &
            LogT["staticDefaultValue"] &
            PromiseResult<ReturnType<LogT["dynamicDefaultValueDelegate"]>>
        )
    }
);
export function fetchLatestOrDefault<LogT extends CompletedLog> (
    log : LogT,
    entityIdentifier : EntityIdentifier<LogT>,
    connection : IConnection
) : Promise<FetchLatestOrDefaultResult<LogT>> {
    const assertDelegate = entityIdentifierAssertDelegate(log);
    entityIdentifier = assertDelegate(
        `${log.table.alias}.entityIdentifier`,
        entityIdentifier
    );
    return fetchLatestOrUndefined(log, entityIdentifier, connection)
        .then((latest) : Promise<FetchLatestOrDefaultResult<LogT>> => {
            if (latest != undefined) {
                return Promise.resolve({
                    isDefault : false as false,
                    latest,
                });
            }
            return log.dynamicDefaultValueDelegate(
                entityIdentifier,
                connection
            ).then((dynamicDefaultValue) : FetchLatestOrDefaultResult<LogT> => {
                return {
                    isDefault : true as true,
                    default : {
                        ...dynamicDefaultValue,
                        ...log.staticDefaultValue,
                        ...entityIdentifier,
                    } as any,
                };
            });
        });
}