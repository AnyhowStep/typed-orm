export type IndicesBefore<
    IndexT extends string
> = (
    IndexT extends "0" ? never :
    IndexT extends "1" ? "0" :
    IndexT extends "2" ? "0"|"1" :
    IndexT extends "3" ? "0"|"1"|"2" :
    IndexT extends "4" ? "0"|"1"|"2"|"3" :
    IndexT extends "5" ? "0"|"1"|"2"|"3"|"4" :
    IndexT extends "6" ? "0"|"1"|"2"|"3"|"4"|"5" :
    IndexT extends "7" ? "0"|"1"|"2"|"3"|"4"|"5"|"6" :
    IndexT extends "8" ? "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7" :
    IndexT extends "9" ? "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8" :
    IndexT extends "10" ? "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9" :
    IndexT extends "11" ? "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10" :
    IndexT extends "12" ? "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11" :
    IndexT extends "13" ? "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12" :
    IndexT extends "14" ? "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13" :
    IndexT extends "15" ? "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14" :
    IndexT extends "16" ? "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15" :
    IndexT extends "17" ? "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16" :
    IndexT extends "18" ? "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17" :
    IndexT extends "19" ? "0"|"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"|"10"|"11"|"12"|"13"|"14"|"15"|"16"|"17"|"18" :
    //Too many
    string
);