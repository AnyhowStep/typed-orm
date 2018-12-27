import {ITable} from "../../table";

export type AssertHasCandidateKey<TableT extends ITable> = (
    TableT["candidateKeys"][number] extends never ?
    [
        "Table",
        TableT["alias"],
        "has no candidate keys"
    ] :
    unknown
);