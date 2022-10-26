import { Router } from "express";
import Apu from "../models/apu.js";

const ApuRouter = new Router();

ApuRouter.post('/apu/add', async (req, res) => {
    try {
        const newApuData = req.body;
        const engine = await Apu.findOne({ msn: newApuData.msn }).exec();
        if (engine) {
            throw new Error("An engine with this msn already exists");
        } else {
            const newApu = await Apu.create(newApuData);
            if (!newApu) throw new Error(`Apu has not been added`);
            if (!newApu) throw new Error(`Apu has not been created`);
            res.statusMessage = "Apu successfully added";
            res.json(newApu);
        }
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message });
    }
})

ApuRouter.get('/apu/available', async (req, res) => {
    try {
        const apus = await Apu.find({ onAircraft: '' }).exec();

        if (!apus.length) {
            res.statusMessage = "Not found available apus";
            res.json(apus);
        } else {
            res.statusMessage = "Apus were found";
            res.json(apus);
        }
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message });
    }
})

ApuRouter.get('/apus', async (req, res) => {
    try {
        const apus = await Apu.find().exec();

        if (!apus.length) {
            throw new Error("Apus were not found");
        } else {
            res.statusMessage = "Apus were found";
            res.json(apus);
        }
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message });
    }
})

ApuRouter.get('/apu', async (req, res) => {
    try {
        const { msn } = req.query
        const apu = await Apu.findOne({ msn: msn }).exec();
        if (!apu) {
            throw new Error("Apu was not found");
        } else {
            res.statusMessage = "Apu was found";
            res.json(apu);
        }
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})



export default ApuRouter;