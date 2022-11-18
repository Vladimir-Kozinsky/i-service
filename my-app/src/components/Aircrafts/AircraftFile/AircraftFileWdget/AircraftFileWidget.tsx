import { DragEvent, MouseEvent, useState } from "react";
import { IAircraft } from "../../../../store/reducers/aircraftReducer";
import Legs from "../../../Legs/Legs";
import InstallApu from "../../InstallApu/InstallApu";
import InstallEngine from "../../InstallEngine/InstallEngine";
import RemovalApu from "../../RemovalApu/RemovalApu";
import RemovalEngine from "../../RemovalEngine/RemovalEngine";
import s from "./AircraftFileWidget.module.scss"

type IAircraftFileWidgetProps = {
    text: string;
    img: string;
    aircraft: IAircraft;
    order?: string;
    x?: string;
    y?: string;
    onDragHandler: (e: DragEvent<HTMLDivElement>) => void;
    onDragOverHandler: (e: DragEvent<HTMLDivElement>) => void;
    onMouseUpHandler: (e: MouseEvent<HTMLDivElement>) => void;
    onMouseDownHandler: (e: MouseEvent<HTMLDivElement>) => void;
    onDragEndHandler: (e: DragEvent<HTMLDivElement>) => void;
    onDragStartHandler: (e: DragEvent<HTMLDivElement>) => void;
}

const AircraftFileWidget = ({ text, img, aircraft, order, onDragHandler, onDragOverHandler, onMouseUpHandler, onMouseDownHandler, onDragEndHandler, onDragStartHandler, x, y }: IAircraftFileWidgetProps) => {
    const [page, setPage] = useState(false);
    const choosePage = (text: string) => {
        switch (text) {
            case "LEGS":
                return <Legs setPage={setPage} aircraft={aircraft} toggle={page} />
            case "INSTALL ENGINE":
                return <InstallEngine setPage={setPage} aircraft={aircraft} toggle={page} />
            case "REMOVE ENGINE":
                return <RemovalEngine setPage={setPage} aircraft={aircraft} toggle={page} />
            case "INSTALL APU":
                return <InstallApu setPage={setPage} aircraft={aircraft} toggle={page} />
            case "REMOVE APU":
                return <RemovalApu setPage={setPage} aircraft={aircraft} toggle={page} />
            default:
                break;
        }
    }
    return (
        <>
            {choosePage(text)}
            <div className={s.widget} style={{ order: order }} draggable
                onDrag={onDragHandler}
                onDragOver={onDragOverHandler}
                onMouseUp={onMouseUpHandler}
                onMouseDown={onMouseDownHandler}
                onDragEnd={onDragEndHandler}
                onDragStart={onDragStartHandler}
                onClick={() => setPage(true)} >
                <h3>{text}</h3>
                <img src={img} className={text === "REMOVE ENGINE" ? s.widget__img__rem : s.widget__img} alt="icon" />
            </div>
        </>

    )
}

export default AircraftFileWidget;