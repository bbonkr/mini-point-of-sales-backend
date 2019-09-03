export const jwtOptions = {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    secret: process.env.JWT_SECRET
};

// module.exports = {
//     issuer: process.env.JWT_ISSUER,
//     audience: process.env.JWT_AUDIENCE,
//     secret: process.env.JWT_SECRET
// };