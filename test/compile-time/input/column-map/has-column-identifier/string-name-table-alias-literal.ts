import * as sd from "schema-decorator";
import * as o from "../../../../../src/main";

export const columnMap = {
    ax : o.column("tableA", "ax", sd.naturalNumber()),
    ay : o.column("tableA", "ay", sd.date()),
    bx : o.column("tableB", "bx", sd.buffer()),
    by : o.column("tableB", "by", sd.boolean()),
};

type HasColumnIdentifier<ColumnIdentifierT extends o.ColumnIdentifier> = o.ColumnMapUtil.HasColumnIdentifier<
    typeof columnMap,
    ColumnIdentifierT
>;

export declare const hasColumn : [
    HasColumnIdentifier<{
        tableAlias : "tableA",
        name : "ax",
    }>,
    HasColumnIdentifier<{
        tableAlias : "tableA",
        name : "bx",
    }>,
    HasColumnIdentifier<{
        tableAlias : "tableA",
        name : "doesNotExist",
    }>,
    HasColumnIdentifier<{
        tableAlias : "tableA",
        name : string,
    }>,

    /////////////////////////////////
    HasColumnIdentifier<{
        tableAlias : string,
        name : "ax",
    }>,
    HasColumnIdentifier<{
        tableAlias : string,
        name : "bx",
    }>,
    HasColumnIdentifier<{
        tableAlias : string,
        name : "doesNotExist",
    }>,
    HasColumnIdentifier<{
        tableAlias : string,
        name : string,
    }>,

    /////////////////////////////////
    HasColumnIdentifier<{
        tableAlias : "doesNotExist",
        name : "ax",
    }>,
    HasColumnIdentifier<{
        tableAlias : "doesNotExist",
        name : "bx",
    }>,
    HasColumnIdentifier<{
        tableAlias : "doesNotExist",
        name : "doesNotExist",
    }>,
    HasColumnIdentifier<{
        tableAlias : "doesNotExist",
        name : string,
    }>
];
export const hasColumnCheck : [
    true, false, false, boolean,
    boolean, boolean, false, boolean,
    false, false, false, false
] = hasColumn;
export const hasColumnCheckReverse : typeof hasColumn = hasColumnCheck;
