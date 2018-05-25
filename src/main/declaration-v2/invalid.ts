/*
function e (max) {
	let str = [];
	for (let i=0; i<max; ++i) {
		str.push(`T${i}`);
	}
	return str.join(", ");
}
str = [];
for (let i=1; i<=10; ++i) {
	str.push(`export type E${i}<${e(i)}> = [${e(i)}]|void|Error|never;`);
}
str.join("\n")
*/
export type E1<T0> = [T0]|void|Error|never;
export type E2<T0, T1> = [T0, T1]|void|Error|never;
export type E3<T0, T1, T2> = [T0, T1, T2]|void|Error|never;
export type E4<T0, T1, T2, T3> = [T0, T1, T2, T3]|void|Error|never;
export type E5<T0, T1, T2, T3, T4> = [T0, T1, T2, T3, T4]|void|Error|never;
export type E6<T0, T1, T2, T3, T4, T5> = [T0, T1, T2, T3, T4, T5]|void|Error|never;
export type E7<T0, T1, T2, T3, T4, T5, T6> = [T0, T1, T2, T3, T4, T5, T6]|void|Error|never;
export type E8<T0, T1, T2, T3, T4, T5, T6, T7> = [T0, T1, T2, T3, T4, T5, T6, T7]|void|Error|never;
export type E9<T0, T1, T2, T3, T4, T5, T6, T7, T8> = [T0, T1, T2, T3, T4, T5, T6, T7, T8]|void|Error|never;
export type E10<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9> = [T0, T1, T2, T3, T4, T5, T6, T7, T8, T9]|void|Error|never;

/*
== Usage ==

import * as invalid from "invalid";

function foo<T> () : (
    T extends number ?
        T :
        invalid.E4<"Expected T to be a ", number, "; received", T>
)
*/
