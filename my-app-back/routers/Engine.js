import { Router } from "express";
import Aircraft from "../models/aircraft.js";
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

EngineRouter.get('/engines/available', async (req, res) => {
    try {
        const engines = await Engine.find({ onAircraft: '' }).exec();

        if (!engines.length) {
            res.statusMessage = "Not found available angines";
            res.json(engines);
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
        const data = req.body;
        const update = await Engine.updateOne({ _id: data._id }, {
            type: data.type,
            msn: data.msn,
            manufDate: data.manufDate,
            tsn: data.tsn,
            csn: data.csn,
            engTsn: data.engTsn,
            engCsn: data.engCsn,
            overhaulNum: data.overhaulNum,
            lastOverhaulDate: data.lastOverhaulDate,
            tsnAtlastOverhaul: data.tsnAtlastOverhaul,
            csnAtlastOverhaul: data.csnAtlastOverhaul,
            tlp: data.tlp,
            tlt: data.tlt,
            tlc: data.tlc,
            pbo: data.pbo,
            tbo: data.tbo,
            cbo: data.cbo,
        });
        if (!update.modifiedCount) throw new Error("An engine has not been updated");
        const engine = await Engine.findOne({ id: data._id }).exec();
        await engine.reculcFhFc();
        await engine.save();
        const updatedEngine = await Engine.findOne({ id: data._id }).exec();
        res.statusMessage = "Engine successfully updated";
        res.json(updatedEngine);
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

EngineRouter.post('/engine/install', async (req, res) => {
    try {
        const {
            ACmsn,
            Emsn,
            position,
            installDate,
            aircraftTsn,
            aircraftCsn,
            engTsn,
            engCsn
        } = req.body;
        const aircraft = await Aircraft.findOne({ msn: ACmsn });
        const eng = aircraft.engines.find((eng) => eng.pos === position);
        if (eng) throw new Error(`An engine has alrady installed on position ${position}`);
        const update = await Engine.updateOne({ msn: Emsn }, {
            $set: {
                onAircraft: ACmsn,
                position: position,
                installDate: installDate,
                aircraftTsn: aircraftTsn,
                aircraftCsn: aircraftCsn,
                engTsn: engTsn,
                engCsn: engCsn
            }
        });
        if (!update.modifiedCount) throw new Error("An engine has not been installed");
        const updateAircraft = await Aircraft.updateOne({ msn: ACmsn }, { $push: { engines: { pos: position, msn: Emsn } } })
        if (!updateAircraft.modifiedCount) throw new Error("An aircraft has not been updated with new engine");
        const updatedAircraft = await Aircraft.findOne({ msn: ACmsn });
        if (updatedAircraft) {
            console.log(updatedAircraft)
            const addedEngine = updatedAircraft.engines.find((eng) => eng.msn === Emsn && eng.pos === position);
            console.log(addedEngine)
            if (!addedEngine) throw new Error("An Engine has not been updated with new position");
            res.statusMessage = "Engine successfully installed";
            res.json(addedEngine);
        }
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

EngineRouter.post('/engine/remove', async (req, res) => {
    try {
        const { msn, position, engineMSN } = req.body;
        const updateAircraft = await Aircraft.updateOne({ msn: msn }, {
            $pull: {
                engines: { msn: engineMSN }
            }
        });
        if (!updateAircraft.modifiedCount) throw new Error("An engine has not been removed");
        const updateEngine = await Engine.updateOne({ msn: engineMSN }, {
            $set: {
                onAircraft: '',
                position: 0,
                installDate: '',
                aircraftTsn: '',
                aircraftCsn: '',
                engTsn: '',
                engCsn: ''
            }
        });
        if (!updateEngine.modifiedCount) throw new Error("An engine data has not been updated");
        const engine = await Engine.findOne({ msn: engineMSN });
        if (!engine) throw new Error("Updated engine has not been found");
        res.statusMessage = "Engine successfully removed";
        res.json(engine);
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

EngineRouter.post('/engine/delete', async (req, res) => {
    try {
        const data = req.body;
        if (!data._id) throw new Error("An deleted aircraft has not been recieved");
        const del = await Engine.findByIdAndRemove(data._id);
        res.statusMessage = "Engine successfully deleted";
        res.json(del);
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

export default EngineRouter;