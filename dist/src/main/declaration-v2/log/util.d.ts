import * as sd from "schema-decorator";
import { LogData } from "./log-data";
import { PooledDatabase } from "../PooledDatabase";
import { TableRow } from "../table";
import { InsertLiteralRow } from "../insert-value-builder";
export declare namespace LogDataUtil {
    type EntityIdentifier<DataT extends LogData> = ({
        [columnName in Extract<Extract<keyof DataT["table"]["columns"], keyof DataT["entityIdentifier"]>, string>]: (ReturnType<DataT["table"]["columns"][columnName]["assertDelegate"]>);
    });
    function entityIdentifierAssertDelegate<DataT extends LogData>(data: DataT): sd.AssertDelegate<EntityIdentifier<DataT>>;
    type Trackable<DataT extends LogData> = ({
        [columnName in Extract<Extract<keyof DataT["table"]["columns"], keyof DataT["isTrackable"]>, string>]?: (ReturnType<DataT["table"]["columns"][columnName]["assertDelegate"]>);
    });
    function trackableAssertDelegate<DataT extends LogData>(data: DataT): sd.AssertDelegate<Trackable<DataT>>;
    type DoNotCopyOnTrackableChanged<DataT extends LogData> = ({
        [columnName in Extract<keyof InsertLiteralRow<DataT["table"]>, Extract<keyof DataT["doNotCopyOnTrackableChanged"], string>>]: (InsertLiteralRow<DataT["table"]>[columnName]);
    });
    function doNotCopyOnTrackableChangedAssertDelegate<DataT extends LogData>(data: DataT): sd.AssertDelegate<DoNotCopyOnTrackableChanged<DataT>>;
    type InsertIfDifferentRow<DataT extends LogData> = (Trackable<DataT> & DoNotCopyOnTrackableChanged<DataT>);
    function insertIfDifferentRowAssertDelegate<DataT extends LogData>(data: DataT): sd.AssertDelegate<InsertIfDifferentRow<DataT>>;
    function fetchLatestOrError<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>): Promise<TableRow<DataT["table"]>>;
    function fetchLatestOrUndefined<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>): Promise<TableRow<DataT["table"]> | undefined>;
    function fetchLatestOrDefault<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>): Promise<TableRow<DataT["table"]>>;
    function insertIfDifferentAndFetch<DataT extends LogData>(db: PooledDatabase, data: DataT, entityIdentifier: EntityIdentifier<DataT>, insertIfDifferentRow: InsertIfDifferentRow<DataT>): Promise<{
        latest: TableRow<DataT["table"]>;
        wasInserted: boolean;
    }>;
}
export declare type Trackable<DataT extends LogData> = LogDataUtil.Trackable<DataT>;
