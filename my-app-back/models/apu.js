import mongoose from 'mongoose';

const apuSchema = new mongoose.Schema({
    type: { type: String, required: true },
    msn: { type: String, required: true },
    manufDate: { type: String, required: true },
    tsn: { type: String, required: true },
    csn: { type: String, required: true },

    onAircraft: { type: String },
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


const Apu = mongoose.model('Apu', apuSchema);

export default Apu;


