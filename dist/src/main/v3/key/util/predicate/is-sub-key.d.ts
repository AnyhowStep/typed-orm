import { Key } from "../../key";
export declare type IsSubKey<A extends Key, B extends Key> = (A extends Key ? (B extends Key ? (A[number] extends B[number] ? true : false) : never) : never);
export declare function isSubKey<A extends Key, B extends Key>(a: A, b: B): IsSubKey<A, B>;
