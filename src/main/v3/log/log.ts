import {ITable} from "../table";
import {SortDirection} from "../order";
import {IConnection} from "../execution";
import {IColumn} from "../column";
import {IJoinDeclaration} from "../join-declaration";
import {TypeMapUtil} from "../type-map";
import * as LogUtil from "./util";

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
    readonly entity : ITable|undefined;
    readonly joinDeclaration : IJoinDeclaration<{
        //From `table`
        readonly fromTable : ITable,
        //To `entity`
        readonly toTable : ITable,
        readonly nullable : false,
    }>|undefined;
    //Must be a CK of `entity`
    readonly entityIdentifier : string[]|undefined;
    //(entityIdentifier, lastestOrder) must be a CK of `table`
    readonly latestOrder : [IColumn, SortDirection]|undefined;
    readonly tracked : string[]|undefined;
    readonly doNotCopy : string[]|undefined;
    readonly copy : string[];
    readonly copyDefaultsDelegate : ((
        args : {
            entityIdentifier : any,
            connection : IConnection,
        }
    ) => Promise<{}>)|undefined;
    //A literal value; unchanging.
    readonly trackedDefaults : {
        readonly [columnName : string] : any;
    }|undefined;
}
export interface ILog<DataT extends LogData=LogData> {
    readonly table : DataT["table"];
    readonly entity : DataT["entity"];
    readonly entityIdentifier : DataT["entityIdentifier"];
    readonly joinDeclaration : DataT["joinDeclaration"];
    readonly latestOrder : DataT["latestOrder"];
    readonly tracked : DataT["tracked"];
    readonly doNotCopy : DataT["doNotCopy"];
    readonly copy : DataT["copy"];
    readonly copyDefaultsDelegate : DataT["copyDefaultsDelegate"];
    readonly trackedDefaults : DataT["trackedDefaults"];
}
export interface LogNoTrackedDefaults {
    readonly table : ITable;
    readonly entity : ITable;
    readonly entityIdentifier : string[];
    readonly joinDeclaration : IJoinDeclaration<{
        //From `table`
        readonly fromTable : ITable,
        //To `entity`
        readonly toTable : ITable,
        readonly nullable : false,
    }>;
    readonly latestOrder : [IColumn, SortDirection];
    readonly tracked : string[];
    readonly doNotCopy : string[];
    readonly copy : string[];
    readonly copyDefaultsDelegate : (
        args : {
            entityIdentifier : any,
            connection : IConnection,
        }
    ) => Promise<{}>;
    readonly trackedDefaults : {
        readonly [columnName : string] : any;
    }|undefined;
}
export interface CompletedLog {
    readonly table : ITable;
    readonly entity : ITable;
    readonly entityIdentifier : string[];
    readonly joinDeclaration : IJoinDeclaration<{
        //From `table`
        readonly fromTable : ITable,
        //To `entity`
        readonly toTable : ITable,
        readonly nullable : false,
    }>;
    readonly latestOrder : [IColumn, SortDirection];
    readonly tracked : string[];
    readonly doNotCopy : string[];
    readonly copy : string[];
    readonly copyDefaultsDelegate : (
        args : {
            entityIdentifier : any,
            connection : IConnection,
        }
    ) => Promise<{}>;
    readonly trackedDefaults : {
        readonly [columnName : string] : any;
    };
}
export type EntityIdentifier<LogT extends ILog & { entityIdentifier : string[] }> = (
    {
        readonly [columnName in LogT["entityIdentifier"][number]] : (
            ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>
        )
    }
);
export type PreviousRow<LogT extends LogNoTrackedDefaults> = (
    {
        readonly [columnName in (
            LogT["entityIdentifier"][number] |
            LogT["tracked"][number] |
            LogT["copy"][number]
        )] : ReturnType<LogT["table"]["columns"][columnName]["assertDelegate"]>
    }
)
export class Log<DataT extends LogData> implements ILog<DataT> {
    readonly table : DataT["table"];
    readonly entity : DataT["entity"];
    readonly entityIdentifier : DataT["entityIdentifier"];
    readonly joinDeclaration : DataT["joinDeclaration"];
    readonly latestOrder : DataT["latestOrder"];
    readonly tracked : DataT["tracked"];
    readonly doNotCopy : DataT["doNotCopy"];
    readonly copy : DataT["copy"];
    readonly copyDefaultsDelegate : DataT["copyDefaultsDelegate"];
    readonly trackedDefaults : DataT["trackedDefaults"];

    constructor (data : DataT) {
        this.table = data.table;
        this.entity = data.entity;
        this.entityIdentifier = data.entityIdentifier;
        this.joinDeclaration = data.joinDeclaration;
        this.latestOrder = data.latestOrder;
        this.tracked = data.tracked;
        this.doNotCopy = data.doNotCopy;
        this.copy = data.copy;
        this.copyDefaultsDelegate = data.copyDefaultsDelegate;
        this.trackedDefaults = data.trackedDefaults;
    }

