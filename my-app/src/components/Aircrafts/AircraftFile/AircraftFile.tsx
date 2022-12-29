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
import { DragEvent, MouseEvent, useEffect, useState } from "react";
import { setEngine, subtractDatesFromNow, subtractFC, subtractFH } from "../../../utils/forms";
import AircraftPrintForm from "./AircraftPrintForm/AircraftPrintForm";
import DataBlock from "../../../common/DataBlock/DataBlock";

type IAircraftFileProps = {
    aircraft: IAircraft
    setArcraftFile: (isAircraftFile: boolean) => void
    setIsLoader: (isLoader: boolean) => void
}

const AircraftFile = ({ aircraft, setArcraftFile, setIsLoader }: IAircraftFileProps) => {
    const [aircraftData, setAircraftData] = useState(aircraft);
    const [printForm, setPrintForm] = useState<boolean>(false);
    const [currentWidget, setCurrentWidget] = useState<HTMLDivElement | null>(null);
    const [overWidget, setOverWidget] = useState<HTMLDivElement | null>(null);
    const [widgets, setWidgets] = useState([
        { pos: '1', text: 'LEGS', img: legsIcon },
        { pos: '2', text: 'INSTALL ENGINE', img: instEngIcon },
        { pos: '3', text: 'REMOVE ENGINE', img: remEngIcon },
        { pos: '4', text: 'INSTALL APU', img: apuIcon },
        { pos: '5', text: 'REMOVE APU', img: apuIcon },
        { pos: '6', text: '', img: '' },
        { pos: '7', text: '', img: '' },
        { pos: '8', text: '', img: '' },
        { pos: '9', text: '', img: '' },
        { pos: '10', text: '', img: '' },
        { pos: '11', text: '', img: '' },
        { pos: '12', text: '', img: '' },
        { pos: '13', text: '', img: '' },
        { pos: '14', text: '', img: '' },
        { pos: '15', text: '', img: '' },
        { pos: '16', text: '', img: '' },
        { pos: '17', text: '', img: '' },
        { pos: '18', text: '', img: '' },
        { pos: '19', text: '', img: '' },
        { pos: '20', text: '', img: '' },
    ])

    const onDragHandler = (e: DragEvent<HTMLDivElement>) => {

    }
    const onDragStartHandler = (e: DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const el = e.target as HTMLDivElement;
        if (el.parentElement?.id === 'widget__container') setCurrentWidget(el);
    }

    const onDragOverHandler = async (e: DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const el = e.target as HTMLDivElement;
        if (el.parentElement?.id === 'widget__container' && el.nodeName === 'DIV') setOverWidget(el);
    }

    const onMouseUpHandler = (e: MouseEvent<HTMLDivElement>) => {
    }

    const onMouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
    }

    const onDragEndHandler = async (e: MouseEvent<HTMLDivElement>) => {
        if (!currentWidget || !overWidget) return;
        await setWidgets((prevState) => {
            const newArr = prevState.map(item => {
                if (item.pos === currentWidget.style.order) {
                    return { ...item, pos: overWidget.style.order }
                }
                if (item.pos === overWidget.style.order) {
                    return { ...item, pos: currentWidget.style.order }
                }
                return item
            })
            return newArr
        })
    }

    useEffect(() => {
        setAircraftData(aircraft);
    }, [aircraft])
    return (
        <div className={s.aircraftFile} >
            <AircraftPrintForm setPrintForm={setPrintForm} aircraft={aircraft} toggle={printForm} />
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

                </div>
                <div id='widget__container' className={s.widget__container} >
                    {
                        widgets.map((widget, index) => {
                            if (widget.text) {
                                return <AircraftFileWidget key={widget.text}
                                    text={widget.text}
                                    img={widget.img}
                                    order={widget.pos}
                                    onDragStartHandler={onDragStartHandler}
                                    onDragEndHandler={onDragEndHandler}
                                    onMouseDownHandler={onMouseDownHandler}
                                    onMouseUpHandler={onMouseUpHandler}
                                    onDragHandler={onDragHandler}
                                    onDragOverHandler={onDragOverHandler}
                                    aircraft={aircraftData}
                                    setIsLoader={setIsLoader}
                                />
                            } else {
                                return (
                                    <div key={widget.text + index.toString()} className={s.emptyWidget} draggable style={{ order: widget.pos }}
                                        onDragStart={onDragStartHandler}
                                        onDragEnd={onDragEndHandler}
                                        onMouseDown={onMouseDownHandler}
                                        onMouseUp={onMouseUpHandler}
                                        onDrag={onDragHandler}
                                        onDragOver={onDragOverHandler}>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            <div className={s.buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => setArcraftFile(false)} />
                <Button text="Print Report" btnType="button" color="green" handler={() => setPrintForm(true)} />
            </div>

        </div >
    )
}

export default compose(withContainerBlur)(AircraftFile);