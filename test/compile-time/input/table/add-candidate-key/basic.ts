import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";

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
    c.x,
    c.y,
]).addCandidateKey(c => [
    c.y,
    c.z,
    c.z,
]);

export declare const ck : o.CandidateKey<typeof table>;
export const ckad = table.candidateKeyAssertDelegate();
export declare const sk : o.TableUtil.SuperKey<typeof table>;
export const skad = table.superKeyAssertDelegate();

table.addCandidateKey(c => [
    c.x,
    c.y,
    c.y,
]);

table.addCandidateKey(c => [
    c.x,
    c.y,
    c.z,
]);


//OK because not a super key of any existing candidate keys!
export const table2 = table.addCandidateKey(c => [
    c.x,
    c.z,
]);