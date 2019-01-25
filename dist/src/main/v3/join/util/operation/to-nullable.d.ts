import { IJoin, Join } from "../../join";
export declare type ToNullable<JoinT extends IJoin> = (JoinT extends IJoin ? Join<{
    aliasedTable: JoinT["aliasedTable"];
    columns: JoinT["columns"];
    nullable: true;
}> : never);
export declare function toNullable<JoinT extends IJoin>(join: JoinT): ToNullable<JoinT>;
