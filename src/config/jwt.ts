const jwtConfig = {
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    secret: process.env.JWT_SECRET
};

export default jwtConfig;

// module.exports = {
//     issuer: process.env.JWT_ISSUER,
//     audience: process.env.JWT_AUDIENCE,
//     secret: process.env.JWT_SECRET
// };