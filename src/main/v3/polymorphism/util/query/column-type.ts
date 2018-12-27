import {ITable} from "../../../table";

export type ParentAliases<TableT extends ITable> = (
    TableT["parents"][number]["alias"]
);
export type ParentAliasesExcept<TableT extends ITable, ExceptT extends string> = (
    Exclude<
        ParentAliases<TableT>,
        ExceptT
    >
);
export type FindParent<TableT extends ITable, AliasT extends string> = (
    Extract<
        TableT["parents"][number],
        { alias : AliasT }
    >
);

export type TableAliases<TableT extends ITable> = (
    (
        TableT |
        TableT["parents"][number]
    )["alias"]
);
export type TableAliasesExcept<TableT extends ITable, ExceptT extends string> = (
    Exclude<
        TableAliases<TableT>,
        ExceptT
    >
);
export type FindTable<TableT extends ITable, AliasT extends string> = (
    Extract<
        (
            TableT |
            TableT["parents"][number]
        ),
        { alias : AliasT }
    >
);
export type ColumnType<TableT extends ITable, NameT extends string> = (
    {
        [tableAlias in TableAliases<TableT>] : (
            NameT extends keyof FindTable<TableT, tableAlias>["columns"] ?
            (
                {
                    [otherTableAlias in TableAliasesExcept<TableT, tableAlias>] : (
                        NameT extends keyof FindTable<TableT, otherTableAlias>["columns"] ?
                        (
                            (
                                ReturnType<FindTable<TableT, tableAlias>["columns"][NameT]["assertDelegate"]>
                            ) extends (
                                ReturnType<FindTable<TableT, otherTableAlias>["columns"][NameT]["assertDelegate"]>
                            ) ?
                            true :
                            false
                        ):
                        true
                    )
                }[TableAliasesExcept<TableT, tableAlias>] extends true ?
                ReturnType<FindTable<TableT, tableAlias>["columns"][NameT]["assertDelegate"]> :
                never
            ) :
            never
        )
    }[TableAliases<TableT>]
);