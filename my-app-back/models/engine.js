import mongoose from 'mongoose';

const engineSchema = new mongoose.Schema({
    type: { type: String, required: true },
    msn: { type: String, required: true },
    manufDate: { type: String, required: true },
    tsn: { type: String, required: true },
    csn: { type: String, required: true },

    onAircraft: { type: String, required: true },
    installDate: { type: String, required: true },
    aircraftTsn: { type: String, required: true },
    aircraftCsn: { type: String, required: true },
    engTsn: { type: String, required: true },
    engCsn: { type: String, required: true },

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

const Engine = mongoose.model('Engine', engineSchema);

export default Engine;


