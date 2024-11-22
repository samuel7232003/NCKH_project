require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const white_lists = ["/", "/login", "/signup"];

    if(white_lists.find(item => "/api/v1" + item === req.originalUrl)){
        next();
    } else {
        if(req?.headers?.authorization?.split(" ")?.[1]){
            const token = req.headers.authorization.split(" ")[1];
            
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET,)
                req.user = {
                    email:decoded.email,
                    name:decoded.name
                }

                next();
            } catch (error) {
                return res.status(401).json({
                    message: "Token hoặc hết hạn/không hợp lệ! "
                })
            }
        } else {
            return res.status(401).json({
                message: "Bạn chưa truyền Access Token/hoặc hết hạn!"
            })
        }
    }
}

module.exports = auth;