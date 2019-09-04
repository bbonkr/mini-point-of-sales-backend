export class HttpStatusError extends Error {
    public code: number;

    constructor(code: number, message?: string){
        super(message || 'An unknown error has occurred.');
        this.code = code;
    }
}