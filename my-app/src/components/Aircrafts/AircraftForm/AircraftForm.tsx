import { Form, Formik, FormikHelpers } from 'formik';
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
    const [numOfOverhauls, setNumOfOverhauls] = useState<number>(0);
    const onChange = (option: IOption | null, actionMeta: ActionMeta<IOption>) => {
        if (option?.value) {
            setSelectedOption(option.value);
        }
    }
    const numOverhaulOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumOfOverhauls(+e.target.value)
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
                    if (!values.fh) errors.fh = 'FH is required';
                    if (!checkFHFormat(values.fh)) errors.fh = 'Invalid format, the format should be like "123456:22"';
                    if (!values.fc) errors.fc = 'FC si required';
                    // if (values.overhaulNum < 0) errors.overhaulNum = 'Number of overhaul is required';
                    if (numOfOverhauls > 0 && !values.lastOverhaulDate) errors.lastOverhaulDate = 'Last overhaul Date is required';
                    if (numOfOverhauls > 0 && !values.tsnAtlastOverhaul) errors.tsnAtlastOverhaul = 'FH at last overhaul is required';
                    if (numOfOverhauls > 0 && !checkFHFormat(values.tsnAtlastOverhaul)) errors.tsnAtlastOverhaul = 'Invalid format, the format should be like "123456:22"';
                    if (numOfOverhauls > 0 && !values.csnAtlastOverhaul) errors.csnAtlastOverhaul = 'FC at last overhaul is required';
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
                    if (numOfOverhauls) values.overhaulNum = numOfOverhauls;
                    dispatch(addAircraft(values));
                }}
            >
                {({ errors, touched }) => (
                    <Form className={s.aircraft__form}>
                        <div className={s.aircraft__form__wrap}>
                            <div className={s.aircraft__form__link}>
                                {/* {errors.type ? <ErrorMessage message={errors.type} /> : null} */}
                                <label>Type <span>*</span></label>
                                <Select options={options} onChange={onChange} styles={customStyles} />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.manufDate ? <ErrorMessage message={errors.manufDate} /> : null}
                                <label>Manufacture Date<span>*</span></label>
                                <Input type="date" id="manufDate" name="manufDate" placeholder="Enter Manufacture Date" />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.msn ? <ErrorMessage message={errors.msn} /> : null}
                                <label>MSN <span>*</span></label>
                                <Input type="text" id="msn" name="msn" placeholder="Enter MSN" />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.regNum ? <ErrorMessage message={errors.regNum} /> : null}
                                <label>Reg. <span>*</span></label>
                                <Input type="text" id="regNum" name="regNum" placeholder="Enter Reg. No" />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.fh ? <ErrorMessage message={errors.fh} /> : null}
                                <label>FH <span>*</span></label>
                                <Input type="text" id="fh" name="fh" placeholder="Enter FH" />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.fc ? <ErrorMessage message={errors.fc} /> : null}
                                <label>FC <span>*</span></label>
                                <Input type="text" id="fc" name="fc" placeholder="Enter FC" />
                            </div>

                            <div className={s.aircraft__form__link}>
                                {errors.overhaulNum ? <ErrorMessage message={errors.overhaulNum} /> : null}
                                <label>Number of Overhaul <span>*</span></label>
                                <input className={s.input} value={numOfOverhauls} type="number" id="overhaulNum" name="overhaulNum" onChange={numOverhaulOnchange} min='0' />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.lastOverhaulDate ? <ErrorMessage message={errors.lastOverhaulDate} /> : null}
                                <label>Last Overhaul Date<span>*</span></label>
                                <Input type="date" id="lastOverhaulDate" name="lastOverhaulDate" placeholder="Enter last overhaul date" disabled={numOfOverhauls ? false : true} />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.tsnAtlastOverhaul ? <ErrorMessage message={errors.tsnAtlastOverhaul} /> : null}
                                <label>FH at Last Overhaul<span>*</span></label>
                                <Input type="text" id="tsnAtlastOverhaul" name="tsnAtlastOverhaul" placeholder="Enter last overhaul date" disabled={numOfOverhauls ? false : true} />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.csnAtlastOverhaul ? <ErrorMessage message={errors.csnAtlastOverhaul} /> : null}
                                <label>FC at Last Overhaul<span>*</span></label>
                                <Input type="text" id="csnAtlastOverhaul" name="csnAtlastOverhaul" placeholder="Enter last overhaul date" disabled={numOfOverhauls ? false : true} />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.tlp ? <ErrorMessage message={errors.tlp} /> : null}
                                <label>Total Life Period<span>*</span></label>
                                <Input type="date" id="tlp" name="tlp" placeholder="Enter last overhaul date" />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.tlt ? <ErrorMessage message={errors.tlt} /> : null}
                                <label>Total Life Time<span>*</span></label>
                                <Input type="text" id="tlt" name="tlt" placeholder="Enter last overhaul date" />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.tlc ? <ErrorMessage message={errors.tlc} /> : null}
                                <label>Total Life Cycles<span>*</span></label>
                                <Input type="text" id="tlc" name="tlc" placeholder="Enter last overhaul date" />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.pbo ? <ErrorMessage message={errors.pbo} /> : null}
                                <label>Period Between Overhaul<span>*</span></label>
                                <Input type="date" id="pbo" name="pbo" placeholder="Enter last overhaul date" />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.tbo ? <ErrorMessage message={errors.tbo} /> : null}
                                <label>Time Between Overhaul<span>*</span></label>
                                <Input type="text" id="tbo" name="tbo" placeholder="Enter last overhaul date" />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.cbo ? <ErrorMessage message={errors.cbo} /> : null}
                                <label>Cycles Between Overhaul<span>*</span></label>
                                <Input type="text" id="cbo" name="cbo" placeholder="Enter last overhaul date" />
                            </div>
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