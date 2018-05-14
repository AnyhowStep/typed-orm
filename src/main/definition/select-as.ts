import * as d from "../declaration";
import {ColumnExpr} from "./expr";
import {Column} from "./column";
import {isPartialColumnReferences} from "./column-references-operation";

export function isJoinableSelectTupleElement<
    ColumnReferencesT extends d.ColumnReferences
> (
    columnReferences : ColumnReferencesT,
    mixed : any
) : mixed is d.JoinableSelectTupleElement<ColumnReferencesT> {
    if (mixed instanceof ColumnExpr) {
        return isPartialColumnReferences(columnReferences, mixed.usedReferences);
    }
    if (mixed instanceof Column) {
        if (columnReferences[mixed.table] == undefined) {
            return false;
        }
        if (columnReferences[mixed.table][mixed.name] == undefined) {
            return false;
        }
        return true;
    }

    return false;
}

export function isJoinableSelectTuple<
    ColumnReferencesT extends d.ColumnReferences
> (
    columnReferences : ColumnReferencesT,
    mixed : any
) : mixed is d.Tuple<d.JoinableSelectTupleElement<ColumnReferencesT>> {
    if (!(mixed instanceof Array)) {
        return false;
    }
    for (let element of mixed) {
        if (!isJoinableSelectTupleElement(columnReferences, element)) {
            return false;
        }
    }
    return true;
}

export function joinableSelectTupleElementToColumnName (element : d.JoinableSelectTupleElement<any>) : string {
    if (element instanceof ColumnExpr) {
        return element.name;
    } else if (element instanceof Column) {
        return element.name;
    } else {
        throw new Error(`Unknown joinable select tuple element, (${typeof element})${element}`);
    }
}

export function joinableSelectTupleHasDuplicateColumnName (tuple : d.Tuple<d.JoinableSelectTupleElement<any>>) : boolean {
    const names = tuple.map(joinableSelectTupleElementToColumnName);

    //TODO Not use nested for-loop?
    for (let i=0; i<names.length; ++i) {
        for (let j=i+1; j<names.length; ++j) {
            if (names[i] == names[j]) {
                return true;
            }
        }
    }
    return false;
}

export function joinableSelectTupleToRawColumnCollection<
    TupleT extends d.Tuple<d.JoinableSelectTupleElement<any>>
> (tuple : TupleT) : d.JoinableSelectTupleToRawColumnCollection<TupleT> {
    return tuple.reduce<any>((memo, element) => {
        if (element instanceof ColumnExpr) {
            memo[element.name] = element.assertDelegate;
        } else if (element instanceof Column) {
            memo[element.name] = element.assertDelegate;
        } else {
            throw new Error(`Unknown joinable select tuple element, (${typeof element})${element}`);
        }

        return memo;
    }, {} as any);
}
