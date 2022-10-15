import { Form, Formik } from "formik"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { compose } from "redux"
import Button from "../../../common/buttons/Button"
import { AppDispatch } from "../../../store/store"
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur"
import Select, { ActionMeta } from 'react-select'
import s from "./EngineAddForm.module.scss"
import ErrorMessage from "../../../common/messages/ErrorMessage"
import Input from "../../../common/Input"
import { addEngine } from "../../../store/reducers/engineReducer"
import { IEngine } from "../../../types/types"
import withSuccessMessage from "../../HOC/messageHoc"

type EngineAddFormProps = {
    setEngAddForm: (form: boolean) => void;
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

const EngineAddForm: React.FC<EngineAddFormProps> = ({ setEngAddForm }) => {
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
        <div className={s.addEngineForm}>
            <h3 className={s.addEngineForm__header} >Engine</h3>
            <Formik
                initialValues={{
                    type: '',
                    msn: '',
                    manufDate: '',
                    hsn: '',
                    csn: '',
                    overhaulNum: 0,
                    lastOverhaulDate: '',
                    hsnAtlastOverhaul: '',
                    csnAtlastOverhaul: '',
                    totalLifeTime: '',
                    totalLifeHours: '',
                    totalLifeCycles: '',
                    tbo: '',
                    hbo: '',
                    cbo: '',
                }}
                validate={values => {
                    interface IErrors {
                        _id?: string | null;
                        type?: string | null;
                        msn?: string | null;
                        manufDate?: string | null;
                        hsnAtlastOverhaul?: string | null;
                        csnAtlastOverhaul?: string | null;
                        hsn?: string | null;
                        csn?: string | null;
                        overhaulNum?: string | null;
                        lastOverhaulDate?: string | null;
                        totalLifeTime?: string | null;
                        totalLifeHours?: string | null;
                        totalLifeCycles?: string | null;
                        tbo?: string | null;
                        hbo?: string | null;
                        cbo?: string | null;

                    }
                    const errors = {} as IErrors;

                    if (!selectedOption) errors.type = 'Type is required';
                    if (!values.msn) errors.msn = 'MSN is required';
                    if (!values.manufDate) errors.manufDate = 'Manufacture date is required';
                    if (!values.hsn) errors.hsn = 'FH is required';
                    if (!values.csn) errors.csn = 'FC si required';
                    if (!values.overhaulNum) errors.overhaulNum = 'Overhaul numbers is required';
                    if (!values.lastOverhaulDate) errors.lastOverhaulDate = 'Last overhaul date is required';
                    if (!values.hsnAtlastOverhaul) errors.hsnAtlastOverhaul = 'Hours at overhaul is required';
                    if (!values.csnAtlastOverhaul) errors.csnAtlastOverhaul = 'Cycles at overhaul is required';
                    if (!values.totalLifeTime) errors.totalLifeTime = 'Total life time is required';
                    if (!values.totalLifeHours) errors.totalLifeHours = 'Total life hours is required';
                    if (!values.totalLifeCycles) errors.totalLifeCycles = 'Total life cycles is required';
                    if (!values.tbo) errors.tbo = 'Time between overhaul is required';
                    if (!values.hbo) errors.hbo = 'Hours between overhaul is required';
                    if (!values.cbo) errors.cbo = 'Cycles between overhaul is required';
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    if (selectedOption) values.type = selectedOption
                    dispatch(addEngine(values))
                }}
            >
                {({ errors, touched }) => (
                    <Form className={s.addEngineForm__form} >
                        <div className={s.addEngineForm__wrap} >
                            <div className={s.addEngineForm__form__link}>
                                {/* {errors.type ? <ErrorMessage message={errors.type} /> : null} */}
                                <label>Type <span>*</span></label>
                                <Select options={options} onChange={onChange} styles={customStyles} />
                            </div>
                            <div className={s.addEngineForm__form__link}>
                                {errors.msn ? <ErrorMessage message={errors.msn} /> : null}
                                <label>MSN <span>*</span></label>
                                <Input type="text" id="msn" name="msn" placeholder="Enter MSN" />
                            </div>

                            <div className={s.addEngineForm__form__link}>
                                {errors.manufDate ? <ErrorMessage message={errors.manufDate} /> : null}
                                <label>Manufactory Date <span>*</span></label>
                                <Input type="date" id="manufDate" name="manufDate" placeholder="" />
                            </div>

                            <div className={s.addEngineForm__form__link}>
                                {errors.hsn ? <ErrorMessage message={errors.hsn} /> : null}
                                <label>Hours Since New <span>*</span></label>
                                <Input type="text" id="hsn" name="hsn" placeholder="Enter FH Since New" />
                            </div>

                            <div className={s.addEngineForm__form__link}>
                                {errors.csn ? <ErrorMessage message={errors.csn} /> : null}
                                <label>Cycles Since New <span>*</span></label>
                                <Input type="text" id="csn" name="csn" placeholder="Enter Cycles Since New" />
                            </div>

                            <div className={s.addEngineForm__form__link}>
                                {errors.overhaulNum ? <ErrorMessage message={errors.overhaulNum} /> : null}
                                <label>Number of Overhauls <span>*</span></label>
                                <Input type="text" id="overhaulNum" name="overhaulNum" placeholder="Enter number of overhauls" />
                            </div>

                            <div className={s.addEngineForm__form__link}>
                                {errors.lastOverhaulDate ? <ErrorMessage message={errors.lastOverhaulDate} /> : null}
                                <label>Last Overhaul Date <span>*</span></label>
                                <Input type="date" id="lastOverhaulDate" name="lastOverhaulDate" placeholder="" />
                            </div>
                            <div className={s.addEngineForm__form__link}>
                                {errors.hsnAtlastOverhaul ? <ErrorMessage message={errors.hsnAtlastOverhaul} /> : null}
                                <label>Hours at Last Overhaul<span>*</span></label>
                                <Input type="text" id="hsnAtlastOverhaul" name="hsnAtlastOverhaul" placeholder="Enter Hours at Last Overhaul" />
                            </div>
                            <div className={s.addEngineForm__form__link}>
                                {errors.hsnAtlastOverhaul ? <ErrorMessage message={errors.hsnAtlastOverhaul} /> : null}
                                <label>Cycles at Last Overhaul<span>*</span></label>
                                <Input type="text" id="csnAtlastOverhaul" name="csnAtlastOverhaul" placeholder="Enter Cycles at Last Overhaul" />
                            </div>

                            <div className={s.addEngineForm__form__link}>
                                {errors.totalLifeTime ? <ErrorMessage message={errors.totalLifeTime} /> : null}
                                <label>Total Life Limit Time <span>*</span></label>
                                <Input type="text" id="totalLifeTime" name="totalLifeTime" placeholder="Enter Total Life Limit Time" />
                            </div>

                            <div className={s.addEngineForm__form__link}>
                                {errors.totalLifeHours ? <ErrorMessage message={errors.totalLifeHours} /> : null}
                                <label>Total Life Limit Hours<span>*</span></label>
                                <Input type="text" id="totalLifeHours" name="totalLifeHours" placeholder="Enter Total Life Limit Hours" />
                            </div>

                            <div className={s.addEngineForm__form__link}>
                                {errors.totalLifeCycles ? <ErrorMessage message={errors.totalLifeCycles} /> : null}
                                <label>Total Life Limit Cycles<span>*</span></label>
                                <Input type="text" id="totalLifeCycles" name="totalLifeCycles" placeholder="Enter Total Life Limit Cycles" />
                            </div>

                            <div className={s.addEngineForm__form__link}>
                                {errors.tbo ? <ErrorMessage message={errors.tbo} /> : null}
                                <label>LL Time Between Overhauls<span>*</span></label>
                                <Input type="text" id="tbo" name="tbo" placeholder="Enter Life Limit Time Between Overhauls" />
                            </div>
                            <div className={s.addEngineForm__form__link}>
                                {errors.hbo ? <ErrorMessage message={errors.hbo} /> : null}
                                <label>LL FH Between Overhauls<span>*</span></label>
                                <Input type="text" id="hbo" name="hbo" placeholder="Enter Life Limit Hours Between Overhauls" />
                            </div>
                            <div className={s.addEngineForm__form__link}>
                                {errors.cbo ? <ErrorMessage message={errors.cbo} /> : null}
                                <label>LL FC Between Overhauls<span>*</span></label>
                                <Input type="text" id="cbo" name="cbo" placeholder="Enter Life Limit Cycles Between Overhauls" />
                            </div>
                        </div>
                        <div className={s.addEngineForm__form__btns} >
                            <Button text='Cancel' color='white' btnType='button' handler={() => setEngAddForm(false)} />
                            <Button text='Submit' color='green' btnType='submit' />
                        </div>
                    </Form>)}
            </Formik>
        </div>
    )
}

export default compose(withContainerBlur, withSuccessMessage)(EngineAddForm);