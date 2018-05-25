"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=math.js.map