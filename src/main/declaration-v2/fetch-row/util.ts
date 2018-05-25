import {FetchRow} from "./fetch-row";
import {JoinCollection} from "../join-collection";
import {ColumnReferences} from "../column-references";
import {ColumnCollectionUtil} from "../column-collection";
import * as sd from "schema-decorator";

export namespace FetchRowUtil {
    export function assertDelegate<
        JoinsT extends JoinCollection,
        SelectReferencesT extends ColumnReferences
    > (
        joins : JoinsT,
        selectReferences : SelectReferencesT
    ) : (
        sd.AssertDelegate<FetchRow<JoinsT, SelectReferencesT>>
    ) {
        const tableAliases = Object.keys(selectReferences);
        if (tableAliases.length == 1) {
            const tableAlias = tableAliases[0];
            if (tableAlias == "__expr") {
                return ColumnCollectionUtil.assertDelegate(
                    selectReferences[tableAlias],
                    Object.keys(selectReferences[tableAlias])
                ) as any;
            } else {
                const join = joins.find((join) => {
                    return join.table.alias == tableAlias;
                });
                if (join == undefined) {
                    throw new Error(`Could not find JOIN with alias ${tableAlias}`);
                }
                return ColumnCollectionUtil.assertDelegate(
                    join.columns,
                    Object.keys(selectReferences[tableAlias])
                ) as any;
            }
        } else {
            return sd.schema(
                ...tableAliases.map((tableAlias) => {
                    if (tableAlias == "__expr") {
                        return sd.field(
                            tableAlias,
                            ColumnCollectionUtil.assertDelegate(
                                selectReferences[tableAlias],
                                Object.keys(selectReferences[tableAlias])
                            )
                        );
                    }

                    const join = joins.find((join) => {
                        return join.table.alias == tableAlias;
                    });
                    if (join == undefined) {
                        throw new Error(`Could not find JOIN with alias ${tableAlias}`);
                    }
                    if (join.nullable) {
                        const allNullAssertDelegate = ColumnCollectionUtil.allNullAssertDelegate(
                            join.columns,
                            Object.keys(selectReferences[tableAlias])
                        );
                        return sd.field(
                            tableAlias,
                            sd.or(
                                ColumnCollectionUtil.assertDelegate(
                                    join.columns,
                                    Object.keys(selectReferences[tableAlias])
                                ),
                                (name : string, mixed : any) => {
                                    allNullAssertDelegate(name, mixed);
                                    return undefined;
                                }
                            )
                        );
                    } else {
                        return sd.field(
                            tableAlias,
                            ColumnCollectionUtil.assertDelegate(
                                join.columns,
                                Object.keys(selectReferences[tableAlias])
                            )
                        );
                    }
                })
            ) as any;
        }
    }
}