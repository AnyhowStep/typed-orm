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

    t.doesNotThrow(() => {
        o.ColumnIdentifierMapUtil.assertIsSubset(
            mapA,
            mapA
        );
    });
    t.doesNotThrow(() => {
        o.ColumnIdentifierMapUtil.assertIsSubset(
            subMapA,
            mapA
        )
    });
    t.throws(() => {
        o.ColumnIdentifierMapUtil.assertIsSubset(
            notSubMapA,
            mapA
        )
    });
    t.throws(() => {
        o.ColumnIdentifierMapUtil.assertIsSubset(
            unrelatedMap,
            mapA
        )
    });

    t.doesNotThrow(() => {
        o.ColumnIdentifierMapUtil.assertIsSubset(
            mapA,
            mapA
        )
    });
    t.throws(() => {
        o.ColumnIdentifierMapUtil.assertIsSubset(
            mapA,
            subMapA
        )
    });
    t.throws(() => {
        o.ColumnIdentifierMapUtil.assertIsSubset(
            mapA,
            notSubMapA
        )
    });
    t.throws(() => {
        o.ColumnIdentifierMapUtil.assertIsSubset(
            mapA,
            unrelatedMap
        )
    });

    t.end();
});