"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventImpl {
    constructor() {
        this.delegates = [];
    }
    has(d) {
        const index = this.delegates.indexOf(d);
        return index >= 0;
    }
    add(d) {
        if (this.has(d)) {
            return;
        }
        this.delegates.push(d);
    }
    remove(d) {
        const index = this.delegates.indexOf(d);
        if (index >= 0) {
            this.delegates.splice(index, 1);
        }
    }
    async invoke(args) {
        //We make a copy because these delegates could remove themselves when called.
        //Or add other delegates.
        //Modifying arrays when iterating over them is a bad idea.
        const delegates = this.delegates.slice();
        for (let d of delegates) {
            await d(args);
        }
    }
}
exports.EventImpl = EventImpl;
class Event extends EventImpl {
}
exports.Event = Event;
class TrackEvent extends EventImpl {
}
exports.TrackEvent = TrackEvent;
class TableEvent extends EventImpl {
}
exports.TableEvent = TableEvent;
//# sourceMappingURL=index.js.map