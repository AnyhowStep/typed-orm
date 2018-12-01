import * as tape from "tape";
import * as o from "../../../../dist/src/main";

tape(__filename, (t) => {
    const mapA = {
        ax : {
            tableAlias : "tableA",
            name : "ax"
        },
        ay : {
            tableAlias : "tableA",
            name : "ay"
        },
    };
    const subMapA = {
        ax : {
            tableAlias : "tableA",
            name : "ax"
        },
    };
    const notSubMapA = {
        ax : {
            tableAlias : "tableA",
            name : "qwerty"
        },
    };
    const unrelatedMap = {
        columnName : {
            tableAlias : "tableA",
            name : "qwerty123123"
        },
    };

    t.true(o.ColumnIdentifierMapUtil.isSubset(
        mapA,
        mapA
    ));
    t.true(o.ColumnIdentifierMapUtil.isSubset(
        subMapA,
        mapA
    ));
    t.false(o.ColumnIdentifierMapUtil.isSubset(
        notSubMapA,
        mapA
    ));
    t.false(o.ColumnIdentifierMapUtil.isSubset(
        unrelatedMap,
        mapA
    ));

    t.true(o.ColumnIdentifierMapUtil.isSubset(
        mapA,
        mapA
    ));
    t.false(o.ColumnIdentifierMapUtil.isSubset(
        mapA,
        subMapA
    ));
    t.false(o.ColumnIdentifierMapUtil.isSubset(
        mapA,
        notSubMapA
    ));
    t.false(o.ColumnIdentifierMapUtil.isSubset(
        mapA,
        unrelatedMap
    ));

    t.end();
});