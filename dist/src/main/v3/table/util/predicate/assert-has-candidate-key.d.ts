import { ITable } from "../../table";
export declare type AssertHasCandidateKey<TableT extends ITable> = (TableT["candidateKeys"][number] extends never ? ["Table", TableT["alias"], "has no candidate keys"] : unknown);
