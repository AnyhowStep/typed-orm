import { Key } from "../../key";
export declare type ExtractSuperKey<A extends Key, B extends Key> = (A extends Key ? (B extends Key ? (B[number] extends A[number] ? A : never) : never) : never);
//# sourceMappingURL=extract-super-key.d.ts.map