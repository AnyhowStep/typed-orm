import { FetchRow } from "./fetch-row";
import { JoinCollection } from "../join-collection";
import { ColumnReferences } from "../column-references";
import * as sd from "schema-decorator";
export declare namespace FetchRowUtil {
    function assertDelegate<JoinsT extends JoinCollection, SelectReferencesT extends ColumnReferences>(joins: JoinsT, selectReferences: SelectReferencesT): (sd.AssertDelegate<FetchRow<JoinsT, SelectReferencesT>>);
}
