import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { compose } from "redux";
import Button from "../../../common/buttons/Button";
import Input from "../../../common/Input";
import { IAircraft, removeApu } from "../../../store/reducers/aircraftReducer";
import { AppDispatch } from "../../../store/store";
import withSuccessMessage from "../../HOC/messageHoc";
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur";
import s from "./RemovalApu.module.scss";

type RemovalApuProps = {
    setPage: (page: boolean) => void;
    aircraft: IAircraft;
}

export type RemApuFormDataType = {
    msn: string;
    apuMSN: string;
}

const RemovalApu: React.FC<RemovalApuProps> = ({ setPage, aircraft }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className={s.removalEngine} >
            <h2 className={s.removalEngine__header}>Engine Removal</h2>
            <Formik
                initialValues={{
                    msn: '',
                    apuMSN: ''
                }}
                validate={values => {
                    interface IErrors {
                        msn?: string | null;
                        apuMSN?: string | null;
                    }
                    const errors: IErrors = {};
                    if (!aircraft.msn) errors.msn = 'Aircraft MSN is required';
                    if (!aircraft.apu?.msn) errors.apuMSN = 'Apu MSN is required';
                    return errors;
                }}
                onSubmit={(
                    values: RemApuFormDataType,
                    { setSubmitting }: FormikHelpers<any>
                ) => {
                    values.msn = aircraft.msn;
                    if (aircraft && aircraft.apu?.msn) {
                        values.apuMSN = aircraft.apu?.msn;
                    }
                    console.log(values)
                    dispatch(removeApu(values));
                }}
            >
                {({ errors, touched }) => (
                    <Form className={s.removalEngine__form}>
                        <div className={s.removalEngine__form__wrap}>
                            <div className={s.removalEngine__form__link}>
                                <label>Apu MSN:<span>*</span></label>
                                <Input type="text" name='msn' id="msn" placeholder='MSN' value={aircraft.apu?.msn ? aircraft.apu?.msn : ''} disabled />
                            </div>
                        </div>
                        <div className={s.buttons} >
                            <Button text="Back" btnType="button" color="white" handler={() => setPage(false)} />
                            <Button text="Remove" btnType="submit" color="green" />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default compose(withContainerBlur, withSuccessMessage)(RemovalApu);