/// <reference types="node" />
import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const query: o.Query<{
    readonly joins: (o.Join<{
        aliasedTable: o.Table<{
            readonly alias: "table";
            readonly name: "table";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "table";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number> & {
                        __accepts: number;
                        __canAccept: number;
                    };
                }>;
                readonly y: o.Column<{
                    tableAlias: "table";
                    name: "y";
                    assertDelegate: sd.AssertDelegate<string> & {
                        __accepts: string;
                        __canAccept: string;
                    };
                }>;
                readonly z: o.Column<{
                    tableAlias: "table";
                    name: "z";
                    assertDelegate: sd.AssertDelegate<boolean> & {
                        __accepts: boolean;
                        __canAccept: boolean;
                    };
                }>;
            };
            readonly autoIncrement: undefined;
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: ("x" | "y" | "z")[];
            readonly id: undefined;
            readonly candidateKeys: [];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
            readonly z: o.Column<{
                tableAlias: "table";
                name: "z";
                assertDelegate: sd.AssertDelegate<boolean> & {
                    __accepts: boolean;
                    __canAccept: boolean;
                };
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly alias: "joined1";
            readonly name: "joined1";
            readonly columns: {
                readonly a: o.Column<{
                    tableAlias: "joined1";
                    name: "a";
                    assertDelegate: sd.AssertDelegate<Date> & {
                        __accepts: Date;
                        __canAccept: string | number | Date;
                    };
                }>;
                readonly b: o.Column<{
                    tableAlias: "joined1";
                    name: "b";
                    assertDelegate: sd.AssertDelegate<Buffer> & {
                        __accepts: Buffer;
                        __canAccept: Buffer;
                    };
                }>;
                readonly c: o.Column<{
                    tableAlias: "joined1";
                    name: "c";
                    assertDelegate: sd.AssertDelegate<string> & {
                        __accepts: string;
                        __canAccept: string;
                    };
                }>;
            };
            readonly autoIncrement: undefined;
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: ("a" | "b" | "c")[];
            readonly id: undefined;
            readonly candidateKeys: [];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly a: o.Column<{
                tableAlias: "joined1";
                name: "a";
                assertDelegate: sd.AssertDelegate<Date> & {
                    __accepts: Date;
                    __canAccept: string | number | Date;
                };
            }>;
            readonly b: o.Column<{
                tableAlias: "joined1";
                name: "b";
                assertDelegate: sd.AssertDelegate<Buffer> & {
                    __accepts: Buffer;
                    __canAccept: Buffer;
                };
            }>;
            readonly c: o.Column<{
                tableAlias: "joined1";
                name: "c";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
        };
        nullable: true;
    }>)[];
    readonly parentJoins: undefined;
    readonly unions: undefined;
    readonly selects: undefined;
    readonly limit: undefined;
    readonly unionLimit: undefined;
}>;
export declare const query2: o.Query<{
    readonly joins: (o.Join<{
        aliasedTable: o.Table<{
            readonly alias: "table";
            readonly name: "table";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "table";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number> & {
                        __accepts: number;
                        __canAccept: number;
                    };
                }>;
                readonly y: o.Column<{
                    tableAlias: "table";
                    name: "y";
                    assertDelegate: sd.AssertDelegate<string> & {
                        __accepts: string;
                        __canAccept: string;
                    };
                }>;
                readonly z: o.Column<{
                    tableAlias: "table";
                    name: "z";
                    assertDelegate: sd.AssertDelegate<boolean> & {
                        __accepts: boolean;
                        __canAccept: boolean;
                    };
                }>;
            };
            readonly autoIncrement: undefined;
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: ("x" | "y" | "z")[];
            readonly id: undefined;
            readonly candidateKeys: [];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<number> & {
                    __accepts: number;
                    __canAccept: number;
                };
            }>;
            readonly y: o.Column<{
                tableAlias: "table";
                name: "y";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
            readonly z: o.Column<{
                tableAlias: "table";
                name: "z";
                assertDelegate: sd.AssertDelegate<boolean> & {
                    __accepts: boolean;
                    __canAccept: boolean;
                };
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly alias: "joined1";
            readonly name: "joined1";
            readonly columns: {
                readonly a: o.Column<{
                    tableAlias: "joined1";
                    name: "a";
                    assertDelegate: sd.AssertDelegate<Date> & {
                        __accepts: Date;
                        __canAccept: string | number | Date;
                    };
                }>;
                readonly b: o.Column<{
                    tableAlias: "joined1";
                    name: "b";
                    assertDelegate: sd.AssertDelegate<Buffer> & {
                        __accepts: Buffer;
                        __canAccept: Buffer;
                    };
                }>;
                readonly c: o.Column<{
                    tableAlias: "joined1";
                    name: "c";
                    assertDelegate: sd.AssertDelegate<string> & {
                        __accepts: string;
                        __canAccept: string;
                    };
                }>;
            };
            readonly autoIncrement: undefined;
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: ("a" | "b" | "c")[];
            readonly id: undefined;
            readonly candidateKeys: [];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly a: o.Column<{
                tableAlias: "joined1";
                name: "a";
                assertDelegate: sd.AssertDelegate<Date> & {
                    __accepts: Date;
                    __canAccept: string | number | Date;
                };
            }>;
            readonly b: o.Column<{
                tableAlias: "joined1";
                name: "b";
                assertDelegate: sd.AssertDelegate<Buffer> & {
                    __accepts: Buffer;
                    __canAccept: Buffer;
                };
            }>;
            readonly c: o.Column<{
                tableAlias: "joined1";
                name: "c";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly alias: "joined2";
            readonly name: "joined2";
            readonly columns: {
                readonly j: o.Column<{
                    tableAlias: "joined2";
                    name: "j";
                    assertDelegate: sd.AssertDelegate<Date> & {
                        __accepts: Date;
                        __canAccept: string | number | Date;
                    };
                }>;
                readonly k: o.Column<{
                    tableAlias: "joined2";
                    name: "k";
                    assertDelegate: sd.AssertDelegate<Buffer> & {
                        __accepts: Buffer;
                        __canAccept: Buffer;
                    };
                }>;
                readonly l: o.Column<{
                    tableAlias: "joined2";
                    name: "l";
                    assertDelegate: sd.AssertDelegate<string> & {
                        __accepts: string;
                        __canAccept: string;
                    };
                }>;
            };
            readonly autoIncrement: undefined;
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: ("j" | "k" | "l")[];
            readonly id: undefined;
            readonly candidateKeys: [];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly j: o.Column<{
                tableAlias: "joined2";
                name: "j";
                assertDelegate: sd.AssertDelegate<Date> & {
                    __accepts: Date;
                    __canAccept: string | number | Date;
                };
            }>;
            readonly k: o.Column<{
                tableAlias: "joined2";
                name: "k";
                assertDelegate: sd.AssertDelegate<Buffer> & {
                    __accepts: Buffer;
                    __canAccept: Buffer;
                };
            }>;
            readonly l: o.Column<{
                tableAlias: "joined2";
                name: "l";
                assertDelegate: sd.AssertDelegate<string> & {
                    __accepts: string;
                    __canAccept: string;
                };
            }>;
        };
        nullable: true;
    }>)[];
    readonly parentJoins: undefined;
    readonly unions: undefined;
    readonly selects: undefined;
    readonly limit: undefined;
    readonly unionLimit: undefined;
}>;
