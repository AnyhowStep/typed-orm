/*
function gen (max) {
	const base = [];
	const result = [];
	for (let i=0; i<max; ++i) {
		if (i == max-1) {
			base.push(`${i}: number;`);
        } else {
			base.push(`${i}: ${i+1};`);
        }
		if (i>=2) {
			result.push(`${i}: Add<Add<T, ${i-1}>, 1>;`);
        }
	}
	const a = base.join("\n        ");
	const b = result.join("\n    ");
	return `${a}\n    }[T];\n    ${b}`
}

gen(100)
*/

export type Add<T extends number, U extends number> = {
    [index: number]: number;
    0: T;
    1: {
        [index: number]: number;
        0: 1;
        1: 2;
        2: 3;
        3: 4;
        4: 5;
        5: 6;
        6: 7;
        7: 8;
        8: 9;
        9: 10;
        10: 11;
        11: 12;
        12: 13;
        13: 14;
        14: 15;
        15: 16;
        16: 17;
        17: 18;
        18: 19;
        19: 20;
        20: 21;
        21: 22;
        22: 23;
        23: 24;
        24: number;
    }[T];
    2: Add<Add<T, 1>, 1>;
    3: Add<Add<T, 2>, 1>;
    4: Add<Add<T, 3>, 1>;
    5: Add<Add<T, 4>, 1>;
    6: Add<Add<T, 5>, 1>;
    7: Add<Add<T, 6>, 1>;
    8: Add<Add<T, 7>, 1>;
    9: Add<Add<T, 8>, 1>;
    10: Add<Add<T, 9>, 1>;
    11: Add<Add<T, 10>, 1>;
    12: Add<Add<T, 11>, 1>;
    13: Add<Add<T, 12>, 1>;
    14: Add<Add<T, 13>, 1>;
    15: Add<Add<T, 14>, 1>;
    16: Add<Add<T, 15>, 1>;
    17: Add<Add<T, 16>, 1>;
    18: Add<Add<T, 17>, 1>;
    19: Add<Add<T, 18>, 1>;
    20: Add<Add<T, 19>, 1>;
    21: Add<Add<T, 20>, 1>;
    22: Add<Add<T, 21>, 1>;
    23: Add<Add<T, 22>, 1>;
    24: Add<Add<T, 23>, 1>;
}[U];

/*
function gen (max) {
	const base = [];
	const result = [];
	for (let i=1; i<=max; ++i) {
		base.push(`${i}: ${i-1};`);
		if (i>=2) {
			result.push(`${i}: Subtract<Subtract<T, ${i-1}>, 1>;`);
        }
	}
	const a = base.join("\n        ");
	const b = result.join("\n    ");
	return `${a}\n    }[T];\n    ${b}`
}

gen(100)
*/
export type Subtract<T extends number, U extends number> = {
    [index: number]: number;
    0: T;
    1: {
        [index: number]: number;
        0: number;
        1: 0;
        2: 1;
        3: 2;
        4: 3;
        5: 4;
        6: 5;
        7: 6;
        8: 7;
        9: 8;
        10: 9;
        11: 10;
        12: 11;
        13: 12;
        14: 13;
        15: 14;
        16: 15;
        17: 16;
        18: 17;
        19: 18;
        20: 19;
        21: 20;
        22: 21;
        23: 22;
        24: 23;
        25: 24;
    }[T];
    2: Subtract<Subtract<T, 1>, 1>;
    3: Subtract<Subtract<T, 2>, 1>;
    4: Subtract<Subtract<T, 3>, 1>;
    5: Subtract<Subtract<T, 4>, 1>;
    6: Subtract<Subtract<T, 5>, 1>;
    7: Subtract<Subtract<T, 6>, 1>;
    8: Subtract<Subtract<T, 7>, 1>;
    9: Subtract<Subtract<T, 8>, 1>;
    10: Subtract<Subtract<T, 9>, 1>;
    11: Subtract<Subtract<T, 10>, 1>;
    12: Subtract<Subtract<T, 11>, 1>;
    13: Subtract<Subtract<T, 12>, 1>;
    14: Subtract<Subtract<T, 13>, 1>;
    15: Subtract<Subtract<T, 14>, 1>;
    16: Subtract<Subtract<T, 15>, 1>;
    17: Subtract<Subtract<T, 16>, 1>;
    18: Subtract<Subtract<T, 17>, 1>;
    19: Subtract<Subtract<T, 18>, 1>;
    20: Subtract<Subtract<T, 19>, 1>;
    21: Subtract<Subtract<T, 20>, 1>;
    22: Subtract<Subtract<T, 21>, 1>;
    23: Subtract<Subtract<T, 22>, 1>;
    24: Subtract<Subtract<T, 23>, 1>;
    25: Subtract<Subtract<T, 24>, 1>;
}[U];

