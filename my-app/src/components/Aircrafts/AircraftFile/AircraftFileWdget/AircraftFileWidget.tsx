import { useState } from "react";
import { IAircraft } from "../../../../store/reducers/aircraftReducer";
import Legs from "../../../Legs/Legs";
import InstallEngine from "../../InstallEngine/InstallEngine";
import RemovalEngine from "../../RemovalEngine/RemovalEngine";
import s from "./AircraftFileWidget.module.scss"

type IAircraftFileWidgetProps = {
    text: "LEGS" | "INSTALL ENGINE" | "REMOVE ENGINE";
    img: string;
    aircraft: IAircraft;
}

const AircraftFileWidget = ({ text, img, aircraft }: IAircraftFileWidgetProps) => {
    const [page, setPage] = useState(false);
    const choosePage = (text: string) => {
        switch (text) {
            case "LEGS":
                return <Legs setPage={setPage} aircraft={aircraft} />
            case "INSTALL ENGINE":
                return <InstallEngine setPage={setPage} aircraft={aircraft} />
            case "REMOVE ENGINE":
                return <RemovalEngine setPage={setPage} aircraft={aircraft} />
            default:
                break;
        }
    }

    return (
        <>
            {page && choosePage(text)}
            <div className={s.widget} onClick={() => setPage(true)} >
                <h3>{text}</h3>
                <img src={img} className={text === "REMOVE ENGINE" ? s.widget__img__rem : s.widget__img} alt="icon" />
            </div>
        </>

    )
}

export default AircraftFileWidget;