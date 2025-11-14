import User from "../schema/User.js"
import { signToken } from './../utils/jwt.js';

export const register = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are requied!" })

        const existing = await User.findOne({ email })

        if (existing) return res.status(400).json({ message: "User already exist!" })

        const user = await User.create({ name, email, password })

        const token = signToken({ id: user._id })

        res.status(201).json({
            message: "User registered successfully!",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const login = async (req, res) => {
    try {
        console.log(req.body)

        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "All fields are requied!" })

        const user = await User.findOne({ email }).select('+password')

        if (!user || !(await user.correctPassword(password, user.password)))
            return res.status(401).json({ message: "Invalid credentials" });

        const token = signToken({ id: user._id });

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}