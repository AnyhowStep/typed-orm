import { Key } from "../../../key";
export declare type HasKey<ArrT extends Key[], KeyT extends Key> = (KeyT extends ArrT[number] ? (Extract<ArrT[number], KeyT> extends never ? false : true) : false);
export declare function hasKey<ArrT extends Key[], KeyT extends Key>(arr: ArrT, key: KeyT): HasKey<ArrT, KeyT>;
