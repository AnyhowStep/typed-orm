import { IJoin } from "../../../join";
import { FromColumnMap } from "./from-column-map";
export declare type FromJoin<JoinT extends IJoin> = (FromColumnMap<JoinT["columns"]>);
