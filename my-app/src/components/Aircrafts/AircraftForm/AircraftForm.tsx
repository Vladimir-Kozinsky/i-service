import { Field, Form, Formik, FormikHelpers } from 'formik';
import Button from '../../../common/buttons/Button';
import Input from '../../../common/Input';
import ErrorMessage from '../../../common/messages/ErrorMessage';
import React, { useState } from 'react'
import Select, { ActionMeta } from 'react-select'
import s from './AircraftForm.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { addAircraft } from '../../../store/reducers/aircraftReducer';
import { compose } from 'redux';
import withSuccessMessage from '../../HOC/messageHoc';
import { withContainerBlur } from '../../HOC/withContainerBlur/withContainerBlur';
import { checkFHFormat } from '../../../utils/forms';

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
interface IAddFormProps {
    setAddForm: (isForm: boolean) => void
}
const AircraftForm = ({ setAddForm }: IAddFormProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const onChange = (option: IOption | null, actionMeta: ActionMeta<IOption>) => {
        if (option?.value) {
            setSelectedOption(option.value);
        }
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
    }
    return (
        <div className={s.aircraftForm}>
            <h3 className={s.aircraftForm__header}>Add an Aircraft</h3>
            <Formik
                initialValues={{
                    type: '',
                    msn: '',
                    manufDate: '',
                    regNum: '',
                    initFh: '',
                    initFc: '',
                    fh: '',
                    fc: '',
                    overhaulNum: 0,
                    lastOverhaulDate: '',
                    tsnAtlastOverhaul: '',
                    csnAtlastOverhaul: '',
                    tlp: '',
                    tlt: '',
                    tlc: '',
                    pbo: '',
                    tbo: '',
                    cbo: '',
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

                    if (!selectedOption) errors.type = 'Type is required';
                    if (!values.msn) errors.msn = 'MSN is required';
                    if (!values.manufDate) errors.manufDate = 'Manufacture Date is required';
                    if (!values.regNum) errors.regNum = 'Reg No is required';
                    if (!values.initFh) errors.initFh = 'Initial FH is required';
                    if (!checkFHFormat(values.initFh)) errors.initFh = 'Invalid format, the format should be like "123456:22"';
                    if (!values.initFc) errors.initFc = 'FC si required';
                    if (!values.fh) errors.fh = 'FH is required';
                    if (!checkFHFormat(values.fh)) errors.fh = 'Invalid format, the format should be like "123456:22"';
                    if (!values.fc) errors.fc = 'FC si required';
                    if (values.overhaulNum > 0 && !values.lastOverhaulDate) errors.lastOverhaulDate = 'Last overhaul Date is required';
                    if (values.overhaulNum > 0 && !values.tsnAtlastOverhaul) errors.tsnAtlastOverhaul = 'FH at last overhaul is required';
                    if (values.overhaulNum > 0 && !checkFHFormat(values.tsnAtlastOverhaul)) errors.tsnAtlastOverhaul = 'Invalid format, the format should be like "123456:22"';
                    if (values.overhaulNum > 0 && !values.csnAtlastOverhaul) errors.csnAtlastOverhaul = 'FC at last overhaul is required';
                    if (!values.tlp) errors.tlp = 'Total Life Period is required';
                    if (!values.tlt) errors.tlt = 'Total Life Time is required';
                    if (!checkFHFormat(values.tlt)) errors.tlt = 'Invalid format, the format should be like "123456:22"';
                    if (!values.tlc) errors.tlc = 'Total Life Cycles is required';
                    if (!values.pbo) errors.pbo = 'Period between overhaul is required';
                    if (!values.tbo) errors.tbo = 'Time between overhaul is required';
                    if (!checkFHFormat(values.tbo)) errors.tbo = 'Invalid format, the format should be like "123456:22"';
                    if (!values.cbo) errors.cbo = 'Cycles between overhaul is required';
                    return errors;
                }}
                onSubmit={(
                    values: IAircraftFormValues,
                    { setSubmitting }: FormikHelpers<any>
                ) => {
                    if (selectedOption) values.type = selectedOption;
                    dispatch(addAircraft(values));
                }}
            >
                {({ errors, values, touched, handleChange }) => (
                    <Form className={s.aircraft__form}>
                        <div className={s.aircraft__form__wrap}>
                            <div className={s.aircraft__form__link}>
                                {/* {errors.type ? <ErrorMessage message={errors.type} /> : null} */}
                                <label>Type <span>*</span></label>
                                <Select options={options} onChange={onChange} styles={customStyles} />
                            </div>
                            {[
                                {
                                    label: "Manufacture Date", type: "date", id: "manufDate", name: "manufDate",
                                    value: values.manufDate, error: errors.manufDate, placeholder: "Choose Manufacture Date"
                                },
                                {
                                    label: "MSN", type: "text", id: "msn", name: "msn",
                                    value: values.msn, error: errors.msn, placeholder: "Enter MSN"
                                },
                                {
                                    label: "Reg.", type: "text", id: "regNum", name: "regNum",
                                    value: values.regNum, error: errors.regNum, placeholder: "Enter Reg. No"
                                },
                                {
                                    label: "Initial FH", type: "text", id: "initFh", name: "initFh",
                                    value: values.initFh, error: errors.initFh, placeholder: "Enter Initial FH"
                                },
                                {
                                    label: "Initial FC", type: "text", id: "initFc", name: "initFc",
                                    value: values.initFc, error: errors.initFc, placeholder: "Enter Initial FC"
                                },
                                {
                                    label: "FH", type: "text", id: "fh", name: "fh",
                                    value: values.fh, error: errors.fh, placeholder: "Enter FH"
                                },
                                {
                                    label: "FC", type: "text", id: "fc", name: "fc",
                                    value: values.fc, error: errors.fc, placeholder: "Enter FC"
                                },
                                { label: "Number of Overhaul", type: "number", id: "overhaulNum", name: "overhaulNum", value: values.overhaulNum, error: errors.overhaulNum },
                                {
                                    label: "Last Overhaul Date", type: "date", id: "lastOverhaulDate", name: "lastOverhaulDate",
                                    value: values.lastOverhaulDate, error: errors.lastOverhaulDate, placeholder: "Choose last overhaul date", disabled: values.overhaulNum === 0 ? true : false
                                },
                                {
                                    label: "FH at Last Overhaul", type: "text", id: "tsnAtlastOverhaul", name: "tsnAtlastOverhaul",
                                    value: values.tsnAtlastOverhaul, error: errors.tsnAtlastOverhaul, placeholder: "Enter FH at Last Overhaul", disabled: values.overhaulNum === 0 ? true : false
                                },
                                {
                                    label: "FC at Last Overhaul", type: "text", id: "csnAtlastOverhaul", name: "csnAtlastOverhaul",
                                    value: values.csnAtlastOverhaul, error: errors.csnAtlastOverhaul, placeholder: "Enter FC at Last Overhaul", disabled: values.overhaulNum === 0 ? true : false
                                },
                                {
                                    label: "Total Life Period", type: "date", id: "tlp", name: "tlp",
                                    value: values.tlp, error: errors.tlp, placeholder: "Enter Total Life Period"
                                },
                                {
                                    label: "Total Life Time", type: "text", id: "tlt", name: "tlt",
                                    value: values.tlt, error: errors.tlt, placeholder: "Enter Total Life Time"
                                },
                                {
                                    label: "Total Life Cycles", type: "text", id: "tlc", name: "tlc",
                                    value: values.tlc, error: errors.tlc, placeholder: "Enter Total Life Cycles"
                                },
                                {
                                    label: "Period Between Overhaul", type: "date", id: "pbo", name: "pbo",
                                    value: values.pbo, error: errors.pbo, placeholder: "Choose Period Between Overhaul"
                                },
                                {
                                    label: "Time Between Overhaul", type: "text", id: "tbo", name: "tbo",
                                    value: values.tbo, error: errors.tbo, placeholder: "Enter Time Between Overhaul"
                                },
                                {
                                    label: "Cycles Between Overhaul", type: "text", id: "cbo", name: "cbo",
                                    value: values.cbo, error: errors.cbo, placeholder: "Enter Cycles Between Overhaul"
                                },
                            ].map((field: any) => {
                                return (
                                    <div key={field.label} className={s.aircraft__form__link}>
                                        {field.error ? <ErrorMessage message={field.error} /> : null}
                                        <label>{field.label}<span>*</span></label>
                                        <Field type={field.type} id={field.id} name={field.name} value={field.value} onChange={handleChange} as={Input}
                                            disabled={field.disabled} placeholder={field.placeholder} min="0" />
                                    </div>
                                )
                            })
                            }
                        </div>
                        <div className={s.aircraft__form__btns} >
                            <Button text="Cancel" color="white" btnType="button" handler={() => setAddForm(false)} />
                            <Button text="Add" color="green" btnType="submit" />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default compose(withContainerBlur, withSuccessMessage)(AircraftForm);