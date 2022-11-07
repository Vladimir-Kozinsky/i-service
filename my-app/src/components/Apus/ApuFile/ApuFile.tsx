import { compose } from "redux";
import Button from "../../../common/buttons/Button";
import { IApu } from "../../../types/types";
import { subtractDatesFromNow, subtractFC, subtractFH, summFC, summFH } from "../../../utils/forms";
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur";
import DataBlock from "../../../common/DataBlock/DataBlock";
import s from "./ApuFile.module.scss";

type ApuFileProps = {
    setApuFile: (apuFile: boolean) => void;
    apu: IApu;
}

const ApuFile: React.FC<ApuFileProps> = ({ apu, setApuFile }) => {
    return (
        <div className={s.engineFile}>
            <div className={s.main}>
                <div className={s.engineData} >
                    <div className={s.engineInfo} >
                        <h2 className={s.main__header}>General</h2>
                        <div className={s.engineInfo__section}>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="Type" value={apu.type} />
                                <DataBlock title="MSN" value={apu.msn} />
                                <DataBlock title="M-Date" value={apu.manufDate} />
                            </div>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="TSN" value={apu.tsn} />
                                <DataBlock title="CSN" value={apu.csn} />
                                <DataBlock title="TSO" value={subtractFH(apu.tsn, apu.tsnAtlastOverhaul)} />
                                <DataBlock title="CSO" value={subtractFC(apu.csn, apu.csnAtlastOverhaul)} />
                            </div>
                        </div>
                        <h2 className={s.main__header} >Installation</h2>
                        <div className={s.engineInfo__section}>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="A/C" value={apu.onAircraft} />
                                <DataBlock title="In. Date" value={apu.installDate} />

                            </div>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="A/C TSN" value={apu.aircraftTsn} />
                                <DataBlock title="A/C CSN" value={apu.aircraftCsn} />
                                <DataBlock title="ENG TSN" value={apu.engTsn} />
                                <DataBlock title="ENG CSN" value={apu.engCsn} />
                            </div>
                        </div>
                        <h2 className={s.main__header} >Overhaul</h2>
                        <div className={s.engineInfo__section}>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="SV No." value={apu.overhaulNum} />
                                <DataBlock title="LSV Date" value={apu.lastOverhaulDate} />
                            </div>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="LSV TSN" value={apu.tsnAtlastOverhaul} />
                                <DataBlock title="LSV CSN" value={apu.csnAtlastOverhaul} />
                            </div>
                        </div>
                        <h2 className={s.main__header} >Limits</h2>
                        <div className={s.engineInfo__section}>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="LL" value={apu.tlp} />
                                <DataBlock title="LL Time" value={apu.tlt} />
                                <DataBlock title="LL Cycles" value={apu.tlc} />
                            </div>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="LLBO" value={apu.pbo} />
                                <DataBlock title="LLTBO" value={apu.tbo} />
                                <DataBlock title="LLCBO" value={apu.cbo} />
                            </div>
                        </div>
                        <h2 className={s.main__header} >Remains</h2>
                        <div className={s.engineInfo__section}>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="LL Rem." value={`${subtractDatesFromNow(apu.tlp)} days`} />
                                <DataBlock title="LLT Rem." value={subtractFH(apu.tlt, apu.tsn)} />
                                <DataBlock title="LLC Rem." value={subtractFC(apu.tlc, apu.csn)} />
                            </div>
                            <div className={s.engineInfo__section__block} >
                                <DataBlock title="LLBO" value={`${subtractDatesFromNow(apu.pbo)} days`} />
                                <DataBlock title="LLTBO" value={subtractFH(summFH(apu.tsnAtlastOverhaul, apu.tbo), apu.tsn)} />
                                <DataBlock title="LLCBO" value={subtractFC(summFC(apu.csnAtlastOverhaul, apu.cbo), apu.csn)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.widget__container} >
                    widgets
                </div>
            </div>
            <div className={s.buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => setApuFile(false)} />
            </div>
        </div >
    )
}

export default compose(withContainerBlur)(ApuFile);
