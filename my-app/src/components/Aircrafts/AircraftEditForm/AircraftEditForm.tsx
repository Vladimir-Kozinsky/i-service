import { Field, Form, Formik, FormikHelpers } from 'formik';
import Button from '../../../common/buttons/Button';
import React, { useState } from 'react'
import Select, { ActionMeta } from 'react-select'
import s from './AircraftEditForm.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { addAircraft, deleteAircraft, IAircraft, updateAircraft } from '../../../store/reducers/aircraftReducer';
import { compose } from 'redux';
import withSuccessMessage from '../../HOC/messageHoc';
import { withContainerBlur } from '../../HOC/withContainerBlur/withContainerBlur';
import { checkFCFormat, checkFHFormat } from '../../../utils/forms';
import Input from '../../../common/inputs/Input';
import FormSelect from '../../../common/Select/Select';
import DeleteMessage from '../../../common/messages/DeleteMessage/DeleteMessage';

export interface IAircraftFormValues {
    type: string;
    msn: string;
    manufDate: string;
    regNum: string;
    initFh: string;
    initFc: string;
    fh: string;
    fc: string;
    overhaulNum: number;
    lastOverhaulDate: string;
    tsnAtlastOverhaul: string;
    csnAtlastOverhaul: string;
    tlp: string;
    tlt: string;
    tlc: string;
    pbo: string;
    tbo: string;
    cbo: string;
}

interface IOption {
    value: string | null;
    label: string | null;
}
const options = [
    { value: 'IL-76T', label: 'IL-76T' },
    { value: 'IL-76TD', label: 'IL-76TD' },
    { value: 'Boeing 737-300', label: 'Boeing 737-300' },
    { value: 'Boeing 737-400', label: 'Boeing 737-400' },
    { value: 'Boeing 737-800', label: 'Boeing 737-800' },
    { value: 'Boeing 747-200', label: 'Boeing 747-200' },
    { value: 'Boeing 747-400', label: 'Boeing 747-400' },
    { value: 'Boeing 757-200', label: 'Boeing 757-200' }
]

interface IEditFormProps {
    aircraft: IAircraft
    showArcraftEditForm: (isForm: boolean) => void
}
const AircraftEditForm = ({ aircraft, showArcraftEditForm }: IEditFormProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedOption, setSelectedOption] = useState<string | null>(aircraft.type);
    const [delMess, setDelMess] = useState(false);

    const onChange = (option: IOption | null, actionMeta: ActionMeta<IOption>) => {
        if (option?.value) {
            setSelectedOption(option.value);
        }
    }

    const delAircraft = (aircraftId: string | undefined) => {
        if (aircraftId) dispatch(deleteAircraft(aircraftId))
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
    return (
        <div className={s.aircraftForm}>
            <DeleteMessage handleBack={() => setDelMess(false)}
                handleSubmit={() => delAircraft(aircraft._id)} toggle={delMess}
                header='Would you like to delete this Aircraft?'
                text='The Aircraft will be permanently deleted' />
            <h3 className={s.aircraftForm__header}>Edit an Aircraft</h3>
            <Formik
                initialValues={{
                    _id: aircraft._id,
                    type: aircraft.type,
                    msn: aircraft.msn,
                    manufDate: aircraft.manufDate,
                    regNum: aircraft.regNum,
                    initFh: aircraft.initFh,
                    initFc: aircraft.initFc,
                    fh: aircraft.fh,
                    fc: aircraft.fc,
                    overhaulNum: aircraft.overhaulNum,
                    lastOverhaulDate: aircraft.lastOverhaulDate,
                    tsnAtlastOverhaul: aircraft.tsnAtlastOverhaul,
                    csnAtlastOverhaul: aircraft.csnAtlastOverhaul,
                    tlp: aircraft.tlp,
                    tlt: aircraft.tlt,
                    tlc: aircraft.tlc,
                    pbo: aircraft.pbo,
                    tbo: aircraft.tbo,
                    cbo: aircraft.cbo,
                }}
                validate={values => {
                    interface IErrors {
                        type?: string;
                        msn?: string;
                        manufDate?: string;
                        regNum?: string;
                        initFh?: string;
                        initFc?: string;
                        fh?: string;
                        fc?: string;
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
                    if (!values.regNum) errors.regNum = 'Reg No is required';
                    if (!values.initFh) errors.initFh = 'Initial FH is required';
                    if (!checkFHFormat(values.initFh)) errors.initFh = 'Invalid format, the format should be like "123456:22"';
                    if (!values.initFc) errors.initFc = 'Initial FC si required';
                    if (!checkFCFormat(values.initFc)) errors.initFc = 'Invalid format, the format should be like "123456"';
                    if (!values.fh) errors.fh = 'FH is required';
                    if (!checkFHFormat(values.fh)) errors.fh = 'Invalid format, the format should be like "123456:22"';
                    if (!values.fc) errors.fc = 'FC si required';
                    if (!checkFCFormat(values.fc)) errors.fc = 'Invalid format, the format should be like "123456"';
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
                    values: IAircraftFormValues,
                    { setSubmitting }: FormikHelpers<any>
                ) => {
                    if (selectedOption) values.type = selectedOption;
                    dispatch(updateAircraft(values));
                }}
            >
                {({ errors, touched, values, handleChange }) => (
                    <Form className={s.aircraft__form}>
                        <div className={s.aircraft__form__wrap}>
                            {/* General */}
                            <div className={s.aircraftForm__wrap__block}>
                                <h3 className={s.aircraftForm__wrap__header}>General</h3>

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
                                        label: "Reg.", type: "text", id: "regNum", name: "regNum",
                                        value: values.regNum, error: errors.regNum
                                    },
                                    {
                                        label: "Initial FH", type: "text", id: "initFh", name: "initFh",
                                        value: values.initFh, error: errors.initFh
                                    },
                                    {
                                        label: "Initial FC", type: "text", id: "initFc", name: "initFc",
                                        value: values.initFc, error: errors.initFc
                                    },
                                    {
                                        label: "FH", type: "text", id: "fh", name: "fh",
                                        value: values.fh, error: errors.fh
                                    },
                                    {
                                        label: "FC", type: "text", id: "fc", name: "fc",
                                        value: values.fc, error: errors.fc
                                    }
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

                            {/* Overhaul */}
                            <div className={s.aircraftForm__wrap__block}>
                                <h3 className={s.aircraftForm__wrap__header}>Overhaul</h3>
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
                                        <div key={field.label} className={s.aircraft__form__link}>
                                            <label>{field.label}<span>*</span></label>
                                            <Field type={field.type} id={field.id} name={field.name} value={field.value} onChange={handleChange} as={Input}
                                                disabled={field.disabled} error={field.error} min="0" />
                                        </div>
                                    )
                                })
                                }
                            </div>
                            {/* Limits */}
                            <div className={s.aircraftForm__wrap__block}>
                                <h3 className={s.aircraftForm__wrap__header}>Limits</h3>
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
                        <div className={s.aircraft__form__btns} >
                            <Button text="Cancel" color="white" btnType="button" handler={() => showArcraftEditForm(false)} />
                            <Button text="Add" color="green" btnType="submit" />
                            <Button text="Delete" color="red" btnType="button" handler={() => setDelMess(true)} />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default compose(withContainerBlur, withSuccessMessage)(AircraftEditForm);