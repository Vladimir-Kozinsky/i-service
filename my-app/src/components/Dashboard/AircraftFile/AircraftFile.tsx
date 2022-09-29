import { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Header from "../../Header/Header";
import s from "./AircraftFile.module.scss";

const fakeAircraft = {
    _id: "632ac45eaaac3b3162a6d242",
    type: "Boeing 737-300",
    regNum: "23233",
    msn: "111111",
    fh: "4444:11",
    fc: "1111",
    engines: [
        { _id: "ac45eaaac3b3162a6d242pos", pos: 1, msn: "34343" },
        { _id: "ac45eaaac3b3162a6d242pos", pos: 2, msn: "34343" },
        { _id: "ac45eaaac3b3162a6d242pos", pos: 3, msn: "34343" },
        { _id: "ac45eaaac3b3162a6d242pos", pos: 4, msn: "34343" }
    ],
    apu: "111",
    legs: []
}

const AircraftFile = ({ msn }: { msn: string }) => {
    useEffect(() => {
        console.log('get aitrcraft');
    }, [])
    return (
        <div className={s.aircraftFile} >
            <Header theme="white" />
            <div className={s.main}>
                <div className={s.aircraftData} >
                    <h2 className={s.main__header}>Aircraft data</h2>
                    <div className={s.aircraftInfo} >
                        <div className={s.aircraftInfo__block} >
                            <span className={s.aircraftInfo__block__title}>Type:</span>
                            <span className={s.aircraftInfo__block__value}>{fakeAircraft.type}</span>
                        </div>
                        <div className={s.aircraftInfo__block}>
                            <span className={s.aircraftInfo__block__title}>MSN:</span>
                            <span className={s.aircraftInfo__block__value}>{fakeAircraft.msn}</span>
                        </div>
                        <div className={s.aircraftInfo__block}>
                            <span className={s.aircraftInfo__block__title}>Reg:</span>
                            <span className={s.aircraftInfo__block__value}>{fakeAircraft.regNum}</span>
                        </div>
                        <div className={s.aircraftInfo__block}>
                            <span className={s.aircraftInfo__block__title}>FH:</span>
                            <span className={s.aircraftInfo__block__value}>{fakeAircraft.fh}</span>
                        </div>
                        <div className={s.aircraftInfo__block}>
                            <span className={s.aircraftInfo__block__title}>FC:</span>
                            <span className={s.aircraftInfo__block__value}>{fakeAircraft.fc}</span>
                        </div>
                    </div>
                </div>
                <div className={s.widget__container} >
                    <div className={s.widget} ></div>
                </div>
            </div>

        </div >
    )
}

export default AircraftFile;