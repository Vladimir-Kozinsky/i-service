import s from "./AircraftFile.module.scss";
import AircraftFileWidget from "./AircraftFileWdget/AircraftFileWidget";
import legsIcon from "./../../../assets/img/png/legs-icon.png";
import instEngIcon from "./../../../assets/img/png/installEng-icon.png";
import remEngIcon from "./../../../assets/img/jpeg/engine-removal.jpg";

import { IAircraft } from "../../../store/reducers/aircraftReducer";
import { compose } from "redux";
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur";
import Button from "../../../common/buttons/Button";
import { useEffect, useState } from "react";
import { setEngine } from "../../../utils/forms";

type IAircraftFileProps = {
    aircraft: IAircraft
    setArcraftFile: (isAircraftFile: boolean) => void
}



const AircraftFile = ({ aircraft, setArcraftFile }: IAircraftFileProps) => {
    const [aircraftData, setAircraftData] = useState(aircraft);
    useEffect(() => {
        setAircraftData(aircraft);
    }, [aircraft])
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
                                    <span className={s.infoItem__value}>{aircraftData.type}</span>
                                </div>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>MSN:</span>
                                    <span className={s.infoItem__value}>{aircraftData.msn}</span>
                                </div>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>Reg:</span>
                                    <span className={s.infoItem__value}>{aircraftData.regNum}</span>
                                </div>
                            </div>
                            <div>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>FH:</span>
                                    <span className={s.infoItem__value}>{aircraftData.fh}</span>
                                </div>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>FC:</span>
                                    <span className={s.infoItem__value}>{aircraftData.fc}</span>
                                </div>
                            </div>
                        </div>
                        <h2 className={s.main__header}>Engines</h2>
                        <div className={s.aircraftInfo__section}>
                            <div className={s.aircraftInfo__section__block}>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>ENG1:</span>
                                    <span className={s.infoItem__value}>{setEngine(1, aircraftData.engines)}</span>
                                </div>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>ENG2:</span>
                                    <span className={s.infoItem__value}>{setEngine(2, aircraftData.engines)}</span>
                                </div>
                            </div>
                            <div className={s.aircraftInfo__section__block}>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>ENG3:</span>
                                    <span className={s.infoItem__value}>{setEngine(3, aircraftData.engines)}</span>
                                </div>
                                <div className={s.infoItem}>
                                    <span className={s.infoItem__title}>ENG4:</span>
                                    <span className={s.infoItem__value}>{setEngine(4, aircraftData.engines)}</span>
                                </div>
                            </div>
                            <div className={s.infoItem}>
                                <span className={s.infoItem__title}>APU:</span>
                                <span className={s.infoItem__value}>{aircraftData.apu}</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className={s.widget__container} >
                    <AircraftFileWidget text='LEGS' img={legsIcon} aircraft={aircraftData} />
                    <AircraftFileWidget text='INSTALL ENGINE' img={instEngIcon} aircraft={aircraftData} />
                    <AircraftFileWidget text='REMOVE ENGINE' img={remEngIcon} aircraft={aircraftData} />
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