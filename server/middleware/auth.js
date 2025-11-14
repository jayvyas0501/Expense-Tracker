import { verifyToken } from "../utils/jwt.js";

export const protect = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) return res.status(401).json({ message: "No token" });

        const decoded = verifyToken(token);
        // console.log(decoded)
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
