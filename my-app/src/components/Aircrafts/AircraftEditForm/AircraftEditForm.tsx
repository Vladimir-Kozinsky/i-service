import { Form, Formik, FormikHelpers } from 'formik';
import Button from '../../../common/buttons/Button';
import Input from '../../../common/Input';
import ErrorMessage from '../../../common/messages/ErrorMessage';
import { useState } from 'react'
import Select, { ActionMeta } from 'react-select'
import s from './AircraftEditForm.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { IAircraft, updateAircraft } from '../../../store/reducers/aircraftReducer';
import { compose } from 'redux';
import { withContainerBlur } from '../../HOC/withContainerBlur/withContainerBlur';
import withSuccessMessage from '../../HOC/messageHoc';
import { checkFHFormat } from '../../../utils/forms';

type AircraftEditFormProps = {
    aircraft: IAircraft
    showArcraftEditForm: () => void
}

// interface IAircraftFormValues {
//     type: string;
//     msn: string;
//     initFh: string;
//     initFc: string;
//     fh: string;
//     fc: string;
//     eng1: string;
//     eng2: string;
//     eng3?: string;
//     rng4?: string;
//     apu: string;
// }

interface IOption {
    value: string | null;
    label: string | null;
}
const options: IOption[] = [
    { value: 'IL-76T', label: 'IL-76T' },
    { value: 'IL-76TD', label: 'IL-76TD' },
    { value: 'Boeing 737-300', label: 'Boeing 737-300' },
    { value: 'Boeing 737-400', label: 'Boeing 737-400' },
    { value: 'Boeing 737-800', label: 'Boeing 737-800' },
    { value: 'Boeing 747-200', label: 'Boeing 747-200' },
    { value: 'Boeing 747-400', label: 'Boeing 747-400' },
    { value: 'Boeing 757-200', label: 'Boeing 757-200' }
]

const AircraftEditForm = ({ aircraft, showArcraftEditForm }: AircraftEditFormProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedOption, setSelectedOption] = useState<string | null>(aircraft.type ? aircraft.type : null);
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
            <h3 className={s.aircraftForm__header}>Update an Aircraft</h3>
            <Formik
                initialValues={{
                    type: aircraft.type,
                    manufDate: aircraft.manufDate,
                    msn: aircraft.msn,
                    regNum: aircraft.regNum,
                    initFh: aircraft.initFh,
                    initFc: aircraft.initFc,
                    fh: aircraft.fh,
                    fc: aircraft.fc,
                    apu: aircraft.apu
                }}
                validate={values => {
                    interface IErrors {
                        type?: string;
                        manufDate?: string;
                        msn?: string;
                        regNum?: string;
                        initFh?: string;
                        initFc?: string;
                        fh?: string;
                        fc?: string;
                        apu?: string;
                    }
                    const errors: IErrors = {};


                    if (!selectedOption) errors.type = 'Type is required';
                    if (!values.manufDate) errors.manufDate = 'Manufacture Date is required';
                    if (!values.msn) errors.msn = 'MSN is required';
                    if (!values.regNum) errors.regNum = 'Reg No is required';
                    if (!values.initFh) errors.initFh = 'Initial FH is required';
                    if (!checkFHFormat(values.initFh)) errors.initFh = 'Invalid format, the format should be like "123456:22"';
                    if (!values.initFc) errors.initFc = 'Initial FC is required';
                    if (!values.fh) errors.fh = 'FH is required';
                    if (!values.fc) errors.fc = 'FC si required';
                    if (!values.apu) errors.apu = 'Serial number is required';
                    return errors;
                }}
                onSubmit={(
                    values: any,
                    { setSubmitting }: FormikHelpers<any>
                ) => {
                    const payload = {
                        id: aircraft._id,
                        type: selectedOption,
                        manufDate: values.manufDate,
                        msn: values.msn,
                        regNum: values.regNum,
                        initFh: values.initFh,
                        initFc: values.initFc,
                        fh: values.fh,
                        fc: values.fc,
                        apu: values.apu,
                        engines: [],
                        legs: []
                    }
                    dispatch(updateAircraft(payload));
                }}
            >
                {({ errors, touched }) => (
                    <Form className={s.aircraft__form}>
                        <div className={s.aircraft__form__wrap}>
                            <div className={s.aircraft__form__link}>
                                {/* {errors.type ? <ErrorMessage message={errors.type} /> : null} */}
                                <label>Type <span>*</span></label>
                                <Select value={
                                    options.filter((option: IOption) =>
                                        option.label === aircraft.type
                                    )
                                } options={options} onChange={onChange} styles={customStyles} />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.manufDate ? <ErrorMessage message={errors.manufDate} /> : null}
                                <label>Manufacture Date<span>*</span></label>
                                <Input type="date" id="manufDate" name="manufDate" placeholder={aircraft.manufDate} />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.msn ? <ErrorMessage message={errors.msn} /> : null}
                                <label>MSN <span>*</span></label>
                                <Input type="text" id="msn" name="msn" placeholder={aircraft.msn} />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.regNum ? <ErrorMessage message={errors.regNum} /> : null}
                                <label>Reg:<span>*</span></label>
                                <Input type="text" id="regNum" name="regNum" placeholder={aircraft.regNum} />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.initFh ? <ErrorMessage message={errors.initFh} /> : null}
                                <label>Initial FH <span>*</span></label>
                                <Input type="text" id="initFh" name="initFh" placeholder={aircraft.initFh} />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.initFc ? <ErrorMessage message={errors.initFc} /> : null}
                                <label>Initial FC <span>*</span></label>
                                <Input type="text" id="initFc" name="initFc" placeholder={aircraft.initFc} />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.fh ? <ErrorMessage message={errors.fh} /> : null}
                                <label>FH <span>*</span></label>
                                <Input type="text" id="fh" name="fh" placeholder={aircraft.fh} disabled />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.fc ? <ErrorMessage message={errors.fc} /> : null}
                                <label>FC <span>*</span></label>
                                <Input type="text" id="fc" name="fc" placeholder={aircraft.fc} disabled />
                            </div>
                            <div className={s.aircraft__form__link}>
                                {errors.apu ? <ErrorMessage message={errors.apu} /> : null}
                                <label>APU Serial Number</label>
                                <Input type="text" id="apu" name="apu" placeholder={aircraft.apu} />
                            </div>
                        </div>
                        <div className={s.aircraft__form__btns} >
                            <Button text="Cancel" color="white" btnType="button" handler={showArcraftEditForm} />
                            <Button text="Add" color="green" btnType="submit" />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default compose(withContainerBlur, withSuccessMessage)(AircraftEditForm);