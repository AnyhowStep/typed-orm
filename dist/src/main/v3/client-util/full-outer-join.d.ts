export declare function fullOuterJoin<LeftT, RightT>({ leftArr, rightArr, predicate, }: {
    leftArr: LeftT[];
    rightArr: RightT[];
    predicate: (left: LeftT, right: RightT) => boolean;
}): ({
    left: LeftT;
    right: RightT;
} | {
    left: undefined;
    right: RightT;
} | {
    left: LeftT;
    right: undefined;
})[];
