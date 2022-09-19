import mongoose from 'mongoose';

const aircraftSchema = new mongoose.Schema({
    type: { type: String },
    msn: { type: String },
    fh: { type: String },
    fc: { type: String },
    engines: [
        {
            pos: { type: String },
            msn: { type: String }
        }
    ],
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

const Aircraft = mongoose.model('Aircraft', aircraftSchema)

export default Aircraft;


