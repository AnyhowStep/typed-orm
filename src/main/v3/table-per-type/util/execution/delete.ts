import {ITable} from "../../../table";

function calculateWeight (
    weights : Map<string, number>,
    cur : ITable,
    previousTables : ITable[]
) {
    if (weights.has(cur.alias)) {
        return;
    }

    for (let prvIndex=previousTables.length-1; prvIndex>=0; --prvIndex) {
        const prv = previousTables[prvIndex];
        const childOfCur = prv.parents.findIndex(p => p.alias == cur.alias) >= 0;
        if (childOfCur) {
            const prvWeight = weights.get(prv.alias);
            if (prvWeight == undefined) {
                //This should never happen
                throw new Error(`Failed to compute weight for ${prv.alias}`);
            }
            weights.set(cur.alias, prvWeight + 1);
            return;
        }
    }
    weights.set(cur.alias, 1);
}
/*
    Tells us which tables to delete first, to ensure
    that all tables can be deleted safely.

    Especially useful when we have diamond inheritance.
*/
export function calculateDeleteOrder (table : ITable) : ITable[] {
    const weights = new Map<string, number>();
    for (let curIndex=0; curIndex<table.parents.length; ++curIndex) {
        const cur = table.parents[curIndex];
        calculateWeight(
            weights,
            cur,
            table.parents.slice(0, curIndex)
        );
    }
    const arr : [ITable, number][] = [];
    arr.push([table, 0]);

    for (let [alias, weight] of weights) {
        const parent = table.parents.find(p => p.alias == alias);
        if (parent == undefined) {
            throw new Error(`Cannot find parent ${alias}`);
        }
        arr.push([parent, weight]);
    }
    const sorted = arr
        .sort((a, b) => (a[1] - b[1]))
        .map((kvp) => kvp[0]);
    return sorted;
}