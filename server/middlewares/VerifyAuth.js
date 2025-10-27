import jwt from 'jsonwebtoken'
export const VerifyAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.newToken
        // console.log("got token to verify: ", token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret")
        // console.log("decoded: ", decoded)
        req.user = decoded;
        next()
    } catch (e) {
        console.log("error in verify: ", e)
    }
}