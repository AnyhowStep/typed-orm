import {ITable} from "../table";
import {SortDirection} from "../order";
import {IConnection} from "../execution";
import {IColumn} from "../column";

/*
    Enables use of the audit log pattern.

    We could be tracking a person's speed
    over time.

    In this case, the person would be the entity.

    And the speed would be what's tracked.

    -----

    ### `entityIdentifier`
    Uniquely identifies each entity. The entity's PK/CK.

    ### `latestOrder`
    The `entityIdentifier` + `latestOrder` must be
    a candidate key of the log table.

    ### `tracked`
    Tracked columns indicate that these values
    change over time, and that we want to log them.

    Example, this lets us retrieve the latest
    speed of a person.

    ### `doNotCopy`
    Values we do not want to copy when adding a row
    to the log.

    Consider the following table,

    |entityId|value|updatedAt|updatedBy|

    The `entityIdentifier` is `entityId`
    The `tracked` is `value`
    The `latestOrder` is `updatedAt`
    The `doNotCopy` is `updatedBy`

    If user X says, "Update X's value to 5",
    we add a row,

    |entityId|value|updatedAt|updatedBy|
    |X       |5    |10:00AM  |X        |

    Then, when user Y says, "Update X's value to 5",
    we notice that all `tracked` column values have not changed.

    So, we do not add a row.

    Then, when user Z says, "Update X's value to 6",
    we add a row,

    |entityId|value|updatedAt|updatedBy|
    |X       |6    |12:00PM  |Z        |

    So, we can change the value of `updatedBy`, but only
    if the value of whatever is being tracked changes.

    ### `copy`
    Columns not in `entityIdentifier`, `tracked`, `latestOrder`,
    and `doNotCopy` are implicitly copied over
    when new rows are added.

    ### `staticDefaultValue`
    May contain the default values of `tracked`, `doNotCopy`,
    and `copy`.

    These default values apply to all entities
    that have no rows logged yet.

    ### `dynamicDefaultValueDelegate`
    For default values that differ between entities,
    this delegate should return all such values.
*/
export interface LogData {
    readonly table : ITable;
    /*

    */
    readonly entityIdentifier : string[];
    readonly latestOrder : [IColumn, SortDirection];
    readonly tracked : string[];
    readonly doNotCopy : string[];
    readonly copy : string[];
    readonly staticDefaultValue : {
        readonly [columnName : string] : any;
    };
    readonly dynamicDefaultValueDelegate : (
        entityIdentifier : {},
        connection : IConnection
    ) => Promise<{}>;
}