import * as sd from "schema-decorator";
import * as o from "../../../../dist/src/main";

export const table = o.table(
    "table",
    {
        x : sd.naturalNumber(),
        y : sd.string(),
        z : sd.boolean(),
        w : sd.date(),
    }
).addCandidateKey(c => [
    c.x,
    c.y,
]).addCandidateKey(c => [
    c.y,
    c.z,
]);

export declare const ck : o.Table.CandidateKey<typeof table>;
export const ckad = table.candidateKeyAssertDelegate();
export declare const sk : o.Table.SuperKey<typeof table>;
export const skad = table.superKeyAssertDelegate();