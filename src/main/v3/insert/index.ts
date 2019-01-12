export * from "./insert";

import * as InsertUtil from "./util";
export {InsertUtil};

import {
    insertIgnoreInto,
    insertInto,
    replaceInto,
} from "./util";
export {
    /*
        INSERT IGNORE INTO
            `table` (
                ...,
                ...,
                ...
            )
        VALUES (
            ...,
            ...,
            ...
        )
    */
    insertIgnoreInto,
    /*
        INSERT INTO
            `table` (
                ...,
                ...,
                ...
            )
        VALUES (
            ...,
            ...,
            ...
        )
    */
    insertInto,
    /*
        REPLACE INTO
            `table` (
                ...,
                ...,
                ...
            )
        VALUES (
            ...,
            ...,
            ...
        )
    */
    replaceInto,
};