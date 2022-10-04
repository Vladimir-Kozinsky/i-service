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
                    <h2 className={s.main__header}>Aircraft data</h2>
                    <div className={s.aircraftInfo} >
                        <div className={s.aircraftInfo__block} >
                            <span className={s.aircraftInfo__block__title}>Type:</span>
                            <span className={s.aircraftInfo__block__value}>{aircraft.type}</span>
                        </div>
                        <div className={s.aircraftInfo__block}>
                            <span className={s.aircraftInfo__block__title}>MSN:</span>
                            <span className={s.aircraftInfo__block__value}>{aircraft.msn}</span>
                        </div>
                        <div className={s.aircraftInfo__block}>
                            <span className={s.aircraftInfo__block__title}>Reg:</span>
                            <span className={s.aircraftInfo__block__value}>{aircraft.regNum}</span>
                        </div>
                        <div className={s.aircraftInfo__block}>
                            <span className={s.aircraftInfo__block__title}>FH:</span>
                            <span className={s.aircraftInfo__block__value}>{aircraft.fh}</span>
                        </div>
                        <div className={s.aircraftInfo__block}>
                            <span className={s.aircraftInfo__block__title}>FC:</span>
                            <span className={s.aircraftInfo__block__value}>{aircraft.fc}</span>
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