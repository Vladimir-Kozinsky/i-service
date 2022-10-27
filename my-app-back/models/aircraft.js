import mongoose from 'mongoose';
import Apu from './apu.js';

const aircraftSchema = new mongoose.Schema({
    type: { type: String },
    manufDate: { type: String },
    msn: { type: String },
    regNum: { type: String },
    initFh: { type: String },
    initFc: { type: String },
    fh: { type: String },
    fc: { type: String },
    overhaulNum: { type: Number, required: true },
    lastOverhaulDate: { type: String },
    tsnAtlastOverhaul: { type: String },
    csnAtlastOverhaul: { type: String },
    tlp: { type: String, required: true },
    tlt: { type: String, required: true },
    tlc: { type: String, required: true },
    pbo: { type: String, required: true },
    tbo: { type: String, required: true },
    cbo: { type: String, required: true },
    engines: [
        {
            pos: { type: Number },
            msn: { type: String }
        }
    ],
    apu: {
        type: { type: String, required: true },
        msn: { type: String, required: true },
        manufDate: { type: String, required: true },
        tsn: { type: String, required: true },
        csn: { type: String, required: true },

        onAircraft: { type: String },
        installDate: { type: String },
        aircraftTsn: { type: String },
        aircraftCsn: { type: String },
        apuTsn: { type: String },
        apuCsn: { type: String },

        overhaulNum: { type: Number, required: true },
        lastOverhaulDate: { type: String, required: true },
        tsnAtlastOverhaul: { type: String, required: true },
        csnAtlastOverhaul: { type: String, required: true },
        tlp: { type: String, required: true },
        tlt: { type: String, required: true },
        tlc: { type: String, required: true },
        pbo: { type: String, required: true },
        tbo: { type: String, required: true },
        cbo: { type: String, required: true },
    },
    legs: [
        {
            depDate: { type: String },
            flightNumber: { type: String },
            from: { type: String },
            to: { type: String },
            blockOff: { type: String },
            takeOff: { type: String },
            landing: { type: String },
            blockOn: { type: String },
            flightTime: { type: String },
            blockTime: { type: String },
            fh: { type: String },
            fc: { type: String }
        }
    ]
})

aircraftSchema.methods.editLeg = function (legId, newLeg) {
    let legIndex = this.legs.findIndex((leg) => leg._id.toString() === legId)
    this.legs[legIndex].flightNumber = newLeg.flightNumber;
    this.legs[legIndex].from = newLeg.from;
    this.legs[legIndex].to = newLeg.to;
    this.legs[legIndex].blockOff = newLeg.blockOff;
    this.legs[legIndex].takeOff = newLeg.takeOff;
    this.legs[legIndex].landing = newLeg.landing;
    this.legs[legIndex].blockOn = newLeg.blockOn;
    this.legs[legIndex].flightTime = newLeg.flightTime;
    this.legs[legIndex].blockTime = newLeg.blockTime;
    this.legs[legIndex].fh = newLeg.fh;
    this.legs[legIndex].fc = newLeg.fc;
    return this.legs[legIndex];
}

aircraftSchema.methods.reculcFhFc = function () {
    const toMins = (str) => {
        const hh = +str.split(':')[0] * 60;
        const mm = +str.split(':')[1];
        return hh + mm
    }

    const minsToStr = (mins) => {
        const hh = Math.floor(mins / 60);
        const mm = mins % 60;
        return `${hh}:${mm}`;
    }

    const fh = this.legs.reduce((prevValue, item, index) => {
        prevValue += toMins(item.flightTime);
        item.fh = minsToStr(prevValue);
        item.fc = +this.initFc + (+index + 1);
        return prevValue
    }, toMins(this.initFh))

    this.fh = minsToStr(fh);
    this.fc = +this.initFc + this.legs.length;
}

const Aircraft = mongoose.model('Aircraft', aircraftSchema)

export default Aircraft;


