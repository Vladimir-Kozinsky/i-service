import { Router } from "express";
import Aircraft from "../models/aircraft.js";
import Engine from "../models/engine.js";

const culcFH = (legs, initFH) => {
    const toMins = (str) => {
        const hh = +str.split(':')[0] * 60;
        const mm = +str.split(':')[1];
        return hh + mm
    }
    const fh = legs.reduce((prevValue, item) => {
        return prevValue += toMins(item.flightTime)
    }, toMins(initFH))

    const hh = Math.floor(fh / 60);
    const mm = fh % 60;
    return `${hh}:${mm}`;
}

const culcFC = (legs, initFC) => {
    return +initFC + legs.length
}

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
        const data = req.body;
        if (!data) throw new Error("An updated aircraft has not been recieved");
        const update = await Aircraft.updateOne({ _id: data._id }, {
            type: data.type,
            msn: data.msn,
            manufDate: data.manufDate,
            regNum: data.regNum,
            initFh: data.initFh,
            initFc: data.initFc,
            fh: data.fh,
            fc: data.fc,
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
        console.log(update)
        if (!update.modifiedCount) throw new Error("An aircraft has not been updated");
        const aircraft = await Aircraft.findOne({ _id: data._id }).exec();
        if (data.initFh !== aircraft.initFh || data.initFc !== aircraft.initFc) {
            const newFH = culcFH(aircraft.legs, aircraft.initFh)
            const newFC = culcFC(aircraft.legs, aircraft.initFc)
            const updateFHFC = await Aircraft.updateOne({ msn: msn }, { fh: newFH, fc: newFC });
            if (!updateFHFC.modifiedCount) throw new Error("FH or FC has not been updated");
        }
        const aircraftUpdated = await Aircraft.findOne({ id: data._id }).exec();
        res.statusMessage = "Aircraft successfully updated";
        res.json(aircraftUpdated);
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
            for (let i = 0; i < aircrafts.length; i++) {
                const aircraft = aircrafts[i];
                aircraft.legs = [];
            }
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

router.get('/aircraft/legs', async (req, res) => {
    try {
        const { msn, from, to, page } = req.query
        const aircraft = await Aircraft.findOne({ msn: msn }).exec();
        if (!aircraft) throw new Error("Aircraft was not found");
        const legs = aircraft.legs.filter(item => {
            const legDate = new Date(item.depDate);
            const fromDate = new Date(from);
            const toDate = new Date(to);
            return legDate >= fromDate && legDate <= toDate
        })
        legs.sort((legA, legB) => {
            const dateA = new Date(legA.depDate);
            const dateB = new Date(legB.depDate);
            if (dateA < dateB) return 1; // если первое значение больше второго
            if (dateA == dateB) return 0; // если равны
            if (dateA > dateB) return -1;
        })

        const legsOnPage = 15;
        const totalPages = Math.ceil(legs.length / legsOnPage);
        const fromIndex = page * legsOnPage - legsOnPage;
        const toIndex = page * legsOnPage - 1;
        const reducedLegs = legs.filter((leg, index) => index >= fromIndex && index <= toIndex);
        res.statusMessage = reducedLegs.length
            ? "Legs were found"
            : "No results were found for your search, please change your search parameters";
        res.json({
            legs: reducedLegs,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

router.get('/aircraft/legs/print', async (req, res) => {
    try {
        const { msn, from, to } = req.query
        const aircraft = await Aircraft.findOne({ msn: msn }).exec();
        if (!aircraft) throw new Error("Aircraft was not found");
        const legs = aircraft.legs.filter(item => {
            const legDate = new Date(item.depDate);
            const fromDate = new Date(from);
            const toDate = new Date(to);
            return legDate >= fromDate && legDate <= toDate
        })
        legs.sort((legA, legB) => {
            const dateA = new Date(legA.depDate);
            const dateB = new Date(legB.depDate);
            if (dateA < dateB) return 1; // если первое значение больше второго
            if (dateA == dateB) return 0; // если равны
            if (dateA > dateB) return -1;
        })
        res.statusMessage = legs.length
            ? "Legs were found"
            : "No results were found for your search, please change your search parameters";
        res.json(legs);
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

router.post('/aircraft/legs/add', async (req, res) => {
    try {
        const { leg, msn } = req.body;
        const update = await Aircraft.updateOne({ msn: msn }, { $push: { legs: leg } });
        if (!update.modifiedCount) throw new Error("An aircraft has not been updated");
        const aircraftWithLeg = await Aircraft.findOne({ msn: msn }).exec();
        const newFH = culcFH(aircraftWithLeg.legs, aircraftWithLeg.initFh)
        const newFC = culcFC(aircraftWithLeg.legs, aircraftWithLeg.initFc)
        const updateFHFC = await Aircraft.updateOne({ msn: msn }, { fh: newFH, fc: newFC });
        if (!updateFHFC.modifiedCount) throw new Error("FH or FC has not been updated");
        const aircraft = await Aircraft.findOne({ msn: msn }).exec();
        const addedLeg = aircraft.legs[aircraft.legs.length - 1];
        //engines update
        aircraft.engines.forEach(async (eng) => {
            const engine = await Engine.findOne({ msn: eng.msn });
            await engine.reculcFhFc();
            await engine.save();
        })
        res.statusMessage = "Leg successfully added";
        res.json({ addedLeg, fh: aircraft.fh, fc: aircraft.fc });
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

router.post('/aircraft/legs/del', async (req, res) => {
    try {
        const { msn, legId } = req.body;
        const update = await Aircraft.updateOne({ msn: msn }, {
            $pull: {
                legs: { _id: legId }
            }
        });
        if (!update.modifiedCount) throw new Error("An aircraft has not been updated");
        const aircraft = await Aircraft.findOne({ msn: msn }).exec();
        aircraft.engines.forEach(async (eng) => {
            const engine = await Engine.findOne({ msn: eng.msn });
            await engine.reculcFhFc();
            await engine.save();
        })
        res.statusMessage = "Leg successfully deleted";
        res.json({ message: "Leg successfully deleted", legId: legId });
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

router.post('/aircraft/legs/edit', async (req, res) => {
    try {
        const { msn, legId, leg } = req.body;
        const aircraft = await Aircraft.findOne({ msn });
        const updatedLeg = aircraft.editLeg(legId, leg)
        await aircraft.reculcFhFc();
        await aircraft.save();
        aircraft.engines.forEach(async (eng) => {
            const engine = await Engine.findOne({ msn: eng.msn });
            await engine.reculcFhFc();
            await engine.save();
        })
        res.statusMessage = "Leg successfully updated";
        res.json({ updatedLeg, fh: aircraft.fh, fc: aircraft.fc });
    } catch (error) {
        res.statusCode = 403;
        res.statusMessage = error.message;
        res.json({ message: error.message })
    }
})

export default router;