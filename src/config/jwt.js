module.exports = {
    // TODO 게시할 때, 변경
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    secret: process.env.JWT_SECRET
};