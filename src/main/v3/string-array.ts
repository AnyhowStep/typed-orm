export namespace StringArrayUtil {
    export function uniqueString<ArrT extends string[]> (
        arr : ArrT
    ) : (ArrT[number])[] {
        return [...new Set<ArrT[number]>(arr)];
    }
    export function isUnorderedEqual (a : string[], b : string[]) {
        return (
            a.every(str => b.indexOf(str) >= 0) &&
            b.every(str => a.indexOf(str) >= 0)
        );
    }
    function contains (arr : (string[])[], item : string[]) {
        return arr.some(element => isUnorderedEqual(item, element));
    }
    export function uniqueStringArray<ArrT extends (string[])[]> (
        arr : ArrT
    ) : (ArrT[number])[] {
        const result : (ArrT[number])[] = [];
        for (let item of arr) {
            if (!contains(result, item)) {
                result.push(uniqueString(item));
            }
        }
        return result;
    }
}