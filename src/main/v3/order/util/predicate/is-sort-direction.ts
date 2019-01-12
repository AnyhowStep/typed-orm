import {SortDirection, ASC, DESC} from "../../order";

export function isSortDirection (raw : any) : raw is SortDirection {
    return (
        raw === ASC ||
        raw === DESC
    );
}