import mongoose from 'mongoose';

const engineSchema = new mongoose.Schema({
    type: { type: String, required: true },
    msn: { type: String, required: true },
    manufDate: { type: String, required: true },
    hsn: { type: String, required: true },
    csn: { type: String, required: true },
    overhaulNum: { type: Number, required: true },
    lastOverhaulDate: { type: String, required: true },
    totalLifeTime: { type: String, required: true },
    totalLifeHours: { type: String, required: true },
    totalLifeCycles: { type: String, required: true },
    tbo: { type: String, required: true },
    hbo: { type: String, required: true },
    cbo: { type: String, required: true },
    tso: { type: String, required: true },
    hso: { type: String, required: true },
    cso: { type: String, required: true }
})

const Engine = mongoose.model('Engine', engineSchema);

export default Engine;


