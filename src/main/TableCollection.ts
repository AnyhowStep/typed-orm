/*import * as a from "./AnyTable";

export type TableCollection<TablesT extends a.AnyTableArray> = (
    TablesT extends a.AnyTableArray1 ?
	{ [name in TablesT[0]["name"]] : TablesT[0] } :
	TablesT extends a.AnyTableArray2 ?
	{ [name in TablesT[0]["name"]] : TablesT[0] }&{ [name in TablesT[1]["name"]] : TablesT[1] } :
	TablesT extends a.AnyTableArray3 ?
	{ [name in TablesT[0]["name"]] : TablesT[0] }&{ [name in TablesT[1]["name"]] : TablesT[1] }&{ [name in TablesT[2]["name"]] : TablesT[2] } :
    never
);
*/
