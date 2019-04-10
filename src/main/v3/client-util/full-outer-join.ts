/*
    Not the most efficient but should work.
    Be careful not to use this on large data sets.
*/
export function fullOuterJoin<LeftT, RightT> (
    {
        leftArr,
        rightArr,
        predicate,
    } :
    {
        leftArr : LeftT[],
        rightArr : RightT[],
        predicate : (left : LeftT, right : RightT) => boolean,
    }
) {
    const result : (
        { left : LeftT, right : RightT }|
        { left : undefined, right : RightT }|
        { left : LeftT, right : undefined }
    )[] = [];

    for (const left of leftArr) {
        let hasRight = false;
        for (const right of rightArr) {
            if (predicate(left, right)) {
                hasRight = true;
                result.push({
                    left,
                    right,
                });
            }
        }
        if (!hasRight) {
            result.push({
                left,
                right : undefined,
            });
        }
    }

    for (const right of rightArr) {
        if (leftArr.some(left => predicate(left, right))) {
            continue;
        }
        result.push({
            left : undefined,
            right,
        });
    }

    return result;
}