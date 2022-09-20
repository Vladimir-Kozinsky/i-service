import { Form, Formik, FormikHelpers } from 'formik';
import { redirect, useNavigate } from 'react-router-dom';
import Button from '../../../common/buttons/Button';
import Input from '../../../common/Input';
import ErrorMessage from '../../../common/messages/ErrorMessage';
import { useState } from 'react'
import Select, { ActionMeta } from 'react-select'
import s from './AircraftForm.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { addAircraft } from '../../../store/reducers/aircraftReducer';
import { compose } from 'redux';
import withSuccessMessage from '../../HOC/messageHoc';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';

interface IAircraftFormValues {
    type: string;
    msn: string;
    fh: string;
    fc: string;
    eng1: string;
    eng2: string;
    eng3?: string;
    rng4?: string;
    apu: string;
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

const AircraftForm = () => {
    const navigate = useNavigate();
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
        <div className={s.aircraftForm__container}>
            <div className={s.background__circle}></div>
            <div className={s.aircraftForm}>
                <h3 className={s.aircraftForm__header}>Add an Aircraft</h3>
                <Formik
                    initialValues={{
                        type: '',
                        msn: '',
                        fh: '',
                        fc: '',
                        eng1: '',
                        eng2: '',
                        eng3: '',
                        eng4: '',
                        apu: ''
                    }}
                    validate={values => {
                        interface IErrors {
                            type?: string;
                            msn?: string;
                            fh?: string;
                            fc?: string;
                            eng1?: string;
                            eng2?: string;
                            eng3?: string;
                            eng4?: string;
                            apu?: string;
                        }
                        const errors: IErrors = {};

                        if (!selectedOption) errors.type = 'Type is required';
                        if (!values.msn) errors.msn = 'MSN is required';
                        if (!values.fh) errors.fh = 'FH is required';
                        if (!values.fc) errors.fc = 'FC si required';
                        if (!values.eng1) errors.eng1 = 'Serial number is required';
                        if (!values.eng2) errors.eng2 = 'Serial number is required';
                        if (!values.apu) errors.apu = 'Serial number is required';
                        return errors;
                    }}
                    onSubmit={(
                        values: any,
                        { setSubmitting }: FormikHelpers<any>
                    ) => {
                        const payload = {
                            type: selectedOption,
                            msn: values.msn,
                            fh: values.fh,
                            fc: values.fc,
                            apu: values.apu,
                            engines: [
                                { pos: '1', msn: values.eng1 },
                                { pos: '2', msn: values.eng2 },
                                { pos: '3', msn: values.eng3 },
                                { pos: '4', msn: values.eng4 },
                            ],
                            legs: []
                        }
                        dispatch(addAircraft(payload));
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
                                    {errors.msn ? <ErrorMessage message={errors.msn} /> : null}
                                    <label>MSN <span>*</span></label>
                                    <Input type="text" id="msn" name="msn" placeholder="Enter MSN" />
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
                                    {errors.eng1 ? <ErrorMessage message={errors.eng1} /> : null}
                                    <label>ENG #1 Serial Number <span>*</span></label>
                                    <Input type="text" id="eng1" name="eng1" placeholder="Enter serial number" />
                                </div>
                                <div className={s.aircraft__form__link}>
                                    {errors.eng2 ? <ErrorMessage message={errors.eng2} /> : null}
                                    <label>ENG #2 Serial Number <span>*</span></label>
                                    <Input type="text" id="eng2" name="eng2" placeholder="Enter serial number" />
                                </div>
                                <div className={s.aircraft__form__link}>
                                    {errors.eng3 ? <ErrorMessage message={errors.eng3} /> : null}
                                    <label>ENG #3 Serial Number</label>
                                    <Input type="text" id="eng3" name="eng3" placeholder="Enter serial number" />
                                </div>
                                <div className={s.aircraft__form__link}>
                                    {errors.eng4 ? <ErrorMessage message={errors.eng4} /> : null}
                                    <label>ENG #4 Serial Number</label>
                                    <Input type="text" id="eng4" name="eng4" placeholder="Enter serial number" />
                                </div>
                                <div className={s.aircraft__form__link}>
                                    {errors.apu ? <ErrorMessage message={errors.apu} /> : null}
                                    <label>APU Serial Number</label>
                                    <Input type="text" id="apu" name="apu" placeholder="Enter serial number" />
                                </div>
                            </div>
                            <div className={s.aircraft__form__btns} >
                                <Button text="Cancel" color="white" btnType="button" handler={() => navigate("/dashboard")} />
                                <Button text="Add" color="green" btnType="submit" />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default compose(withSuccessMessage, withAuthRedirect)(AircraftForm);