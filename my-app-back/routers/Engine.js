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

EngineRouter.get('/engines', async (req, res) => {
    try {
        const engines = await Engine.find().exec();

        if (!engines.length) {
            throw new Error("Engines were not found");
        } else {
            res.statusMessage = "Engines were found";
            res.json(engines);
        }
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message });
    }
})

EngineRouter.get('/engine', async (req, res) => {
    try {
        const { msn } = req.query
        const engine = await Engine.findOne({ msn: msn }).exec();
        if (!engine) {
            throw new Error("Engine was not found");
        } else {
            res.statusMessage = "Engines was found";
            res.json(engine);
        }
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

EngineRouter.post('/engine/update', async (req, res) => {
    try {
        const updatedEngine = req.body;
        const update = await Engine.updateOne({ _id: id }, updatedEngine);
        if (!update.modifiedCount) throw new Error("An engine has not been updated");
        const engine = await Engine.findOne({ id: id }).exec();
        res.statusMessage = "Engine successfully updated";
        res.json(engine);
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})



export default EngineRouter;