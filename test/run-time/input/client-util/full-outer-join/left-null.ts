import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const leftArr = [
        {
            leftId : "A",
            appId : 1,
            platformId : 1000,
        },
        {
            leftId : "B",
            appId : 1,
            platformId : 1001,
        },
        {
            leftId : "C",
            appId : 2,
            platformId : 1000,
        },
        {
            leftId : "D",
            appId : 2,
            platformId : 1001,
        },
    ];
    const rightArr = [
        {
            rightId : "W",
            appId : 1,
            platformId : 1000,
        },
        {
            rightId : "X",
            appId : 1,
            platformId : 1001,
        },
        {
            rightId : "Y",
            appId : 2,
            platformId : 1000,
        },
        {
            rightId : "Z",
            appId : 2,
            platformId : 1001,
        },
        {
            rightId : "E",
            appId : 3,
            platformId : 1000,
        },
        {
            rightId : "F",
            appId : 3,
            platformId : 1002,
        },
        {
            rightId : "G",
            appId : 4,
            platformId : 1000,
        },
        {
            rightId : "H",
            appId : 4,
            platformId : 1002,
        },
    ];
    const result = o.ClientUtil.fullOuterJoin({
        leftArr,
        rightArr,
        predicate : (left, right) => (
            left.appId == right.appId &&
            left.platformId == right.platformId
        ),
    });
    t.deepEqual(
        result,
        [
            {
                left : leftArr[0],
                right : rightArr[0],
            },
            {
                left : leftArr[1],
                right : rightArr[1],
            },
            {
                left : leftArr[2],
                right : rightArr[2],
            },
            {
                left : leftArr[3],
                right : rightArr[3],
            },
            {
                left : undefined,
                right : rightArr[4],
            },
            {
                left : undefined,
                right : rightArr[5],
            },
            {
                left : undefined,
                right : rightArr[6],
            },
            {
                left : undefined,
                right : rightArr[7],
            },
        ]
    );
    t.end();
});
