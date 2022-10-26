import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { compose } from "redux";
import engineAPI from "../../../../API/engineAPI";
import Button from "../../../../common/buttons/Button";
import { IAircraft } from "../../../../store/reducers/aircraftReducer";
import { IEngine } from "../../../../types/types";
import { subtractDatesFromNow, subtractDatesFromTo, subtractDatesNowFrom, subtractFC, subtractFH } from "../../../../utils/forms";
import { withContainerBlur } from "../../../HOC/withContainerBlur/withContainerBlur";
import s from "./AircraftPrintForm.module.scss";

type AircraftPrintFormProps = {
    setPrintForm: (printForm: boolean) => void;
    aircraft: IAircraft;
}

const daysToYYMM = (days: number): string => {
    if (!days) return '';
    return `${Math.floor(days / 365)} лет ${Math.floor((days % 365) / 30)} мес`;
}

const AircraftPrintForm: React.FC<AircraftPrintFormProps> = ({ setPrintForm, aircraft }) => {
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <div className={s.aircraftPrintForm}>
            <div className={s.aircraftPrintForm__content}>
                <ComponentToPrint aircraft={aircraft} ref={componentRef} />
            </div>

            <div className={s.buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => setPrintForm(false)} />
                <Button text="Print" btnType="button" color="green" handler={handlePrint} />
            </div>
        </div>
    )
}

type ComponentToPrintProps = {
    aircraft: IAircraft;
}

