import s from "./AircraftFile.module.scss";
import AircraftFileWidget from "./AircraftFileWdget/AircraftFileWidget";
import legsIcon from "./../../../assets/img/png/legs-icon.png";
import instEngIcon from "./../../../assets/img/png/installEng-icon.png";
import remEngIcon from "./../../../assets/img/jpeg/engine-removal.jpg";
import apuIcon from "./../../../assets/img/png/apu.png";
import { IAircraft } from "../../../store/reducers/aircraftReducer";
import { compose } from "redux";
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur";
import Button from "../../../common/buttons/Button";
import { useEffect, useState } from "react";
import { setEngine, subtractDatesFromNow, subtractFC, subtractFH } from "../../../utils/forms";
import AircraftPrintForm from "./AircraftPrintForm/AircraftPrintForm";
import DataBlock from "../../../common/DataBlock/DataBlock";

type IAircraftFileProps = {
    aircraft: IAircraft
    setArcraftFile: (isAircraftFile: boolean) => void
}

const AircraftFile = ({ aircraft, setArcraftFile }: IAircraftFileProps) => {
    const [aircraftData, setAircraftData] = useState(aircraft);
    const [printForm, setPrintForm] = useState<boolean>(false);
    useEffect(() => {
        setAircraftData(aircraft);
    }, [aircraft])
    return (
        <div className={s.aircraftFile} >
            {printForm && <AircraftPrintForm setPrintForm={setPrintForm} aircraft={aircraft} />}
            <div className={s.main}>
                <div className={s.aircraftData} >
                    <div className={s.aircraftInfo} >
                        <h2 className={s.main__header}>Aircraft</h2>
                        <div className={s.aircraftInfo__section}>
                            <div className={s.aircraftInfo__section__block} >
                                <DataBlock title="Type" value={aircraftData.type} />
                                <DataBlock title="MSN" value={aircraftData.msn} />
                                <DataBlock title="Reg" value={aircraftData.regNum} />
                            </div>
                            <div>
                                <DataBlock title="FH" value={aircraftData.fh} />
                                <DataBlock title="FC" value={aircraftData.fc} />
                            </div>
                        </div>
                        <h2 className={s.main__header}>Engines</h2>
                        <div className={s.aircraftInfo__section}>
                            <div className={s.aircraftInfo__section__block}>
                                <DataBlock title="ENG1" value={setEngine(1, aircraftData.engines)} />
                                <DataBlock title="ENG2" value={setEngine(2, aircraftData.engines)} />
                            </div>
                            <div className={s.aircraftInfo__section__block}>
                                <DataBlock title="ENG3" value={setEngine(3, aircraftData.engines)} />
                                <DataBlock title="ENG4" value={setEngine(4, aircraftData.engines)} />
                            </div>
                            <div className={s.aircraftInfo__section__block}>
                                <DataBlock title="APU" value={aircraftData.apu?.msn} />
                            </div>
                        </div>
                        <h2 className={s.main__header}>Limits</h2>
                        <div className={s.aircraftInfo__section}>
                            <div className={s.aircraftInfo__section__block} >
                                <DataBlock title="LL" value={aircraftData.tlp} />
                                <DataBlock title="LL Time" value={aircraftData.tlt} />
                                <DataBlock title="LL Cycles" value={aircraftData.tlc} />
                            </div>
                            <div className={s.aircraftInfo__section__block} >
                                <DataBlock title="LLBO" value={aircraftData.pbo} />
                                <DataBlock title="LLTBO" value={aircraftData.tbo} />
                                <DataBlock title="LLCBO" value={aircraftData.cbo} />
                            </div>
                        </div>
                        <h2 className={s.main__header} >Remains</h2>
                        <div className={s.aircraftInfo__section}>
                            <div className={s.aircraftInfo__section__block} >
                                <DataBlock title="LL Rem." value={`${subtractDatesFromNow(aircraftData.tlp)} days`} />
                                <DataBlock title="LLT Rem." value={subtractFH(aircraftData.tlt, aircraftData.fh)} />
                                <DataBlock title="LLC Rem." value={subtractFC(aircraftData.tlc, aircraftData.fc)} />
                            </div>
                            <div className={s.aircraftInfo__section__block} >
                                <DataBlock title="LLBO" value={`${subtractDatesFromNow(aircraftData.pbo)} days`} />
                                <DataBlock title="LLTBO" value={subtractFH(aircraft?.tbo, aircraft.overhaulNum ? subtractFH(aircraft?.fh, aircraft?.tsnAtlastOverhaul) : aircraft.fh)} />
                                <DataBlock title="LLCBO" value={subtractFC(aircraftData.cbo, aircraftData.overhaulNum ? subtractFC(aircraftData.fc, aircraftData?.csnAtlastOverhaul) : aircraftData.fc)} />
                            </div>
                        </div>
                    </div>
                    <div className={s.aircraftData__buttons} >
                        <Button text="Print Report" btnType="button" color="green" handler={() => setPrintForm(true)} />
                    </div>
                </div>
                <div className={s.widget__container} >
                    <AircraftFileWidget text='LEGS' img={legsIcon} aircraft={aircraftData} />
                    <AircraftFileWidget text='INSTALL ENGINE' img={instEngIcon} aircraft={aircraftData} />
                    <AircraftFileWidget text='REMOVE ENGINE' img={remEngIcon} aircraft={aircraftData} />
                    <AircraftFileWidget text='INSTALL APU' img={apuIcon} aircraft={aircraftData} />
                    <AircraftFileWidget text='REMOVE APU' img={apuIcon} aircraft={aircraftData} />
                </div>
            </div>
            <div className={s.buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => setArcraftFile(false)} />
            </div>

        </div >
    )
}

export default compose(withContainerBlur)(AircraftFile);