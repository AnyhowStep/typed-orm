import { IConnection } from "../execution";
import { InsertableLog, LogUtil } from "../log";
import { ITable } from "../table";
import { Row } from "../row";
export declare type Delegate<T> = (args: T) => (void | Promise<void>);
export declare class EventImpl<T> {
    private delegates;
    has(d: Delegate<T>): boolean;
    add(d: Delegate<T>): void;
    remove(d: Delegate<T>): void;
    invoke(args: T): Promise<void>;
}
export declare class Event<RowT> extends EventImpl<{
    connection: IConnection;
    row: RowT;
}> {
}
export declare class TrackEvent<LogT extends InsertableLog> extends EventImpl<{
    connection: IConnection;
    trackResult: LogUtil.TrackResult<LogT>;
}> {
}
export declare class TableEvent<TableT extends ITable> extends EventImpl<{
    connection: IConnection;
    row: Row<TableT>;
}> {
}
//# sourceMappingURL=index.d.ts.map