/*
function gen (max) {
	const base = [];
	for (let i=0; i<max; ++i) {
		base.push(`${i}: "${i}";`);
	}
	return base.join("\n    ");
}

gen(101)
*/
export type NumberToString<N extends number> = ({
    0: "0";
    1: "1";
    2: "2";
    3: "3";
    4: "4";
    5: "5";
    6: "6";
    7: "7";
    8: "8";
    9: "9";
    10: "10";
    11: "11";
    12: "12";
    13: "13";
    14: "14";
    15: "15";
    16: "16";
    17: "17";
    18: "18";
    19: "19";
    20: "20";
    21: "21";
    22: "22";
    23: "23";
    24: "24";
    25: "25";
    26: "26";
    27: "27";
    28: "28";
    29: "29";
    30: "30";
    /*31: "31";
    32: "32";
    33: "33";
    34: "34";
    35: "35";
    36: "36";
    37: "37";
    38: "38";
    39: "39";
    40: "40";
    41: "41";
    42: "42";
    43: "43";
    44: "44";
    45: "45";
    46: "46";
    47: "47";
    48: "48";
    49: "49";
    50: "50";
    51: "51";
    52: "52";
    53: "53";
    54: "54";
    55: "55";
    56: "56";
    57: "57";
    58: "58";
    59: "59";
    60: "60";
    61: "61";
    62: "62";
    63: "63";
    64: "64";
    65: "65";
    66: "66";
    67: "67";
    68: "68";
    69: "69";
    70: "70";
    71: "71";
    72: "72";
    73: "73";
    74: "74";
    75: "75";
    76: "76";
    77: "77";
    78: "78";
    79: "79";
    80: "80";
    81: "81";
    82: "82";
    83: "83";
    84: "84";
    85: "85";
    86: "86";
    87: "87";
    88: "88";
    89: "89";
    90: "90";
    91: "91";
    92: "92";
    93: "93";
    94: "94";
    95: "95";
    96: "96";
    97: "97";
    98: "98";
    99: "99";
    100: "100";*/
} & { [index : number] : never })[N];

/*
function gen (max) {
	const base = [];
	for (let i=0; i<max; ++i) {
		base.push(`"${i}": ${i};`);
	}
	return base.join("\n    ");
}

gen(101)
*/
export type StringToNumber<S extends string> = ({
    "0": 0;
    "1": 1;
    "2": 2;
    "3": 3;
    "4": 4;
    "5": 5;
    "6": 6;
    "7": 7;
    "8": 8;
    "9": 9;
    "10": 10;
    "11": 11;
    "12": 12;
    "13": 13;
    "14": 14;
    "15": 15;
    "16": 16;
    "17": 17;
    "18": 18;
    "19": 19;
    "20": 20;
    "21": 21;
    "22": 22;
    "23": 23;
    "24": 24;
    "25": 25;
    "26": 26;
    "27": 27;
    "28": 28;
    "29": 29;
    "30": 30;
    /*"31": 31;
    "32": 32;
    "33": 33;
    "34": 34;
    "35": 35;
    "36": 36;
    "37": 37;
    "38": 38;
    "39": 39;
    "40": 40;
    "41": 41;
    "42": 42;
    "43": 43;
    "44": 44;
    "45": 45;
    "46": 46;
    "47": 47;
    "48": 48;
    "49": 49;
    "50": 50;
    "51": 51;
    "52": 52;
    "53": 53;
    "54": 54;
    "55": 55;
    "56": 56;
    "57": 57;
    "58": 58;
    "59": 59;
    "60": 60;
    "61": 61;
    "62": 62;
    "63": 63;
    "64": 64;
    "65": 65;
    "66": 66;
    "67": 67;
    "68": 68;
    "69": 69;
    "70": 70;
    "71": 71;
    "72": 72;
    "73": 73;
    "74": 74;
    "75": 75;
    "76": 76;
    "77": 77;
    "78": 78;
    "79": 79;
    "80": 80;
    "81": 81;
    "82": 82;
    "83": 83;
    "84": 84;
    "85": 85;
    "86": 86;
    "87": 87;
    "88": 88;
    "89": 89;
    "90": 90;
    "91": 91;
    "92": 92;
    "93": 93;
    "94": 94;
    "95": 95;
    "96": 96;
    "97": 97;
    "98": 98;
    "99": 99;
    "100": 100;*/
} & { [index : string] : never })[S];
