import { Field, Form, Formik, FormikHelpers } from "formik";
import { compose } from "redux";
import Button from "../../../common/buttons/Button";
import Input from "../../../common/Input";
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur";
import s from "./AddLegForm.module.scss"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { addLeg } from "../../../store/reducers/aircraftReducer";

interface ILeg {
    depDate: string;
    flightNumber: string;
    from: string;
    to: string;
    blockOff: string;
    takeOff: string;
    landing: string;
    blockOn: string;
    flightTime: string;
    blockTime: string;
    fh: string;
    fc: string;
}

type AddLegFormProps = {
    setAddLegForm: (addLegForm: boolean) => void;
    msn: string;
    fh: string;
    fc: string;
}

const calcTime = (depDate: string, startTime: string, endTime: string) => {
    if (!depDate || !startTime || !endTime) return '00:00';
    const startYear = +depDate.split('-')[0];
    const startMonth = +depDate.split('-')[1];
    const startDate = +depDate.split('-')[2];
    const starthh = +startTime.split(':')[0];
    const startmm = +startTime.split(':')[1];
    const start = new Date() as any;
    start.setUTCFullYear(startYear, startMonth, startDate);
    start.setUTCHours(starthh, startmm);

    const endYear = +depDate.split('-')[0];
    const endMonth = +depDate.split('-')[1];
    const endDate = +depDate.split('-')[2];
    const endhh = +endTime.split(':')[0];
    const endmm = +endTime.split(':')[1];
    const end = new Date() as any;
    end.setUTCFullYear(endYear, endMonth, endDate);
    end.setUTCHours(endhh, endmm);

    if (start > end) end.setUTCDate(endDate + 1);
    const totalTimemm = Math.abs((end - start) / 1000 / 60);
    const hh = Math.floor(totalTimemm / 60);
    const mm = totalTimemm % 60;
    return `${hh}:${mm}`
}

