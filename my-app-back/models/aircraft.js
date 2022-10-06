import mongoose from 'mongoose';

const aircraftSchema = new mongoose.Schema({
    type: { type: String },
    msn: { type: String },
    regNum: { type: String },
    initFh: { type: String },
    initFc: { type: String },
    fh: { type: String },
    fc: { type: String },
    engines: [
        {
            pos: { type: String },
            msn: { type: String }
        }
    ],
    apu: { type: String },
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

const Aircraft = mongoose.model('Aircraft', aircraftSchema)

export default Aircraft;


