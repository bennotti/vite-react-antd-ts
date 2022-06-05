export class MockError extends Error {
    private readonly _statusCode: number;
    constructor(statusCode: number, msg: string) {
        super(msg);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, MockError.prototype);
        this._statusCode = statusCode;
    }

    obterStatusCode(): number {
        return this._statusCode;
    }

    obterMensagem(): string {
        return this.message;
    }
}