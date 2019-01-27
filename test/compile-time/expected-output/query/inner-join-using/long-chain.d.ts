import * as sd from "schema-decorator";
import * as o from "../../../../../dist/src/main";
export declare const query: o.Query<{
    readonly _distinct: false;
    readonly _sqlCalcFoundRows: false;
    readonly _joins: (o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "table";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "table";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "table";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined1";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined1";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined1";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined2";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined2";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined2";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined3";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined3";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined3";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined4";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined4";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined4";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined5";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined5";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined5";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined6";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined6";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined6";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined7";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined7";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined7";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined8";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined8";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined8";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined9";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined9";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined9";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined10";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined10";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined10";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined11";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined11";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined11";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined12";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined12";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined12";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined13";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined13";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined13";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined14";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined14";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined14";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined15";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined15";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined15";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined16";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined16";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined16";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined17";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined17";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined17";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined18";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined18";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined18";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined19";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined19";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined19";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined20";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined20";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined20";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }> | o.Join<{
        aliasedTable: o.Table<{
            readonly usedColumns: never[];
            readonly alias: "joined21";
            readonly columns: {
                readonly x: o.Column<{
                    tableAlias: "joined21";
                    name: "x";
                    assertDelegate: sd.AssertDelegate<number>;
                }>;
            };
            readonly autoIncrement: undefined;
            readonly id: undefined;
            readonly primaryKey: undefined;
            readonly candidateKeys: [];
            readonly generated: [];
            readonly isNullable: never[];
            readonly hasExplicitDefaultValue: [];
            readonly mutable: "x"[];
            readonly parents: [];
            readonly insertAllowed: true;
            readonly deleteAllowed: true;
        }>;
        columns: {
            readonly x: o.Column<{
                tableAlias: "joined21";
                name: "x";
                assertDelegate: sd.AssertDelegate<number>;
            }>;
        };
        nullable: false;
    }>)[];
    readonly _parentJoins: undefined;
    readonly _selects: undefined;
    readonly _where: undefined;
    readonly _grouped: undefined;
    readonly _having: undefined;
    readonly _orders: undefined;
    readonly _limit: undefined;
    readonly _unions: undefined;
    readonly _unionOrders: undefined;
    readonly _unionLimit: undefined;
    readonly _mapDelegate: undefined;
}>;
export declare const tableAliasUnion: o.JoinUtil.Array.TableAliases<typeof query._joins>;
export declare const query2: any;
