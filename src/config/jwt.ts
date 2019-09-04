export interface IJwtOptions {
    issuer?: string;
    audience?: string;
    secret: string;
}

export const jwtOptions: IJwtOptions = {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    secret: process.env.JWT_SECRET
};