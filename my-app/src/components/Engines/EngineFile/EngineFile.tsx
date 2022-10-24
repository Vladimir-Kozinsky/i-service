import { compose } from "redux";
import Button from "../../../common/buttons/Button";
import { IEngine } from "../../../types/types";
import {  subtractDatesFromNow, subtractFC, subtractFH, summFC, summFH } from "../../../utils/forms";
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur";
import DataBlock from "./DataBlock/DataBlock";
import s from "./EngineFile.module.scss";

type EngineFileProps = {
    setEngineFile: (engineFile: boolean) => void;
    engine: IEngine;
}

const EngineFile: React.FC<EngineFileProps> = ({ engine, setEngineFile }) => {
    return (
        <div className={s.engineFile}>
            <div className={s.main}>
                <div className={s.engineData} >
                    <div className={s.engineInfo} >
                        <h2 className={s.main__header}>General</h2>
                        <div className={s.engineInfo__section}>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="Type" value={engine.type} />
                                <DataBlock title="MSN" value={engine.msn} />
                                <DataBlock title="M-Date" value={engine.manufDate} />
                            </div>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="TSN" value={engine.tsn} />
                                <DataBlock title="CSN" value={engine.csn} />
                                <DataBlock title="TSO" value={subtractFH(engine.tsn, engine.tsnAtlastOverhaul)} />
                                <DataBlock title="CSO" value={subtractFC(engine.csn, engine.csnAtlastOverhaul)} />
                            </div>
                        </div>
                        <h2 className={s.main__header} >Installation</h2>
                        <div className={s.engineInfo__section}>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="A/C" value={engine.onAircraft} />
                                <DataBlock title="Pos." value={engine.position} />
                                <DataBlock title="In. Date" value={engine.installDate} />

                            </div>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="A/C TSN" value={engine.aircraftTsn} />
                                <DataBlock title="A/C CSN" value={engine.aircraftCsn} />
                                <DataBlock title="ENG TSN" value={engine.engTsn} />
                                <DataBlock title="ENG CSN" value={engine.engCsn} />
                            </div>
                        </div>
                        <h2 className={s.main__header} >Overhaul</h2>
                        <div className={s.engineInfo__section}>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="SV No." value={engine.overhaulNum} />
                                <DataBlock title="LSV Date" value={engine.lastOverhaulDate} />
                            </div>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="LSV TSN" value={engine.tsnAtlastOverhaul} />
                                <DataBlock title="LSV CSN" value={engine.csnAtlastOverhaul} />
                            </div>
                        </div>
                        <h2 className={s.main__header} >Limits</h2>
                        <div className={s.engineInfo__section}>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="LL" value={engine.tlp} />
                                <DataBlock title="LL Time" value={engine.tlt} />
                                <DataBlock title="LL Cycles" value={engine.tlc} />
                            </div>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="LLBO" value={engine.pbo} />
                                <DataBlock title="LLTBO" value={engine.tbo} />
                                <DataBlock title="LLCBO" value={engine.cbo} />
                            </div>
                        </div>
                        <h2 className={s.main__header} >Remains</h2>
                        <div className={s.engineInfo__section}>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="LL Rem." value={`${subtractDatesFromNow(engine.tlp)} days`} />
                                <DataBlock title="LLT Rem." value={subtractFH(engine.tlt, engine.tsn)} />
                                <DataBlock title="LLC Rem." value={subtractFC(engine.tlc, engine.csn)} />
                            </div>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="LLBO" value={`${subtractDatesFromNow(engine.pbo)} days`} />
                                <DataBlock title="LLTBO" value={subtractFH(summFH(engine.tsnAtlastOverhaul, engine.tbo), engine.tsn)} />
                                <DataBlock title="LLCBO" value={subtractFC(summFC(engine.csnAtlastOverhaul, engine.cbo), engine.csn)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.widget__container} >
                    widgets
                </div>
            </div>
            <div className={s.buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => setEngineFile(false)} />
            </div>
        </div >
    )
}

export default compose(withContainerBlur)(EngineFile);