    setEntity<
        EntityT extends ITable
    > (
        this : Extract<this, LogUtil.LogMustSetEntity>,
        entity : LogUtil.AssertValidEntity<
            Extract<this, LogUtil.LogMustSetEntity>,
            EntityT
        >
    ) : (
        LogUtil.SetEntity<
            Extract<this, LogUtil.LogMustSetEntity>,
            EntityT
        >
    ) {
        return LogUtil.setEntity<
            Extract<this, LogUtil.LogMustSetEntity>,
            EntityT
        >(this, entity);
    }
    setEntityIdentifier<
        DelegateT extends LogUtil.SetEntityIdentifierDelegate<
            Extract<this, LogUtil.LogMustSetEntityIdentifier>
        >
    > (
        this : Extract<this, LogUtil.LogMustSetEntityIdentifier>,
        delegate : DelegateT
    ) : (
        LogUtil.AssertValidSetEntityIdentifierDelegate_Hack<
        Extract<this, LogUtil.LogMustSetEntityIdentifier>,
            DelegateT,
            LogUtil.SetEntityIdentifier<
                Extract<this, LogUtil.LogMustSetEntityIdentifier>,
                DelegateT
            >
        >
    ) {
        return LogUtil.setEntityIdentifier(this, delegate);
    }
    setLatestOrder<
        DelegateT extends LogUtil.SetLatestOrderDelegate<
            Extract<this, LogUtil.LogMustSetLatestOrder>
        >
    > (
        this : Extract<this, LogUtil.LogMustSetLatestOrder>,
        delegate : DelegateT
    ) : (
        LogUtil.AssertValidSetLatestOrderDelegate_Hack<
            Extract<this, LogUtil.LogMustSetLatestOrder>,
            DelegateT,
            LogUtil.SetLatestOrder<
                Extract<this, LogUtil.LogMustSetLatestOrder>,
                DelegateT
            >
        >
    ) {
        return LogUtil.setLatestOrder(
            this,
            delegate
        );
    }
    setTracked<
        DelegateT extends LogUtil.SetTrackedDelegate<
            Extract<this, LogUtil.LogMustSetTracked>
        >
    > (
        this : Extract<this, LogUtil.LogMustSetTracked>,
        delegate : DelegateT
    ) : (
        LogUtil.SetTracked<
            Extract<this, LogUtil.LogMustSetTracked>,
            DelegateT
        >
    ) {
        return LogUtil.setTracked(this, delegate);
    }
    setDoNotCopy<
        DelegateT extends LogUtil.SetDoNotCopyDelegate<
            Extract<this, LogUtil.LogMustSetDoNotCopy>
        >
    > (
        this : Extract<this, LogUtil.LogMustSetDoNotCopy>,
        delegate : DelegateT
    ) : (
        LogUtil.SetDoNotCopy<
            Extract<this, LogUtil.LogMustSetDoNotCopy>,
            DelegateT
        >
    ) {
        return LogUtil.setDoNotCopy(this, delegate);
    }
    setCopyDefaultsDelegate (
        this : Extract<this, LogUtil.LogMustSetCopyDefaultsDelegate>,
        dynamicDefaultValueDelegate : LogUtil.CopyDefaultsDelegate<
            Extract<this, LogUtil.LogMustSetCopyDefaultsDelegate>
        >
    ) : (
        LogUtil.SetCopyDefaultsDelegate<
            Extract<this, LogUtil.LogMustSetCopyDefaultsDelegate>
        >
    ) {
        return LogUtil.setCopyDefaultsDelegate(this, dynamicDefaultValueDelegate);
    }
    setTrackedDefaults<
        MapT extends LogUtil.TrackedDefaultsMap<
            Extract<this, LogUtil.LogMustSetTrackedDefaults>
        >
    > (
        this : Extract<this, LogUtil.LogMustSetTrackedDefaults>,
        rawMap : MapT
    ) : (
        LogUtil.SetTrackedDefaults<
            Extract<this, LogUtil.LogMustSetTrackedDefaults>,
            MapT
        >
    ) {
        return LogUtil.setTrackedDefaults(this, rawMap);
    }
    latestQuery (
        this : Extract<this, LogNoTrackedDefaults>,
        entityIdentifier : EntityIdentifier<Extract<this, LogNoTrackedDefaults>>
    ) : LogUtil.LatestQuery<Extract<this, LogNoTrackedDefaults>> {
        return LogUtil.latestQuery(
            this,
            entityIdentifier
        );
    }
    fetchLatestOrUndefined (
        this : Extract<this, LogNoTrackedDefaults>,
        entityIdentifier : EntityIdentifier<Extract<this, LogNoTrackedDefaults>>,
        connection : IConnection
    ) : Promise<TypeMapUtil.FromTable<Extract<this, LogNoTrackedDefaults>["table"]>|undefined> {
        return LogUtil.fetchLatestOrUndefined(
            this,
            entityIdentifier,
            connection
        );
    }
}