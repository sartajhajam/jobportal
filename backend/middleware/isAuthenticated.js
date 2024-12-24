import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res
                .status(401)
                .json({ message: "No Token provided", success: false });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
           return (
            res.status(401).json({ message: "Invalid Token" }),(success = false)
           );
        }
        req.id = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Inavlid Token" });
    }
};

export default authenticateToken;