const ComponentToPrint = React.forwardRef(({ aircraft }: ComponentToPrintProps, ref: any) => {
    const [eng1, setEng1] = useState<IEngine | null>(null);
    const [eng2, setEng2] = useState<IEngine | null>(null);
    const [eng3, setEng3] = useState<IEngine | null>(null);
    const [eng4, setEng4] = useState<IEngine | null>(null);
    useEffect(() => {
        aircraft.engines.forEach(async (engine) => {
            try {
                const response = await engineAPI.getEngine(engine.msn);
                const eng: IEngine = await response.data;
                if (!eng) throw new Error("Reques failed");
                switch (eng.position) {
                    case 1:
                        setEng1(eng)

                        break;
                    case 2:
                        setEng2(eng)
                        break;
                    case 3:
                        setEng3(eng)
                        break;
                    case 4:
                        setEng4(eng)
                        break;
                    default:
                        break;
                }

            } catch (error) {
                console.log(error)
            }
        })
    }, [])
    return (
        <div className={s.componentToPrint} ref={ref}>
            <h3 className={s.componentToPrint__header} >СВЕДЕНИЯ О НАРАБОТКЕ АВИАЦИОННОЙ ТЕХНИКИ<br />AIRCRAFT ELAOSED TIME INFORMATION</h3>
            <div className={classNames(s.componentToPrint__section, s.componentToPrint__section__first)}>
                <div className={s.componentToPrint__section__block}>
                    <div className={s.infoBlock}>
                        <div className={s.infoBlock__title}>
                            Регистрационный №<br />
                            Registration No
                        </div>
                        <div className={s.infoBlock__value}>
                            {aircraft.regNum}
                        </div>
                    </div>
                    <div className={s.infoBlock}>
                        <div className={s.infoBlock__title}>
                            Форма предыдущего ПТО<br />
                            Last check
                        </div>
                        <div className={s.infoBlock__value}>
                            C-check
                        </div>
                    </div>
                    <div className={s.infoBlock}>
                        <div className={s.infoBlock__title}>
                            Дата предыдущего ПТО <br />
                            Last check date
                        </div>
                        <div className={s.infoBlock__value}>
                            26-03-2022
                        </div>
                    </div>
                </div>
                <div className={s.componentToPrint__section__block}>
                    <div className={s.infoBlock}>
                        <div className={s.infoBlock__title}>
                            По состоянию на<br />
                            Last revision date
                        </div>
                        <div className={s.infoBlock__value}>
                            18-08-2022
                        </div>
                    </div>
                    <div className={s.infoBlock}>
                        <div className={s.infoBlock__title}>
                            Наработка после последнего ПТО, час<br />
                            Time since last check, hrs
                        </div>
                        <div className={s.infoBlock__value}>
                            00:00
                        </div>
                    </div>
                    <div className={s.infoBlock}>
                        <div className={s.infoBlock__title}>
                            Срок службы после последнего ПТО, лет-мес<br />
                            Calendar since last check, years-month
                        </div>
                        <div className={s.infoBlock__value}>
                            00-06
                        </div>
                    </div>
                </div>
            </div>
            <table className={s.table}>
                <tbody>
                    <tr>
                        <th></th>
                        <th>ВС</th>
                        <th>СУ 1</th>
                        <th>СУ 2</th>
                        <th>СУ 3</th>
                        <th>СУ 4</th>
                        <th>ВСУ</th>
                    </tr>
                    <tr>
                        <td>Тип <br />Type</td>
                        <td>{aircraft.type}</td>
                        <td>{eng1?.type}</td>
                        <td>{eng2?.type}</td>
                        <td>{eng3?.type}</td>
                        <td>{eng4?.type}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Заводской (серийный) №<br />Manufacturer Serial Number (MSN)</td>
                        <td className={s.table__msn} >{aircraft.msn}</td>
                        <td className={s.table__msn} >{eng1?.msn}</td>
                        <td className={s.table__msn} >{eng2?.msn}</td>
                        <td className={s.table__msn} >{eng3?.msn}</td>
                        <td className={s.table__msn} >{eng4?.msn}</td>
                        <td className={s.table__msn} >{aircraft.apu}</td>
                    </tr>
                    <tr>
                        <td>Дата выпуска<br />Manufacture Date</td>
                        <td>{aircraft.manufDate}</td>
                        <td>{eng1?.manufDate}</td>
                        <td>{eng2?.manufDate}</td>
                        <td>{eng3?.manufDate}</td>
                        <td>{eng4?.manufDate}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Количество ремонтов<br />Number of Overhauls</td>
                        <td>{aircraft.overhaulNum}</td>
                        <td>{eng1?.overhaulNum}</td>
                        <td>{eng2?.overhaulNum}</td>
                        <td>{eng3?.overhaulNum}</td>
                        <td>{eng4?.overhaulNum}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Дата ремонта<br />Overhaul Date</td>
                        <td>{aircraft.lastOverhaulDate}</td>
                        <td>{eng1?.lastOverhaulDate}</td>
                        <td>{eng2?.lastOverhaulDate}</td>
                        <td>{eng3?.lastOverhaulDate}</td>
                        <td>{eng4?.lastOverhaulDate}</td>
                        <td>-</td>
                    </tr>
                </tbody>

            </table>
            <h4 className={s.componentToPrint__tableHeader}>НАЗНАЧЕННЫЙ РЕСУРС И СРОК СЛУЖБЫ</h4>
            <table className={s.table}>
                <tbody>
                    <tr>
                        <td>Назначенный ресурс, час<br />Total service life, hrs</td>
                        <td>{aircraft.tlt}</td>
                        <td>{eng1?.tlt}</td>
                        <td>{eng2?.tlt}</td>
                        <td>{eng3?.tlt}</td>
                        <td>{eng4?.tlt}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Наработка СНЭ, час<br />TSN, hrs</td>
                        <td>{aircraft.fh}</td>
                        <td>{eng1?.tsn}</td>
                        <td>{eng2?.tsn}</td>
                        <td>{eng3?.tsn}</td>
                        <td>{eng4?.tsn}</td>
                        <td>-</td>
                    </tr>
                    <tr className={s.row__bold}>
                        <td>Остаток назначенного ресурса, час<br />TSN remaning, hrs</td>
                        <td>{subtractFH(aircraft.tlt, aircraft.fh)}</td>
                        <td>{subtractFH(eng1?.tlt, eng1?.tsn)}</td>
                        <td>{subtractFH(eng2?.tlt, eng2?.tsn)}</td>
                        <td>{subtractFH(eng3?.tlt, eng3?.tsn)}</td>
                        <td>{subtractFH(eng4?.tlt, eng4?.tsn)}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Назначенный ресурс, цикл<br />TC, cycles</td>
                        <td>{aircraft.tlc}</td>
                        <td>{eng1?.tlc}</td>
                        <td>{eng2?.tlc}</td>
                        <td>{eng3?.tlc}</td>
                        <td>{eng4?.tlc}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Наработка СНЭ, цикл<br />CSN, cycles</td>
                        <td>{aircraft.fc}</td>
                        <td>{eng1?.csn}</td>
                        <td>{eng2?.csn}</td>
                        <td>{eng3?.csn}</td>
                        <td>{eng4?.csn}</td>
                        <td>-</td>
                    </tr>
                    <tr className={s.row__bold}>
                        <td>Остаток назначенного ресурса, цикл<br />CSN remaning, cycles</td>
                        <td>{subtractFC(aircraft.tlc, aircraft.fc)}</td>
                        <td>{subtractFC(eng1?.tlc, eng1?.csn)}</td>
                        <td>{subtractFC(eng2?.tlc, eng2?.csn)}</td>
                        <td>{subtractFC(eng3?.tlc, eng3?.csn)}</td>
                        <td>{subtractFC(eng4?.tlc, eng4?.csn)}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Назначенный срок службы до<br />Total calendar till</td>
                        <td>{aircraft.tlp}</td>
                        <td>{eng1?.tlp}</td>
                        <td>{eng2?.tlp}</td>
                        <td>{eng3?.tlp}</td>
                        <td>{eng4?.tlp}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Назначенный срок службы, лет-мес<br />Total calendar, years-month</td>
                        <td>{daysToYYMM(+subtractDatesFromTo(aircraft?.tlp, aircraft?.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesFromTo(eng1?.tlp, eng1?.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesFromTo(eng2?.tlp, eng2?.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesFromTo(eng3?.tlp, eng3?.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesFromTo(eng4?.tlp, eng4?.manufDate))}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Cрок службы СНЭ, лет-мес<br />Сalendar since new, years-month</td>
                        <td>{daysToYYMM(+subtractDatesNowFrom(aircraft.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesNowFrom(eng1?.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesNowFrom(eng2?.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesNowFrom(eng3?.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesNowFrom(eng4?.manufDate))}</td>
                        <td>-</td>
                    </tr>
                    <tr className={s.row__bold}>
                        <td>Остаток назначенного срока службы, дней<br />Total calendar, Calendar remaining, days</td>
                        <td>{subtractDatesFromNow(aircraft.tlp)}</td>
                        <td>{subtractDatesFromNow(eng1?.tlp)}</td>
                        <td>{subtractDatesFromNow(eng2?.tlp)}</td>
                        <td>{subtractDatesFromNow(eng3?.tlp)}</td>
                        <td>{subtractDatesFromNow(eng4?.tlp)}</td>
                        <td>-</td>
                    </tr>
                </tbody>

            </table>
            <h4 className={s.componentToPrint__tableHeader}>МЕЖРЕМОНТНЫЙ РЕСУРС И СРОК СЛУЖБЫ</h4>
            <table className={s.table}>
                <tbody>
                    <tr>
                        <td>Межремонтный ресурс, час<br />Total service life, hrs</td>
                        <td>{aircraft.tbo}</td>
                        <td>{eng1?.tbo}</td>
                        <td>{eng2?.tbo}</td>
                        <td>{eng3?.tbo}</td>
                        <td>{eng4?.tbo}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Наработка ППР, час<br />TSO, hrs</td>
                        <td>{aircraft.overhaulNum ? subtractFH(aircraft.fh, aircraft.tsnAtlastOverhaul) : aircraft.fh}</td>
                        <td>{eng1?.overhaulNum ? subtractFH(eng1?.tsn, eng1?.tsnAtlastOverhaul) : eng1?.tsn}</td>
                        <td>{eng2?.overhaulNum ? subtractFH(eng2?.tsn, eng2?.tsnAtlastOverhaul) : eng2?.tsn}</td>
                        <td>{eng3?.overhaulNum ? subtractFH(eng3?.tsn, eng3?.tsnAtlastOverhaul) : eng3?.tsn}</td>
                        <td>{eng4?.overhaulNum ? subtractFH(eng4?.tsn, eng4?.tsnAtlastOverhaul) : eng4?.tsn}</td>
                        <td>-</td>
                    </tr>
                    <tr className={s.row__bold}>
                        <td>Остаток межремонтного ресурса, час<br />TBO remaning, hrs</td>
                        <td>{subtractFH(aircraft?.tbo, aircraft.overhaulNum ? subtractFH(aircraft?.fh, aircraft?.tsnAtlastOverhaul) : aircraft.fh)}</td>
                        <td>{subtractFH(eng1?.tbo, eng1?.overhaulNum ? subtractFH(eng1?.tsn, eng1?.tsnAtlastOverhaul) : eng1?.tsn)}</td>
                        <td>{subtractFH(eng2?.tbo, eng2?.overhaulNum ? subtractFH(eng2?.tsn, eng2?.tsnAtlastOverhaul) : eng2?.tsn)}</td>
                        <td>{subtractFH(eng3?.tbo, eng3?.overhaulNum ? subtractFH(eng3?.tsn, eng3?.tsnAtlastOverhaul) : eng3?.tsn)}</td>
                        <td>{subtractFH(eng4?.tbo, eng4?.overhaulNum ? subtractFH(eng4?.tsn, eng4?.tsnAtlastOverhaul) : eng4?.tsn)}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Межремонтный ресурс, цикл<br />CBO, cycles</td>
                        <td>{aircraft.cbo}</td>
                        <td>{eng1?.cbo}</td>
                        <td>{eng2?.cbo}</td>
                        <td>{eng3?.cbo}</td>
                        <td>{eng4?.cbo}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Наработка ППР, цикл<br />CSN, cycles</td>
                        <td>{aircraft.overhaulNum ? subtractFC(aircraft?.fc, aircraft?.csnAtlastOverhaul) : aircraft.fc}</td>
                        <td>{eng1?.overhaulNum ? subtractFC(eng1?.csn, eng1?.csnAtlastOverhaul) : eng1?.csn}</td>
                        <td>{eng2?.overhaulNum ? subtractFC(eng2?.csn, eng2?.csnAtlastOverhaul) : eng2?.csn}</td>
                        <td>{eng3?.overhaulNum ? subtractFC(eng3?.csn, eng3?.csnAtlastOverhaul) : eng3?.csn}</td>
                        <td>{eng4?.overhaulNum ? subtractFC(eng4?.csn, eng4?.csnAtlastOverhaul) : eng4?.csn}</td>
                        <td>-</td>
                    </tr>
                    <tr className={s.row__bold}>
                        <td>Остаток межремонтного ресурса, цикл<br />CBO remaning, cycles</td>
                        <td>{subtractFC(aircraft.cbo, aircraft.overhaulNum ? subtractFC(aircraft.fc, aircraft?.csnAtlastOverhaul) : aircraft.fc)}</td>
                        <td>{subtractFC(eng1?.cbo, eng1?.overhaulNum ? subtractFC(eng1?.csn, eng1?.csnAtlastOverhaul) : eng1?.csn)}</td>
                        <td>{subtractFC(eng2?.cbo, eng2?.overhaulNum ? subtractFC(eng2?.csn, eng2?.csnAtlastOverhaul) : eng2?.csn)}</td>
                        <td>{subtractFC(eng3?.cbo, eng3?.overhaulNum ? subtractFC(eng3?.csn, eng3?.csnAtlastOverhaul) : eng3?.csn)}</td>
                        <td>{subtractFC(eng4?.cbo, eng4?.overhaulNum ? subtractFC(eng4?.csn, eng4?.csnAtlastOverhaul) : eng4?.csn)}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Межремонтный срок службы до<br />Calendar between overhaul till</td>
                        <td>{aircraft.pbo}</td>
                        <td>{eng1?.pbo}</td>
                        <td>{eng2?.pbo}</td>
                        <td>{eng3?.pbo}</td>
                        <td>{eng4?.pbo}</td>
                        <td>apu tlp</td>
                    </tr>
                    <tr>
                        <td>Межремонтный срок службы, лет-мес<br />Calendar between overhaul, years-month</td>
                        <td>{daysToYYMM(+subtractDatesFromTo(aircraft.pbo, aircraft?.overhaulNum ? aircraft?.lastOverhaulDate : aircraft.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesFromTo(eng1?.pbo, eng1?.overhaulNum ? eng1?.lastOverhaulDate : eng1?.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesFromTo(eng2?.pbo, eng2?.overhaulNum ? eng2?.lastOverhaulDate : eng2?.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesFromTo(eng3?.pbo, eng3?.overhaulNum ? eng3?.lastOverhaulDate : eng3?.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesFromTo(eng4?.pbo, eng4?.overhaulNum ? eng4?.lastOverhaulDate : eng4?.manufDate))}</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>Cрок службы ППР, лет-мес<br />Сalendar since overhaul, years-month</td>
                        <td>{daysToYYMM(+subtractDatesNowFrom(aircraft.overhaulNum ? aircraft?.lastOverhaulDate : aircraft.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesNowFrom(eng1?.overhaulNum ? eng1?.lastOverhaulDate : eng1?.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesNowFrom(eng2?.overhaulNum ? eng2?.lastOverhaulDate : eng2?.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesNowFrom(eng3?.overhaulNum ? eng3?.lastOverhaulDate : eng3?.manufDate))}</td>
                        <td>{daysToYYMM(+subtractDatesNowFrom(eng4?.overhaulNum ? eng4?.lastOverhaulDate : eng4?.manufDate))}</td>
                        <td>-</td>
                    </tr>
                    <tr className={s.row__bold}>
                        <td>Остаток межрем. срока службы, дней<br />Calendar between overhaul remaining, days</td>
                        <td>{subtractDatesFromNow(aircraft?.pbo)}</td>
                        <td>{subtractDatesFromNow(eng1?.pbo)}</td>
                        <td>{subtractDatesFromNow(eng2?.pbo)}</td>
                        <td>{subtractDatesFromNow(eng3?.pbo)}</td>
                        <td>{subtractDatesFromNow(eng4?.pbo)}</td>
                        <td>-</td>
                    </tr>
                </tbody>

            </table>
        </div >
    )
})

export default compose(withContainerBlur)(AircraftPrintForm);