const AddLegForm = ({ setAddLegForm, msn, fh, fc }: AddLegFormProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const onChangeTime = (e: any, setFieldValue: any, values: any) => {
        const takeOff = e.target.id === 'takeOff' ? e.target.value : values.takeOff;
        const landing = e.target.id === 'landing' ? e.target.value : values.landing;
        const blockOff = e.target.id === 'blockOff' ? e.target.value : values.blockOff;
        const blockOn = e.target.id === 'blockOn' ? e.target.value : values.blockOn;
        const date = e.target.id === 'depDate' ? e.target.value : values.depDate;
        const flightTime = calcTime(date, takeOff, landing)
        setFieldValue(`${e.target.id}`, e.target.value);
        setFieldValue('flightTime', flightTime);
        setFieldValue('blockTime', calcTime(date, blockOff, blockOn));
        if (e.target.id === 'takeOff' || e.target.id === 'landing') onChangeFH(setFieldValue, flightTime)
    }

    const onChangeFH = (setFieldValue: any, flightTime: any) => {
        const currentTimemm = (+fh.split(':')[0] * 60) + (+fh.split(':')[1]);
        const newTimemm = (+flightTime.split(':')[0] * 60) + (+flightTime.split(':')[1]);
        const totalTimemm = currentTimemm + newTimemm;
        const hh = Math.floor(totalTimemm / 60);
        const mm = totalTimemm % 60;
        setFieldValue('fh', `${hh}:${mm}`);
        setFieldValue('fc', `${+fc + 1}`);
    }

    return (
        <div className={s.addLeg} >
            <h3 className={s.addLeg__header}>Add a leg</h3>
            <Formik
                initialValues={{
                    depDate: '',
                    flightNumber: '',
                    from: '',
                    to: '',
                    blockOff: '',
                    takeOff: '',
                    landing: '',
                    blockOn: '',
                    flightTime: '',
                    blockTime: '',
                    fh: fh,
                    fc: fc,
                }}
                validate={values => {
                    interface IErrors {
                        depDate?: string;
                        flightNumber?: string;
                        from?: string;
                        to?: string;
                        blockOff?: string;
                        takeOff?: string;
                        landing?: string;
                        blockOn?: string;
                        flightTime?: string;
                        blockTime?: string;
                    }
                    const errors: IErrors = {};

                    if (!values.depDate) errors.depDate = 'Date is required';
                    if (!values.flightNumber) errors.flightNumber = 'Reg No is required';
                    if (!values.from) errors.from = 'FH is required';
                    if (!values.to) errors.to = 'FC si required';
                    if (!values.blockOff) errors.blockOff = 'Serial number is required';
                    if (!values.blockOn) errors.blockOn = 'Serial number is required';
                    // if (!values.flightTime) errors.flightTime = 'Serial number is required';
                    if (!values.blockTime) errors.blockTime = 'Serial number is required';
                    return errors;
                }}
                onSubmit={async (
                    values: ILeg,
                    { setSubmitting }: FormikHelpers<any>
                ) => {
                    const leg = {
                        depDate: values.depDate,
                        flightNumber: values.flightNumber,
                        from: values.from,
                        to: values.to,
                        blockOff: values.blockOff,
                        takeOff: values.takeOff,
                        landing: values.landing,
                        blockOn: values.blockOn,
                        flightTime: values.flightTime,
                        blockTime: values.blockTime,
                        fh: values.fh,
                        fc: values.fc
                    }
                    dispatch(addLeg({ leg, msn }))
                }}
            >
                {({ errors, touched, setFieldValue, values, handleSubmit }) => (
                    <Form className={s.addLeg__form} onSubmit={handleSubmit}>
                        <div className={s.addLeg__form__wrap}>
                            <div className={s.addLeg__form__link}>
                                <label>Date <span>*</span></label>
                                <Field
                                    type="date"
                                    id="depDate"
                                    name="depDate"
                                    placeholder="Enter Date"
                                    onChange={(e: any) => onChangeTime(e, setFieldValue, values)} />
                            </div>
                            <div className={s.addLeg__form__link}>
                                <label>Flight No <span>*</span></label>
                                <Input
                                    type="text"
                                    id="flightNumber"
                                    name="flightNumber"
                                    placeholder="Enter Flight No" />
                            </div>
                            <div className={s.addLeg__form__link}>
                                <label>Depature airport <span>*</span></label>
                                <Input
                                    type="text"
                                    id="from"
                                    name="from"
                                    placeholder="Enter depature airport" />
                            </div>
                            <div className={s.addLeg__form__link}>
                                <label>Arrive airport <span>*</span></label>
                                <Input
                                    type="text"
                                    id="to"
                                    name="to"
                                    placeholder="Enter arrive airport" />
                            </div>
                            <div className={s.addLeg__form__link}>
                                <label>Block Off <span>*</span></label>
                                <Field
                                    type="time"
                                    id="blockOff"
                                    name="blockOff"
                                    onChange={(e: any) => onChangeTime(e, setFieldValue, values)}
                                />
                            </div>
                            <div className={s.addLeg__form__link}>
                                <label>Take Off <span>*</span></label>
                                <Field
                                    type="time"
                                    id="takeOff"
                                    name="takeOff"
                                    onChange={(e: any) => onChangeTime(e, setFieldValue, values)} />
                            </div>
                            <div className={s.addLeg__form__link}>
                                <label>Landing <span>*</span></label>
                                <Field
                                    type="time"
                                    id="landing"
                                    name="landing"
                                    onChange={(e: any) => onChangeTime(e, setFieldValue, values)} />
                            </div>
                            <div className={s.addLeg__form__link}>
                                <label>Block On <span>*</span></label>
                                <Field
                                    type="time"
                                    id="blockOn"
                                    name="blockOn"
                                    onChange={(e: any) => onChangeTime(e, setFieldValue, values)}
                                />
                            </div>
                            <div className={s.addLeg__form__link}>
                                <label>Flight Time <span>*</span></label>
                                <Input
                                    type="text"
                                    id="flightTime" name="flightTime"
                                    placeholder='00:00'
                                    value={values.flightTime}
                                    disabled={true}
                                />
                            </div>
                            <div className={s.addLeg__form__link}>
                                <label>Block Time<span>*</span></label>
                                <Field
                                    type="text"
                                    id="blockTime"
                                    name="blockTime"
                                    placeholder='00:00'
                                    value={values.blockTime}
                                    disabled={true}
                                />
                            </div>
                            <div className={s.addLeg__form__link}>
                                <label>FH<span>*</span></label>
                                <Field
                                    type="text"
                                    id="fh"
                                    name="fh"
                                    placeholder={fh}
                                    value={values.fh}
                                />
                            </div>
                            <div className={s.addLeg__form__link}>
                                <label>FC<span>*</span></label>
                                <Input
                                    type="text"
                                    id="fc"
                                    name="fc"
                                    value={(+fc + 1).toString()}
                                    placeholder={fc} />
                            </div>
                        </div>
                        <div className={s.addLeg__btns} >
                            <Button text="Cancel" color="white" btnType="button" handler={() => setAddLegForm(false)} />
                            <Button text="Add" color="green" btnType="submit" />
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    )
}

export default compose(withContainerBlur)(AddLegForm);