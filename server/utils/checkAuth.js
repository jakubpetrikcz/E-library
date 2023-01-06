const jwt = require("jsonwebtoken");
const {createError} = require("./createError");

const checkAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return next(createError({ status: 401, message: "Unauthorized" }));
    }
    return jwt.verify(token, "secret123", (err, decoded) => {
        if (err) {
            return next(
                createError({
                    status: 401,
                    message: "Unauthorized, invalid token",
                })
            );
        }
        req.user = decoded;
        console.log(req.user);
        return next();
    });
};

module.exports = {checkAuth};
