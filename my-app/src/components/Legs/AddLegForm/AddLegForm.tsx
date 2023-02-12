import { Field, Form, Formik, FormikHelpers } from "formik";
import { compose } from "redux";
import Button from "../../../common/buttons/Button";
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur";
import s from "./AddLegForm.module.scss"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { addLeg } from "../../../store/reducers/aircraftReducer";
import withAircraftSuccMess from "../../HOC/withAircraftSuccMess";
import Input from "../../../common/inputs/Input";

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

export const calcTime = (depDate: string, startTime: string, endTime: string) => {
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
    let hh = Math.floor(totalTimemm / 60).toString();
    if (hh.length < 2) hh = `0${hh}`
    let mm = (totalTimemm % 60).toString();
    if (mm.length < 2) mm = `0${mm}`
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
                    if (!values.depDate) errors.depDate = 'Depature date is required';
                    if (!values.flightNumber) errors.flightNumber = 'Reg No is required';
                    if (!values.from) errors.from = 'Depature Airport is required';
                    if (!values.to) errors.to = 'Arrive airport is required';
                    if (!values.blockOff) errors.blockOff = 'Serial number is required';
                    if (!values.takeOff) errors.takeOff = 'Take Off time is required';
                    if (!values.landing) errors.landing = 'Landing time is required';
                    if (!values.blockOn) errors.blockOn = 'Block On time is required';
                    if (!values.flightTime) errors.flightTime = 'Flight time is required';
                    if (!values.blockTime) errors.blockTime = 'Block time is required';
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
                {({ errors, touched, setFieldValue, values, handleChange, handleSubmit }) => (
                    <Form className={s.addLeg__form} onSubmit={handleSubmit}>
                        <div className={s.addLeg__form__wrap}>
                            {[
                                {
                                    label: "Date", type: "date", id: "depDate", name: "depDate",
                                    value: values.depDate, error: errors.depDate,
                                    placeholder: "Choose Depature Date", onchange: (e: any) => onChangeTime(e, setFieldValue, values)
                                },
                                {
                                    label: "Flight No", type: "text", id: "flightNumber", name: "flightNumber",
                                    value: values.flightNumber, error: errors.flightNumber,
                                    placeholder: "Enter Flight No", onchange: handleChange
                                },
                                {
                                    label: "Depature airport", type: "text", id: "from", name: "from",
                                    value: values.from, error: errors.from,
                                    placeholder: "Enter depature airport", onchange: handleChange
                                },
                                {
                                    label: "Arrive airport", type: "text", id: "to", name: "to",
                                    value: values.to, error: errors.to,
                                    placeholder: "Enter arrive airport", onchange: handleChange
                                },
                                {
                                    label: "Block Off", type: "time", id: "blockOff", name: "blockOff",
                                    value: values.blockOff, error: errors.blockOff,
                                    placeholder: "Enter Block Off", onchange: (e: any) => onChangeTime(e, setFieldValue, values)
                                },
                                {
                                    label: "Take Off", type: "time", id: "takeOff", name: "takeOff",
                                    value: values.takeOff, error: errors.takeOff,
                                    placeholder: "Enter Take Off", onchange: (e: any) => onChangeTime(e, setFieldValue, values)
                                },
                                {
                                    label: "Landing", type: "time", id: "landing", name: "landing",
                                    value: values.landing, error: errors.landing,
                                    placeholder: "Enter Landing", onchange: (e: any) => onChangeTime(e, setFieldValue, values)
                                },
                                {
                                    label: "Block On", type: "time", id: "blockOn", name: "blockOn",
                                    value: values.blockOn, error: errors.blockOn,
                                    placeholder: "Enter blockOn", onchange: (e: any) => onChangeTime(e, setFieldValue, values)
                                },
                                {
                                    label: "Flight Time", type: "text", id: "flightTime", name: "flightTime",
                                    value: values.flightTime, error: errors.flightTime,
                                    placeholder: "00:00", disabled: true
                                },
                                {
                                    label: "Block Time", type: "text", id: "blockTime", name: "blockTime",
                                    value: values.blockTime, error: errors.blockTime,
                                    placeholder: "00:00", disabled: true
                                },
                                {
                                    label: "FH", type: "text", id: "fh", name: "fh",
                                    value: values.fh, error: errors.fh,
                                    placeholder: fh, disabled: true
                                },
                                {
                                    label: "FC", type: "text", id: "fc", name: "fc",
                                    value: (+fc + 1).toString(), error: errors.fc,
                                    placeholder: fc, disabled: true
                                },
                            ].map((field: any) => {
                                return (
                                    <div key={field.label} className={s.addLeg__form__link}>
                                        <label>{field.label}<span>*</span></label>
                                        <Field type={field.type} id={field.id} name={field.name} value={field.value} onChange={field.onchange} as={Input}
                                            disabled={field.disabled} placeholder={field.placeholder} error={field.error} min="0" />
                                    </div>
                                )
                            })
                            }
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

export default compose(withContainerBlur, withAircraftSuccMess)(AddLegForm);