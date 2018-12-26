"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RowNotFoundError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, RowNotFoundError.prototype);
    }
}
exports.RowNotFoundError = RowNotFoundError;
class TooManyRowsFoundError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, TooManyRowsFoundError.prototype);
    }
}
exports.TooManyRowsFoundError = TooManyRowsFoundError;
class NoColumnsSelectedError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, RowNotFoundError.prototype);
    }
}
exports.NoColumnsSelectedError = NoColumnsSelectedError;
class TooManyColumnsSelectedError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, RowNotFoundError.prototype);
    }
}
exports.TooManyColumnsSelectedError = TooManyColumnsSelectedError;
//# sourceMappingURL=error.js.map