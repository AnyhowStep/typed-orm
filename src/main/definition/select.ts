import * as d from "../declaration";
import {Column} from "./column";
import {ColumnExpr} from "./expr";
import {replaceColumnOfReference, copyReferences} from "./column-references-operation";
import {tableToReference} from "./table-operation";

export function replaceColumnOfSelectTuple<
    TupleT extends d.Tuple<d.AnySelectTupleElement>,
    TableNameT extends string,
    NameT extends string,
    NewTypeT
> (
    tuple : TupleT,
    newColumn : Column<TableNameT, NameT, NewTypeT>
) : d.ReplaceColumnOfSelectTuple<
    TupleT,
    TableNameT,
    NameT,
    NewTypeT
> {
    return tuple.map((element) => {
        if (element instanceof ColumnExpr) {
            if (element.table == newColumn.table && element.name == newColumn.name) {
                return new ColumnExpr(
                    element.usedReferences,
                    element.table,
                    element.name,
                    newColumn.assertDelegate,
                    //TODO Test if this is correct
                    element.originalQuery
                );
            } else {
                return element;
            }
        } else if (element instanceof Column) {
            if (element.table == newColumn.table && element.name == newColumn.name) {
                return newColumn;
            } else {
                return element;
            }
        } else if (element instanceof Object) {
            let tmp = {
                [newColumn.table] : element
            }
            tmp = replaceColumnOfReference(tmp, newColumn);
            return tmp[newColumn.table];
        } else {
            throw new Error(`Unknown select tuple element; (${typeof element})${element}`);
        }
    }) as any;
}

export function selectTupleHasDuplicateColumn (tuple : d.Tuple<d.AnySelectTupleElement>) : boolean {
    const columns = tuple.reduce<([string, string])[]>((memo, element) => {
        if (element instanceof ColumnExpr) {
            memo.push([element.table, element.name]);
        } else if (element instanceof Column) {
            memo.push([element.table, element.name]);
        } else if (element instanceof Object) {
            for (let name in element) {
                if (element.hasOwnProperty(name)) {
                    const sub = element[name];
                    memo.push([sub.table, sub.name]);
                }
            }
        } else {
            throw new Error(`Unknown select tuple element; (${typeof element})${element}`);
        }
        return memo;
    }, [] as any);

    //TODO Not use nested for-loop?
    for (let i=0; i<columns.length; ++i) {
        for (let j=i+1; j<columns.length; ++j) {
            if (
                columns[i][0] == columns[j][0] &&
                columns[i][1] == columns[j][1]
            ) {
                return true;
            }
        }
    }
    return false;
}

export function selectTupleToReferences<
    TupleT extends d.Tuple<d.AnySelectTupleElement>
> (
    tuple : TupleT
) : d.SelectTupleToReferences<TupleT> {
    return tuple.reduce((memo, element) => {
        if (element instanceof ColumnExpr) {
            if (memo[element.table] == undefined) {
                memo[element.table] = {};
            }
            //TODO Check if this works, kind of dubious
            memo[element.table][element.name] = new Column(
                element.table,
                element.name,
                element.assertDelegate,
                undefined,
                true
            );
        } else if (element instanceof Column) {
            if (memo[element.table] == undefined) {
                memo[element.table] = {};
            }
            //memo[element.table][element.name] = element;
            memo[element.table][element.name] = new Column(
                element.table,
                element.name,
                element.assertDelegate,
                undefined,
                true
            );
        } else if (element instanceof Object) {
            for (let name in element) {
                if (element.hasOwnProperty(name)) {
                    const sub = element[name];
                    if (memo[sub.table] == undefined) {
                        memo[sub.table] = {};
                    }
                    //memo[sub.table][sub.name] = sub;
                    memo[sub.table][sub.name] = new Column(
                        sub.table,
                        sub.name,
                        sub.assertDelegate,
                        undefined,
                        true
                    );
                }
            }
        } else {
            throw new Error(`Unknown select tuple element; (${typeof element})${element}`);
        }
        return memo;
    }, {} as any);
}

export function selectAllReference<ColumnReferencesT extends d.ColumnReferences> (
    columnReferences : ColumnReferencesT
) {
    const result = copyReferences(columnReferences);
    for (let table in result) {
        for (let name in result[table]) {
            const element = result[table][name];
            result[table][name] = new Column(
                element.table,
                element.name,
                element.assertDelegate,
                undefined,
                true
            );
        }
    }
    return result;
}
//TODO Fix this, it shouldn't use the JOIN tuple,
//The NARROW clauses might have restricted the type
export function joinTupleToSelectTuple<
    JoinTupleT extends d.Tuple<d.AnyJoin>
> (
    joinTuple : JoinTupleT
) : d.JoinsToSelectTuple<JoinTupleT> {
    const result : any[] = [];
    for (let join of joinTuple) {
        result.push(tableToReference(join.table)[join.table.alias]);
    }
    return result as any;
}
