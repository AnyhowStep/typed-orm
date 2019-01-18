import {IConnection} from "../execution";
import {InsertableLog, LogUtil} from "../log";
import {ITable} from "../table";
import {Row} from "../row";

export type Delegate<T> = (args : T) => (void|Promise<void>);
export class EventImpl<T> {
    private delegates : Delegate<T>[] = [];
    public has (d : Delegate<T>) : boolean {
        const index = this.delegates.indexOf(d);
        return index >= 0;
    }
    public add (d : Delegate<T>) : void {
        if (this.has(d)) {
            return;
        }
        this.delegates.push(d);
    }
    public remove (d : Delegate<T>) : void {
        const index = this.delegates.indexOf(d);
        if (index >= 0) {
            this.delegates.splice(index, 1);
        }
    }
    public async invoke (args : T) {
        //We make a copy because these delegates could remove themselves when called.
        //Or add other delegates.
        //Modifying arrays when iterating over them is a bad idea.
        const delegates = this.delegates.slice();
        for (let d of delegates) {
            await d(args);
        }
    }
}
export class Event<RowT> extends EventImpl<{
    connection : IConnection,
    row : RowT,
}> {
}
export class TrackEvent<LogT extends InsertableLog> extends EventImpl<{
    connection : IConnection,
    trackResult : LogUtil.TrackResult<LogT>,
}> {
}
export class TableEvent<TableT extends ITable> extends EventImpl<{
    connection : IConnection,
    row : Row<TableT>,
}> {
}