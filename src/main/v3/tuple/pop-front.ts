/*
    function generate (count, callback, separator) {
        if (separator == undefined) {
            separator = ", ";
        }
        const parts = [];
        for (let i=0; i<count; ++i) {
            parts.push(callback(i));
        }
        return parts.join(separator);
    }
    function generateCase (count) {
        return [
			count == 0 ?
            `TupleT extends [unknown] ?` :
            `TupleT extends [unknown, ${generate(count, i => `infer T${i}`)}] ?`,
            count == 0 ?
            `[] :` :
            `[${generate(count, i => `T${i}`)}] :`
        ].join("\n    ");
    }
    function generateCases (count) {
        return generate(count, i => generateCase(i), "\n    ")
    }
    generateCases(3)
*/
export type PopFront<A extends any[]> = (
    ((...arr: A) => void) extends ((first: any, ...arr: infer B) => void)?
    B :
    never
);
export function popFront<TupleT extends any[]> (
    tuple : TupleT
) : (
    [TupleT[0], PopFront<TupleT>]
) {
    return [
        tuple[0],
        tuple.slice(1) as any
    ];
}