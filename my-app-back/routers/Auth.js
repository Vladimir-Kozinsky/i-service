import { Router } from "express";
import User from "../models/user.js";

const router = new Router();

router.post('/auth', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email }).exec();
        if (user && password === user.password) {
            res.statusMessage = "User successfully authorised.";
            res.json({ user })
        } else {
            throw new Error("Incorrect e-mail or password!");
        }
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName, position } = req.body;
        const user = await User.findOne({ email: email }).exec();
        if (!user) {
            const newUser = await User.create({ email, password, firstName, lastName, position })

            if (!newUser) throw new Error(`Account has not been created`);

            res.statusMessage = "Account successfully created";
            res.json({ message: "Account successfully created" });
        } else {
            throw new Error(`User with ${user.email} already exists`);
        }
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})


export default router;