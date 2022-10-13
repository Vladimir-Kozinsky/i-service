import mongoose from 'mongoose';

const legSchema = new mongoose.Schema({
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
})

//const Leg = mongoose.model('Leg', legSchema)

export default legSchema;