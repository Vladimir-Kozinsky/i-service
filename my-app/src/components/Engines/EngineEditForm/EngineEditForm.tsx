import React, { useState } from "react";
import s from "./EngineEditForm.module.scss";
import { IEngine } from "../../../types/types"
import { Field, Form, Formik, FormikHelpers } from "formik";
import Button from "../../../common/buttons/Button";
import Input from "../../../common/inputs/Input";
import { compose } from "redux";
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { ActionMeta } from "react-select";
import FormSelect from "../../../common/Select/Select";
import { checkFCFormat, checkFHFormat } from "../../../utils/forms";
import { updateEngine } from "../../../store/reducers/engineReducer";

interface IEngineEditForm {
    engine: any;
    showEngineEditForm: (isForm: boolean) => void
}

interface IEngineFormValues {
    _id: string;
    type?: string;
    msn?: string;
    manufDate?: string;
    tsn?: string;
    csn?: string;
    engTsn: string;
    engCsn: string;
    overhaulNum?: string;
    lastOverhaulDate?: string;
    tsnAtlastOverhaul?: string;
    csnAtlastOverhaul?: string;
    tlp?: string;
    tlt?: string;
    tlc?: string;
    pbo?: string;
    tbo?: string;
    cbo?: string;
}

const customStyles = {
    option: (provided: any) => ({
        ...provided,
        borderBottom: '1px dotted pink',
    }),
    control: (provided: any) => ({
        ...provided,
        width: '232px',
        height: '38px',
        border: '#0A2640 2px solid',
        borderRadius: '24px',
        textAlign: 'center'
    }),
    container: (provided: any) => ({
        ...provided,
    })
}

interface IOption {
    value: string | null;
    label: string | null;
}

const options: IOption[] = [
    { value: 'D-30KP', label: 'D-30KP' },
    { value: 'D-30KP-2', label: 'D-30KP-2' },
    { value: 'CFM56', label: 'CFM56' },
]

