import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const column = o.column("tableA", "name", sd.or(
    sd.naturalNumber(),
    sd.string()
));
export const subTypeColumn = o.column("tableA", "name", sd.naturalNumber());
export const superTypeColumn = o.column("tableA", "name", sd.or(
    sd.naturalNumber(),
    sd.string(),
    sd.date()
));
export const unrelatedColumn = o.column("tableB", "name", sd.or(
    sd.naturalNumber(),
    sd.string()
));
export const unrelatedColumn2 = o.column("tableA", "nameB", sd.or(
    sd.naturalNumber(),
    sd.string()
));
export declare const untypedColumn : o.IColumn;

export declare const assignableTo : [
    o.Column.IsAssignableTo<typeof column, typeof column>,
    o.Column.IsAssignableTo<typeof column, typeof subTypeColumn>,
    o.Column.IsAssignableTo<typeof column, typeof superTypeColumn>,
    o.Column.IsAssignableTo<typeof column, typeof unrelatedColumn>,
    o.Column.IsAssignableTo<typeof column, typeof unrelatedColumn2>,
    o.Column.IsAssignableTo<typeof column, typeof untypedColumn>
];
export const assignableToCheck : [
    true,
    false,
    true,
    false,
    false,
    boolean
] = assignableTo;
export const assignableToCheck2 : typeof assignableTo = assignableToCheck;

export declare const subTypeAssignableTo : [
    o.Column.IsAssignableTo<typeof subTypeColumn, typeof column>,
    o.Column.IsAssignableTo<typeof subTypeColumn, typeof subTypeColumn>,
    o.Column.IsAssignableTo<typeof subTypeColumn, typeof superTypeColumn>,
    o.Column.IsAssignableTo<typeof subTypeColumn, typeof unrelatedColumn>,
    o.Column.IsAssignableTo<typeof subTypeColumn, typeof unrelatedColumn2>,
    o.Column.IsAssignableTo<typeof subTypeColumn, typeof untypedColumn>
];
export const subTypeAssignableToCheck : [
    true,
    true,
    true,
    false,
    false,
    boolean
] = subTypeAssignableTo;
export const subTypeAssignableToCheck2 : typeof subTypeAssignableTo = subTypeAssignableToCheck;

export declare const superTypeAssignableTo : [
    o.Column.IsAssignableTo<typeof superTypeColumn, typeof column>,
    o.Column.IsAssignableTo<typeof superTypeColumn, typeof subTypeColumn>,
    o.Column.IsAssignableTo<typeof superTypeColumn, typeof superTypeColumn>,
    o.Column.IsAssignableTo<typeof superTypeColumn, typeof unrelatedColumn>,
    o.Column.IsAssignableTo<typeof superTypeColumn, typeof unrelatedColumn2>,
    o.Column.IsAssignableTo<typeof superTypeColumn, typeof untypedColumn>
];
export const superTypeAssignableToCheck : [
    false,
    false,
    true,
    false,
    false,
    boolean
] = superTypeAssignableTo;
export const superTypeAssignableToCheck2 : typeof superTypeAssignableTo = superTypeAssignableToCheck;