export class RowNotFoundError extends Error {
    constructor (message : string) {
        super(message);
        Object.setPrototypeOf(this, RowNotFoundError.prototype);
    }
}

export class TooManyRowsFoundError extends Error {
    constructor (message : string) {
        super(message);
        Object.setPrototypeOf(this, TooManyRowsFoundError.prototype);
    }
}
