import {ColumnIdentifier} from "../column-identifier";
import {isObjectWithKeys} from "../../type";

export type IsEqual<
    A extends ColumnIdentifier,
    B extends ColumnIdentifier
> = (
    A extends ColumnIdentifier ?
    (
        B extends ColumnIdentifier ?
        (
            string extends A["tableAlias"] ?
            boolean :
            string extends B["tableAlias"] ?
            boolean :
            A["tableAlias"] extends B["tableAlias"] ?
            (
                string extends A["name"] ?
                boolean :
                string extends B["name"] ?
                boolean :
                A["name"] extends B["name"] ?
                true :
                false
            ) :
            false
        ) :
        never
    ) :
    never
);
export function isEqual<
    A extends ColumnIdentifier,
    B extends ColumnIdentifier
> (a : A, b : B) : IsEqual<A, B> {
    return (
        a.tableAlias == b.tableAlias &&
        a.name == b.name
    ) as any;
}
export function assertIsEqual (a : ColumnIdentifier, b : ColumnIdentifier) {
    if (a.tableAlias != b.tableAlias) {
        throw new Error(`Table alias mismatch ${a.tableAlias} != ${b.tableAlias}`);
    }
    if (a.name != b.name) {
        throw new Error(`Name mismatch ${a.name} != ${b.name}`);
    }
}
export function isColumnIdentifier (raw : any) : raw is ColumnIdentifier {
    if (!isObjectWithKeys<ColumnIdentifier>(raw, [
        "tableAlias",
        "name"
    ])) {
        return false;
    }
    return (
        (typeof raw.tableAlias == "string") &&
        (typeof raw.name == "string")
    );
}