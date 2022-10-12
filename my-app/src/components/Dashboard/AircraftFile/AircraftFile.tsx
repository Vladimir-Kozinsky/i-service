import { useEffect } from "react";
import s from "./AircraftFile.module.scss";
import AircraftFileWidget from "./AircraftFileWdget/AircraftFileWidget";
import legsIcon from "./../../../assets/img/png/legs-icon.png";
import { IAircraft } from "../../../store/reducers/aircraftReducer";
import { compose } from "redux";
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur";
import Button from "../../../common/buttons/Button";

type IAircraftFileProps = {
    aircraft: IAircraft
    setArcraftFile: (isAircraftFile: boolean) => void
}

const AircraftFile = ({ aircraft, setArcraftFile }: IAircraftFileProps) => {
    return (
        <div className={s.aircraftFile} >
            <div className={s.main}>
                <div className={s.aircraftData} >

                    <div className={s.aircraftInfo} >
                        <h2 className={s.main__header}>Aircraft</h2>
                        <div className={s.aircraftInfo__section}>
                            <div className={s.aircraftInfo__section__block} >
                                <div className={s.infoItem} >
                                    <span className={s.infoItem__title}>Type:</span>
                                    <span className={s.infoItem__value}>{aircraft.type}</span>
                                </div>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>MSN:</span>
                                    <span className={s.infoItem__value}>{aircraft.msn}</span>
                                </div>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>Reg:</span>
                                    <span className={s.infoItem__value}>{aircraft.regNum}</span>
                                </div>
                            </div>
                            <div>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>FH:</span>
                                    <span className={s.infoItem__value}>{aircraft.fh}</span>
                                </div>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>FC:</span>
                                    <span className={s.infoItem__value}>{aircraft.fc}</span>
                                </div>
                            </div>
                        </div>
                        <h2 className={s.main__header}>Engines</h2>
                        <div className={s.aircraftInfo__section}>
                            <div className={s.aircraftInfo__section__block}>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>ENG1:</span>
                                    <span className={s.infoItem__value}>{aircraft.engines[0].msn}</span>
                                </div>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>ENG2:</span>
                                    <span className={s.infoItem__value}>{aircraft.engines[1].msn}</span>
                                </div>
                            </div>
                            <div className={s.aircraftInfo__section__block}>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>ENG3:</span>
                                    <span className={s.infoItem__value}>{aircraft.engines[2].msn}</span>
                                </div>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>ENG4:</span>
                                    <span className={s.infoItem__value}>{aircraft.engines[3].msn}</span>
                                </div>
                            </div>
                            <div className={s.infoItem}>
                                <span className={s.infoItem__title}>APU:</span>
                                <span className={s.infoItem__value}>{aircraft.apu}</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={s.widget__container} >
                    <AircraftFileWidget text='LEGS' img={legsIcon} aircraft={aircraft} />
                </div>
            </div>
            <div className={s.buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => setArcraftFile(false)} />
                <Button text="Add" btnType="button" color="green" />
            </div>

        </div >
    )
}

export default compose(withContainerBlur)(AircraftFile);