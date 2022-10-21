import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { compose } from "redux";
import Button from "../../../../common/buttons/Button";
import { IAircraft } from "../../../../store/reducers/aircraftReducer";
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
    return (
        <div className={s.componentToPrint} ref={ref}>
            ComponentTo
        </div>
    )
})



export default compose(withContainerBlur)(AircraftPrintForm);