export declare namespace StringArrayUtil {
    function uniqueString<ArrT extends string[]>(arr: ArrT): (ArrT[number])[];
    function isUnorderedEqual(a: string[], b: string[]): boolean;
    function uniqueStringArray<ArrT extends (string[])[]>(arr: ArrT): (ArrT[number])[];
}
