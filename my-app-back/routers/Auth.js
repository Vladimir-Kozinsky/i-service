import { Router } from "express";
import fs from "fs";


const router = new Router();

router.post('/auth', async (req, res) => {
    try {
        const { email, password } = req.body;
        res.json({
            users: [
                { name: 'Mark' }
            ]
        })
    } catch (error) {
        res.json({ error: error })
    }
})
export default router;