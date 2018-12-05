import {Query} from "../query";

export type NewInstance = Query<{
    readonly joins : undefined,
    readonly parentJoins : undefined,
    readonly unions : undefined,
    readonly selects : undefined,
    readonly limit : undefined,
    readonly unionLimit : undefined,
}>;
export function newInstance () : NewInstance {
    return new Query(
        {
            joins : undefined,
            parentJoins : undefined,
            unions : undefined,
            selects : undefined,
            limit : undefined,
            unionLimit : undefined,
        },
        {
            where : undefined,
        }
    );
}