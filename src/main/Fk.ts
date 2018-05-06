//import {AnyTable} from "./AnyTable";

/*
function gen (max) {
const result = [];
for (let i=1; i<=max; ++i) {
    const ele = [];
    for (let rep=1; rep <= i;  ++rep) {
        ele.push("keyof FromT[\"fields\"]");
    }
    result.push(`[${ele.join(", ")}]`);
}
return result.join("|\n");
}
gen(20)
*/
/*
export type FromColumns<FromT extends AnyTable> = (
    [keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]|
    [keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"], keyof FromT["fields"]]
);
*/
/*
function gen (max) {
	const result = [];
	for (let i=0; i<max; ++i) {
		const str = [];
		const ele = [];
		for (let rep=0; rep <= i;  ++rep) {
			str.push("string");
			ele.push("keyof ToT[\"fields\"]");
		}
		result.push(`FromColumnsT extends [${str.join(", ")}] ?\n\t[${ele.join(", ")}] :\n\t`);
	}
	return result.join("") + "never";
}
gen(20)
*/
/*
export type ToColumns<ToT extends AnyTable, FromColumnsT extends FromColumns<any>> = (
    FromColumnsT extends [string] ?
	[keyof ToT["fields"]] :
	FromColumnsT extends [string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string, string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string, string, string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	FromColumnsT extends [string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string, string] ?
	[keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"], keyof ToT["fields"]] :
	never
);

export class Fk<
    NameT extends string,
    FromT extends AnyTable,
    ToT extends AnyTable,
    FromColumnsT extends FromColumns<FromT>,
    ToColumnsT extends ToColumns<ToT, FromColumnsT>
> {
    public readonly name : NameT;
    public readonly from : FromT;
    public readonly to   : ToT;
    public readonly fromColumns : FromColumnsT;
    public readonly toColumns : ToColumnsT;
    public constructor (
        name : NameT,
        from : FromT,
        to : ToT,
        fromColumns : FromColumnsT,
        toColumns : ToColumnsT
    ) {
        this.name = name;
        this.from = from;
        this.to = to;
        this.fromColumns = fromColumns;
        this.toColumns = toColumns;
    }
}

export type AnyFk = Fk<any, any, any, any, any>;
*/
