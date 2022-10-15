import { Router } from "express";
import Engine from "../models/engine.js";

const EngineRouter = new Router();

EngineRouter.post('/engine/add', async (req, res) => {
    try {
        const newEngineData = req.body;
        const engine = await Engine.findOne({ msn: newEngineData.msn }).exec();
        if (engine) {
            throw new Error("An engine with this msn already exists");
        } else {
            const newEngine = await Engine.create(newEngineData);
            if (!newEngine) throw new Error(`Engine has not been added`);
            if (!newEngine) throw new Error(`Engine has not been created`);
            res.statusMessage = "Engine successfully added";
            res.json(newEngine);
        }
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message });
    }
})

export default EngineRouter;