import { Router } from "express";
import Aircraft from "../models/aircraft.js";

const router = new Router();

router.post('/aircraft/add', async (req, res) => {
    try {
        const newAircraftData = req.body;
        const aircraft = await Aircraft.findOne({ msn: newAircraftData.msn }).exec();
        if (aircraft) {
            throw new Error("An aircraft with this msn already exists.");
        } else {
            const newAircraft = await Aircraft.create(newAircraftData);
            if (!newAircraft) throw new Error(`Aircraft has not been added`);

            if (!newAircraft) throw new Error(`Account has not been created`);
            console.log(newAircraft);
            res.statusMessage = "Aircraft successfully added";
            res.json(newAircraft);
        }
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

router.post('/aircraft/edit', async (req, res) => {
    try {
        const { id, msn, fh, fc, eng1, eng2, eng3, eng4, apu } = req.body;

        const update = await Aircraft.updateOne({ id: id }, {
            msn: msn,
            fh: fh,
            fc: fc,
            eng1: eng1,
            eng2: eng2,
            eng3: eng3,
            eng4: eng4,
            apu: apu
        });

        if (!update.modifiedCount) throw new Error("An aircraft has not been updated");
        const aircraft = await Aircraft.findOne({ id: id }).exec();
        res.statusMessage = "Aircraft successfully updated";
        res.json(aircraft);
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

router.get('/aircrafts', async (req, res) => {
    try {
        const aircrafts = await Aircraft.find().exec();
        if (!aircrafts.length) {
            throw new Error("Aircrafts were not found");
        } else {
            res.statusMessage = "Aircrafs were found";
            res.json(aircrafts);
        }
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

router.get('/aircraft', async (req, res) => {
    try {
        const { msn } = req.query
        const aircraft = await Aircraft.findOne({ msn: msn }).exec();
        if (!aircraft) {
            throw new Error("Aircraft was not found");
        } else {
            res.statusMessage = "Aircrafs was found";
            res.json(aircraft);
        }
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

export default router;