const EngineEditForm: React.FC<IEngineEditForm> = ({ engine, showEngineEditForm }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedOption, setSelectedOption] = useState<string | null>(engine.type);

    const onChange = (option: IOption | null, actionMeta: ActionMeta<IOption>) => {
        if (option?.value) {
            setSelectedOption(option.value);
        }
    }

    return (
        <div className={s.engineForm}>
            <h3 className={s.engineForm__header}>Edit an Aircraft</h3>
            <Formik
                initialValues={{
                    _id: engine._id,
                    type: engine.type,
                    msn: engine.msn,
                    manufDate: engine.manufDate,
                    tsn: engine.tsn,
                    csn: engine.csn,
                    engTsn: engine.engTsn,
                    engCsn: engine.engCsn,
                    overhaulNum: engine.overhaulNum,
                    lastOverhaulDate: engine.lastOverhaulDate,
                    tsnAtlastOverhaul: engine.tsnAtlastOverhaul,
                    csnAtlastOverhaul: engine.csnAtlastOverhaul,
                    tlp: engine.tlp,
                    tlt: engine.tlt,
                    tlc: engine.tlc,
                    pbo: engine.pbo,
                    tbo: engine.tbo,
                    cbo: engine.cbo,
                }}
                validate={values => {
                    interface IErrors {
                        type?: string;
                        msn?: string;
                        manufDate?: string;
                        tsn?: string;
                        csn?: string;
                        engTsn?: string;
                        engCsn?: string;
                        overhaulNum?: string;
                        lastOverhaulDate?: string;
                        tsnAtlastOverhaul?: string;
                        csnAtlastOverhaul?: string;
                        tlp?: string;
                        tlt?: string;
                        tlc?: string;
                        pbo?: string;
                        tbo?: string;
                        cbo?: string;
                    }
                    const errors: IErrors = {};
                    if (!selectedOption || selectedOption === 'error') errors.type = 'Type is required';
                    if (!values.msn) errors.msn = 'MSN is required';
                    if (!values.manufDate) errors.manufDate = 'Manufacture Date is required';
                    if (!values.tsn) errors.tsn = 'Initial TSN is required';
                    if (!checkFHFormat(values.tsn)) errors.tsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.csn) errors.csn = 'Initial CSN is required';
                    if (!checkFCFormat(values.csn)) errors.csn = 'Invalid format, the format should be like "123456"';
                    if (!values.engTsn) errors.engTsn = 'TSN is required';
                    if (!checkFHFormat(values.engTsn)) errors.engTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.engCsn) errors.engCsn = 'CSN si required';
                    if (!checkFCFormat(values.engCsn)) errors.engCsn = 'Invalid format, the format should be like "123456"';
                    if (values.overhaulNum > 0 && !values.lastOverhaulDate) errors.lastOverhaulDate = 'Last overhaul Date is required';
                    if (values.overhaulNum > 0 && !values.tsnAtlastOverhaul) errors.tsnAtlastOverhaul = 'FH at last overhaul is required';
                    if (values.overhaulNum > 0 && !checkFHFormat(values.tsnAtlastOverhaul)) errors.tsnAtlastOverhaul = 'Invalid format, the format should be like "123456:22"';
                    if (values.overhaulNum > 0 && !values.csnAtlastOverhaul) errors.csnAtlastOverhaul = 'FC at last overhaul is required';
                    if (!values.tlp) errors.tlp = 'Total Life Period is required';
                    if (!values.tlt) errors.tlt = 'Total Life Time is required';
                    if (!checkFHFormat(values.tlt)) errors.tlt = 'Invalid format, the format should be like "123456:22"';
                    if (!values.tlc) errors.tlc = 'Total Life Cycles is required';
                    if (!checkFCFormat(values.tlc)) errors.tlc = 'Invalid format, the format should be like "123456"';
                    if (!values.pbo) errors.pbo = 'Period between overhaul is required';
                    if (!values.tbo) errors.tbo = 'Time between overhaul is required';
                    if (!checkFHFormat(values.tbo)) errors.tbo = 'Invalid format, the format should be like "123456:22"';
                    if (!values.cbo) errors.cbo = 'Cycles between overhaul is required';
                    if (!checkFCFormat(values.cbo)) errors.cbo = 'Invalid format, the format should be like "123456"';
                    return errors;
                }}
                onSubmit={(
                    values: IEngineFormValues,
                    { setSubmitting }: FormikHelpers<any>
                ) => {
                    if (selectedOption) values.type = selectedOption;
                    dispatch(updateEngine(values));
                }}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form className={s.aircraft__form}>
                        <div className={s.aircraft__form__wrap}>
                            {/* General */}
                            <div className={s.engineForm__wrap__block}>
                                <h3 className={s.engineForm__wrap__header}>General</h3>

                                <div className={s.aircraft__form__link}>
                                    {/* {errors.type ? <ErrorMessage message={errors.type} /> : null} */}
                                    <label>Type <span>*</span></label>
                                    <Field id='type' name='type' type='select' value={values.type} setSelectedOption={setSelectedOption} onChange={onChange} as={FormSelect}
                                        placeholder='type' error={selectedOption} options={options} customStyles={customStyles} defaultValue={{ value: selectedOption, label: selectedOption }} />
                                </div>
                                {[
                                    {
                                        label: "Manufacture Date", type: "date", id: "manufDate", name: "manufDate",
                                        value: values.manufDate, error: errors.manufDate
                                    },
                                    {
                                        label: "MSN", type: "text", id: "msn", name: "msn",
                                        value: values.msn, error: errors.msn
                                    },
                                    {
                                        label: "Initial TSN", type: "text", id: "tsn", name: "tsn",
                                        value: values.tsn, error: errors.tsn
                                    },
                                    {
                                        label: "Initial FC", type: "text", id: "csn", name: "csn",
                                        value: values.csn, error: errors.csn
                                    },
                                    {
                                        label: "FH", type: "text", id: "engTsn", name: "engTsn",
                                        value: values.engTsn, error: errors.engTsn
                                    },
                                    {
                                        label: "FC", type: "text", id: "engTsn", name: "engTsn",
                                        value: values.engTsn, error: errors.engCsn
                                    }
                                ].map((field: any) => {
                                    return (
                                        <div key={field.label} className={s.engine__form__link}>
                                            <label>{field.label}<span>*</span></label>
                                            <Field type={field.type} id={field.id} name={field.name} value={field.value} onChange={handleChange} as={Input}
                                                disabled={field.disabled} error={field.error} min="0" />
                                        </div>
                                    )
                                })
                                }
                            </div>

                            {/* Overhaul */}
                            <div className={s.engineForm__wrap__block}>
                                <h3 className={s.engineForm__wrap__header}>Overhaul</h3>
                                {[
                                    {
                                        label: "Number of Overhaul", type: "number", id: "overhaulNum",
                                        name: "overhaulNum", value: values.overhaulNum, error: errors.overhaulNum
                                    },
                                    {
                                        label: "Last Overhaul Date", type: "date", id: "lastOverhaulDate",
                                        name: "lastOverhaulDate", value: values.lastOverhaulDate, error: errors.lastOverhaulDate, disabled: values.overhaulNum === 0 ? true : false
                                    },
                                    {
                                        label: "FH at Last Overhaul", type: "text", id: "tsnAtlastOverhaul",
                                        name: "tsnAtlastOverhaul", value: values.tsnAtlastOverhaul, error: errors.tsnAtlastOverhaul, disabled: values.overhaulNum === 0 ? true : false
                                    },
                                    {
                                        label: "FC at Last Overhaul", type: "text", id: "csnAtlastOverhaul",
                                        name: "csnAtlastOverhaul", value: values.csnAtlastOverhaul, error: errors.csnAtlastOverhaul, disabled: values.overhaulNum === 0 ? true : false
                                    },
                                ].map((field: any) => {
                                    return (
                                        <div key={field.label} className={s.engine__form__link}>
                                            <label>{field.label}<span>*</span></label>
                                            <Field type={field.type} id={field.id} name={field.name} value={field.value} onChange={handleChange} as={Input}
                                                disabled={field.disabled} error={field.error} min="0" />
                                        </div>
                                    )
                                })
                                }
                            </div>
                            {/* Limits */}
                            <div className={s.engineForm__wrap__block}>
                                <h3 className={s.engineForm__wrap__header}>Limits</h3>
                                {[
                                    {
                                        label: "Total Life Period", type: "date", id: "tlp",
                                        name: "tlp", value: values.tlp, error: errors.tlp
                                    },
                                    {
                                        label: "Total Life Time", type: "text", id: "tlt",
                                        name: "tlt", value: values.tlt, error: errors.tlt
                                    },
                                    {
                                        label: "Total Life Cycles", type: "text", id: "tlc",
                                        name: "tlc", value: values.tlc, error: errors.tlc
                                    },
                                    {
                                        label: "Period Between Overhaul", type: "text", id: "pbo",
                                        name: "pbo", value: values.pbo, error: errors.pbo
                                    },
                                    {
                                        label: "Time Between Overhaul", type: "text", id: "tbo",
                                        name: "tbo", value: values.tbo, error: errors.tbo
                                    },
                                    {
                                        label: "Cycles Between Overhaul", type: "text", id: "cbo",
                                        name: "cbo", value: values.cbo, error: errors.cbo
                                    },
                                ].map((field: any) => {
                                    return (
                                        <div key={field.label} className={s.aircraft__form__link}>
                                            <label>{field.label}<span>*</span></label>
                                            <Field type={field.type} id={field.id} name={field.name} value={field.value} onChange={handleChange} as={Input}
                                                disabled={field.disabled} error={field.error} min="0" />
                                        </div>
                                    )
                                })
                                }

                            </div>
                        </div>
                        <div className={s.engine__form__btns} >
                            <Button text="Cancel" color="white" btnType="button" handler={() => showEngineEditForm(false)} />
                            <Button text="Add" color="green" btnType="submit" />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default compose(withContainerBlur)(EngineEditForm);