import * as tape from "tape";
import * as o from "../../../../../dist/src/main";

tape(__filename, (t) => {
    const b = o.binary();
    const longString = "x".repeat(256);
    t.throws(() => {
        b("", Buffer.from(longString));
    });
    for (let i=0; i<=255; ++i) {
        t.doesNotThrow(() => {
            b("", Buffer.from("x".repeat(i)));
        });
    }
    t.throws(() => {
        b("", null);
    });
    t.throws(() => {
        b("", undefined);
    });
    t.throws(() => {
        b("", "xxx");
    });

    t.end();
});

tape(__filename, (t) => {
    const b = o.binary(10);
    const longString = "x".repeat(11);
    t.throws(() => {
        b("", Buffer.from(longString));
    });
    for (let i=0; i<=10; ++i) {
        t.doesNotThrow(() => {
            b("", Buffer.from("x".repeat(i)));
        });
    }
    t.throws(() => {
        b("", null);
    });
    t.throws(() => {
        b("", undefined);
    });
    t.throws(() => {
        b("", "xxx");
    });

    t.end();
});

tape(__filename, (t) => {
    const b = o.binary(2,10);
    const longString = "x".repeat(11);
    t.throws(() => {
        b("", Buffer.from(longString));
    });
    for (let i=0; i<2; ++i) {
        t.throws(() => {
            b("", Buffer.from("x".repeat(i)));
        });
    }
    for (let i=2; i<=10; ++i) {
        t.doesNotThrow(() => {
            b("", Buffer.from("x".repeat(i)));
        });
    }
    t.throws(() => {
        b("", null);
    });
    t.throws(() => {
        b("", undefined);
    });
    t.throws(() => {
        b("", "xxx");
    });

    t.end();
});

tape(__filename, (t) => {
    const b = o.binary.nullable();
    const longString = "x".repeat(256);
    t.throws(() => {
        b("", Buffer.from(longString));
    });
    for (let i=0; i<=255; ++i) {
        t.doesNotThrow(() => {
            b("", Buffer.from("x".repeat(i)));
        });
    }
    t.doesNotThrow(() => {
        b("", null);
    });
    t.throws(() => {
        b("", undefined);
    });
    t.throws(() => {
        b("", "xxx");
    });

    t.end();
});

tape(__filename, (t) => {
    const b = o.binary.nullable(10);
    const longString = "x".repeat(11);
    t.throws(() => {
        b("", Buffer.from(longString));
    });
    for (let i=0; i<=10; ++i) {
        t.doesNotThrow(() => {
            b("", Buffer.from("x".repeat(i)));
        });
    }
    t.doesNotThrow(() => {
        b("", null);
    });
    t.throws(() => {
        b("", undefined);
    });
    t.throws(() => {
        b("", "xxx");
    });

    t.end();
});

tape(__filename, (t) => {
    const b = o.binary.nullable(2,10);
    const longString = "x".repeat(11);
    t.throws(() => {
        b("", Buffer.from(longString));
    });
    for (let i=0; i<2; ++i) {
        t.throws(() => {
            b("", Buffer.from("x".repeat(i)));
        });
    }
    for (let i=2; i<=10; ++i) {
        t.doesNotThrow(() => {
            b("", Buffer.from("x".repeat(i)));
        });
    }
    t.doesNotThrow(() => {
        b("", null);
    });
    t.throws(() => {
        b("", undefined);
    });
    t.throws(() => {
        b("", "xxx");
    });

    t.end();
});

tape(__filename, (t) => {
    t.throws(() => {
        o.binary(-1);
    });
    t.throws(() => {
        o.binary(0);
    });
    t.throws(() => {
        o.binary(256);
    });

    t.throws(() => {
        o.binary(1,256);
    });
    t.throws(() => {
        o.binary(0,0);
    });

    t.throws(() => {
        o.binary(-1,10);
    });
    t.doesNotThrow(() => {
        o.binary(0,10);
    });
    t.doesNotThrow(() => {
        o.binary(0,1);
    });
    t.throws(() => {
        o.binary(10,9);
    });

    t.end();
});