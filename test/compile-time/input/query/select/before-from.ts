import * as o from "../../../../../dist/src/main";

export const query = o.select(() => [
    o.utcTimestamp().as("now")
]);