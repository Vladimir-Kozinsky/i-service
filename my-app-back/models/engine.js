import mongoose from 'mongoose';
import Aircraft from './aircraft.js';

const engineSchema = new mongoose.Schema({
    type: { type: String, required: true },
    msn: { type: String, required: true },
    manufDate: { type: String, required: true },
    tsn: { type: String, required: true },
    csn: { type: String, required: true },

    onAircraft: { type: String },
    position: { type: Number },
    installDate: { type: String },
    aircraftTsn: { type: String },
    aircraftCsn: { type: String },
    engTsn: { type: String },
    engCsn: { type: String },

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
})

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

engineSchema.methods.reculcFhFc = async function () {
    const aircraft = await Aircraft.findOne({ msn: this.onAircraft });
    if (!aircraft.legs.length) return
    const filteredLegs = aircraft.legs.filter(leg => {
        const legDate = new Date(leg.depDate);
        const fromDate = new Date(this.installDate);
        const toDate = new Date();
        return legDate >= fromDate && legDate <= toDate
    })
    const fh = filteredLegs.reduce((prevValue, leg, index) => {
        const mmOnGround = toMins(leg.blockTime) - toMins(leg.flightTime);
        prevValue += toMins(leg.flightTime) + Math.ceil(mmOnGround / 3);
        return prevValue;
    }, toMins(this.engTsn))
    
    this.tsn = minsToStr(fh);
    this.csn = +this.engCsn + filteredLegs.length;
}


const Engine = mongoose.model('Engine', engineSchema);

export default Engine;


