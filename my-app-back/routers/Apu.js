import { Router } from "express";
import Apu from "../models/apu.js";
import Aircraft from "../models/aircraft.js";

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

ApuRouter.get('/apus/available', async (req, res) => {
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

ApuRouter.post('/apu/install', async (req, res) => {
    try {
        const {
            ACmsn,
            apuMsn,
            installDate,
            aircraftTsn,
            aircraftCsn,
            apuTsn,
            apuCsn
        } = req.body;

        const aircraft = await Aircraft.findOne({ msn: ACmsn });

        if (aircraft.apu && aircraft.apu.msn) throw new Error(`An apu has alrady installed`);
        const update = await Apu.updateOne({ msn: apuMsn }, {
            $set: {
                onAircraft: ACmsn,
                installDate: installDate,
                aircraftTsn: aircraftTsn,
                aircraftCsn: aircraftCsn,
                apuTsn: apuTsn,
                apuCsn: apuCsn
            }
        });
        if (!update.modifiedCount) throw new Error("An apu has not been installed");

        const apu = await Apu.findOne({ msn: apuMsn });


        if (!apu) throw new Error("APU is not founded");

        const updateAircraft = await Aircraft.updateOne({ msn: ACmsn }, { apu: apu })
        if (!updateAircraft.modifiedCount) throw new Error("An aircraft has not been updated with new engine");
        const updatedAircraft = await Aircraft.findOne({ msn: ACmsn });
        if (updatedAircraft) {
            const addedApu = updatedAircraft.apu;
            if (!addedApu) throw new Error("An aircraft has not been updated with new engine");
            res.statusMessage = "Engine successfully installed";
            res.json(addedApu);
        }
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

ApuRouter.post('/apu/remove', async (req, res) => {
    try {
        const { msn, apuMSN } = req.body;
        const updateAircraft = await Aircraft.updateOne({ msn: msn }, {apu: {}});
        if (!updateAircraft.modifiedCount) throw new Error("An engine has not been removed");
        const updateApu = await Apu.updateOne({ msn: apuMSN }, {
            $set: {
                onAircraft: '',
                installDate: '',
                aircraftTsn: '',
                aircraftCsn: '',
                apuTsn: '',
                apuCsn: ''
            }
        });
        if (!updateApu.modifiedCount) throw new Error("An APU data has not been updated");
        const apu = await Apu.findOne({ msn: apuMSN });
        if (!apu) throw new Error("Updated APU has not been found");
        res.statusMessage = "APU successfully removed";
        res.json(apu);
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

export default ApuRouter;