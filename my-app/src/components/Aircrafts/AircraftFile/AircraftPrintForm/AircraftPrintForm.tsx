import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { compose } from "redux";
import engineAPI from "../../../../API/engineAPI";
import Button from "../../../../common/buttons/Button";
import { IAircraft } from "../../../../store/reducers/aircraftReducer";
import { IEngine } from "../../../../types/types";
import { subtractDatesFromNow, subtractDatesNowFrom, subtractFC, subtractFH } from "../../../../utils/forms";
import { withContainerBlur } from "../../../HOC/withContainerBlur/withContainerBlur";
import s from "./AircraftPrintForm.module.scss";

type AircraftPrintFormProps = {
    setPrintForm: (printForm: boolean) => void;
    aircraft: IAircraft;
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
                    <td>TA-6A</td>
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
                    <td></td>
                </tr>
                <tr>
                    <td>Количество ремонтов<br />Number of Overhauls</td>
                    <td>0</td>
                    <td>{eng1?.overhaulNum}</td>
                    <td>{eng2?.overhaulNum}</td>
                    <td>{eng3?.overhaulNum}</td>
                    <td>{eng4?.overhaulNum}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Дата ремонта<br />Overhaul Date</td>
                    <td>-</td>
                    <td>{eng1?.lastOverhaulDate}</td>
                    <td>{eng2?.lastOverhaulDate}</td>
                    <td>{eng3?.lastOverhaulDate}</td>
                    <td>{eng4?.lastOverhaulDate}</td>
                    <td></td>
                </tr>
            </table>
            <h4 className={s.componentToPrint__tableHeader}>НАЗНАЧЕННЫЙ РЕСУРС И СРОК СЛУЖБЫ</h4>
            <table className={s.table}>
                <tr>
                    <td>Назначенный ресурс, час<br />Total service life, hrs</td>
                    <td>13000:00</td>
                    <td>{eng1?.tlp}</td>
                    <td>{eng2?.tlp}</td>
                    <td>{eng3?.tlp}</td>
                    <td>{eng4?.tlp}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Наработка СНЭ, час<br />TSN, hrs</td>
                    <td>{aircraft.fh}</td>
                    <td>{eng1?.tsn}</td>
                    <td>{eng2?.tsn}</td>
                    <td>{eng3?.tsn}</td>
                    <td>{eng4?.tsn}</td>
                    <td></td>
                </tr>
                <tr className={s.row__bold}>
                    <td>Остаток назначенного ресурса, час<br />TSN remaning, hrs</td>
                    <td>{subtractFH("13000:00", aircraft.fh)}</td>
                    <td>{subtractFH(eng1?.tlt, eng1?.tsn)}</td>
                    <td>{subtractFH(eng2?.tlt, eng2?.tsn)}</td>
                    <td>{subtractFH(eng3?.tlt, eng3?.tsn)}</td>
                    <td>{subtractFH(eng4?.tlt, eng4?.tsn)}</td>
                    <td>apu 3432</td>
                </tr>
                <tr>
                    <td>Назначенный ресурс, цикл<br />TC, cycles</td>
                    <td>4500</td>
                    <td>{eng1?.tlc}</td>
                    <td>{eng2?.tlc}</td>
                    <td>{eng3?.tlc}</td>
                    <td>{eng4?.tlc}</td>
                    <td>apu tlc</td>
                </tr>
                <tr>
                    <td>Наработка СНЭ, цикл<br />CSN, cycles</td>
                    <td>{aircraft.fc}</td>
                    <td>{eng1?.csn}</td>
                    <td>{eng2?.csn}</td>
                    <td>{eng3?.csn}</td>
                    <td>{eng4?.csn}</td>
                    <td>apu tlc</td>
                </tr>
                <tr className={s.row__bold}>
                    <td>Остаток назначенного ресурса, цикл<br />CSN remaning, cycles</td>
                    <td>no data</td>
                    <td>{subtractFC(eng1?.tlc, eng1?.csn)}</td>
                    <td>{subtractFC(eng2?.tlc, eng2?.csn)}</td>
                    <td>{subtractFC(eng3?.tlc, eng3?.csn)}</td>
                    <td>{subtractFC(eng4?.tlc, eng4?.csn)}</td>
                    <td>apu tlc</td>
                </tr>
                <tr>
                    <td>Назначенный срок службы до<br />Total calendar till</td>
                    <td>30-11-2022</td>
                    <td>{eng1?.tlp}</td>
                    <td>{eng2?.tlp}</td>
                    <td>{eng3?.tlp}</td>
                    <td>{eng4?.tlp}</td>
                    <td>apu tlp</td>
                </tr>
                <tr>
                    <td>Назначенный срок службы, лет-мес<br />Total calendar, years-month</td>
                    <td>30-11-2022</td>
                    <td>{eng1?.tlp}</td>
                    <td>{eng2?.tlp}</td>
                    <td>{eng3?.tlp}</td>
                    <td>{eng4?.tlp}</td>
                    <td>apu tlp</td>
                </tr>
                <tr>
                    <td>Cрок службы СНЭ, лет-мес<br />Сalendar since new, years-month</td>
                    <td>30-11-2022</td>
                    <td>{`${Math.floor(+subtractDatesNowFrom(eng1?.manufDate) / 365)} лет ${+subtractDatesNowFrom(eng1?.manufDate) % 12} мес `}</td>
                    <td>{`${Math.floor(+subtractDatesNowFrom(eng2?.manufDate) / 365)} лет ${+subtractDatesNowFrom(eng2?.manufDate) % 12} мес `}</td>
                    <td>{`${Math.floor(+subtractDatesNowFrom(eng3?.manufDate) / 365)} лет ${+subtractDatesNowFrom(eng3?.manufDate) % 12} мес `}</td>
                    <td>{`${Math.floor(+subtractDatesNowFrom(eng4?.manufDate) / 365)} лет ${+subtractDatesNowFrom(eng4?.manufDate) % 12} мес `}</td>
                    <td>apu tlp</td>
                </tr>
                <tr className={s.row__bold}>
                    <td>Остаток назначенного срока службы, дней<br />Total calendar, Calendar remaining, days</td>
                    <td>30-sdfsd</td>
                    <td>{subtractDatesFromNow(eng1?.tlp)}</td>
                    <td>{subtractDatesFromNow(eng2?.tlp)}</td>
                    <td>{subtractDatesFromNow(eng3?.tlp)}</td>
                    <td>{subtractDatesFromNow(eng4?.tlp)}</td>
                    <td>apu tlp</td>
                </tr>
            </table>
            <h4 className={s.componentToPrint__tableHeader}>МЕЖРЕМОНТНЫЙ РЕСУРС И СРОК СЛУЖБЫ</h4>
            <table className={s.table}>
                <tr>
                    <td>Межремонтный ресурс, час<br />Total service life, hrs</td>
                    <td>13000:00</td>
                    <td>{eng1?.tbo}</td>
                    <td>{eng2?.tbo}</td>
                    <td>{eng3?.tbo}</td>
                    <td>{eng4?.tbo}</td>
                    <td>apu</td>
                </tr>
                <tr>
                    <td>Наработка ППР, час<br />TSO, hrs</td>
                    <td>{aircraft.fh}</td>
                    <td>{subtractFH(eng1?.tsn, eng1?.tsnAtlastOverhaul)}</td>
                    <td>{subtractFH(eng2?.tsn, eng2?.tsnAtlastOverhaul)}</td>
                    <td>{subtractFH(eng3?.tsn, eng3?.tsnAtlastOverhaul)}</td>
                    <td>{subtractFH(eng4?.tsn, eng4?.tsnAtlastOverhaul)}</td>
                    <td></td>
                </tr>
                <tr className={s.row__bold}>
                    <td>Остаток межремонтного ресурса, час<br />TBO remaning, hrs</td>
                    <td>4500</td>
                    <td>{subtractFH(eng1?.tbo, subtractFH(eng1?.tsn, eng1?.tsnAtlastOverhaul))}</td>
                    <td>{subtractFH(eng2?.tbo, subtractFH(eng2?.tsn, eng2?.tsnAtlastOverhaul))}</td>
                    <td>{subtractFH(eng3?.tbo, subtractFH(eng3?.tsn, eng3?.tsnAtlastOverhaul))}</td>
                    <td>{subtractFH(eng4?.tbo, subtractFH(eng4?.tsn, eng4?.tsnAtlastOverhaul))}</td>
                    <td>apu 3432</td>
                </tr>
                <tr>
                    <td>Межремонтный ресурс, цикл<br />CBO, cycles</td>
                    <td>3600</td>
                    <td>{eng1?.cbo}</td>
                    <td>{eng2?.cbo}</td>
                    <td>{eng3?.cbo}</td>
                    <td>{eng4?.cbo}</td>
                    <td>apu cbo</td>
                </tr>
                <tr>
                    <td>Наработка СНЭ, цикл<br />CSN, cycles</td>
                    <td>{aircraft.fc}</td>
                    <td>{subtractFC(eng1?.csn, eng1?.csnAtlastOverhaul)}</td>
                    <td>{subtractFC(eng2?.csn, eng2?.csnAtlastOverhaul)}</td>
                    <td>{subtractFC(eng3?.csn, eng3?.csnAtlastOverhaul)}</td>
                    <td>{subtractFC(eng4?.csn, eng4?.csnAtlastOverhaul)}</td>
                    <td>apu tlc</td>
                </tr>
                <tr className={s.row__bold}>
                    <td>Остаток межремонтного ресурса, цикл<br />CBO remaning, cycles</td>
                    <td>no data</td>
                    <td>{subtractFC(eng1?.cbo, subtractFC(eng1?.csn, eng1?.csnAtlastOverhaul))}</td>
                    <td>{subtractFC(eng2?.cbo, subtractFC(eng2?.csn, eng2?.csnAtlastOverhaul))}</td>
                    <td>{subtractFC(eng3?.cbo, subtractFC(eng3?.csn, eng3?.csnAtlastOverhaul))}</td>
                    <td>{subtractFC(eng4?.cbo, subtractFC(eng4?.csn, eng4?.csnAtlastOverhaul))}</td>
                    <td>apu tlc</td>
                </tr>
                <tr>
                    <td>Межремонтный срок службы до<br />Calendar between overhaul till</td>
                    <td>30-11-2022</td>
                    <td>{eng1?.pbo}</td>
                    <td>{eng2?.pbo}</td>
                    <td>{eng3?.pbo}</td>
                    <td>{eng4?.pbo}</td>
                    <td>apu tlp</td>
                </tr>
                <tr>
                    <td>Межремонтный срок службы, лет-мес<br />Calendar between overhaul, years-month</td>
                    <td>30-11-2022</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Cрок службы ППР, лет-мес<br />Сalendar since overhaul, years-month</td>
                    <td>30-11-2022</td>
                    <td>{`${Math.floor(+subtractDatesNowFrom(eng1?.lastOverhaulDate) / 365)} лет ${+subtractDatesNowFrom(eng1?.lastOverhaulDate) % 12} мес `}</td>
                    <td>{`${Math.floor(+subtractDatesNowFrom(eng2?.lastOverhaulDate) / 365)} лет ${+subtractDatesNowFrom(eng2?.lastOverhaulDate) % 12} мес `}</td>
                    <td>{`${Math.floor(+subtractDatesNowFrom(eng3?.lastOverhaulDate) / 365)} лет ${+subtractDatesNowFrom(eng3?.lastOverhaulDate) % 12} мес `}</td>
                    <td>{`${Math.floor(+subtractDatesNowFrom(eng4?.lastOverhaulDate) / 365)} лет ${+subtractDatesNowFrom(eng4?.lastOverhaulDate) % 12} мес `}</td>
                    <td>apu tlp</td>
                </tr>
                <tr className={s.row__bold}>
                    <td>Остаток межрем. срока службы, дней<br />Calendar between overhaul remaining, days</td>
                    <td>30-sdfsd</td>
                    <td>{subtractDatesFromNow(eng1?.pbo)}</td>
                    <td>{subtractDatesFromNow(eng2?.pbo)}</td>
                    <td>{subtractDatesFromNow(eng3?.pbo)}</td>
                    <td>{subtractDatesFromNow(eng4?.pbo)}</td>
                    <td>apu tlp</td>
                </tr>
            </table>
        </div >
    )
})



export default compose(withContainerBlur)(AircraftPrintForm);