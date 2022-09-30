import { useState } from "react";
import Legs from "../../../Legs/Legs";
import s from "./AircraftFileWidget.module.scss"

type IAircraftFileWidgetProps = {
    text: "LEGS";
}

const AircraftFileWidget = ({ text }: IAircraftFileWidgetProps) => {
    const [page, setPage] = useState(false);
    const choosePage = (text: string) => {
        switch (text) {
            case "LEGS":
                return <Legs />
            default:
                break;
        }
    }

    return (
        <>
            {page && choosePage(text)}
            <div className={s.widget} onClick={() => setPage(true)} >
                <h3>{text}</h3>
            </div>
        </>

    )
}

export default AircraftFileWidget;