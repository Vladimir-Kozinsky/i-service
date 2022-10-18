import { Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
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
import withSuccessMessage from "../../HOC/messageHoc"
import { checkFHFormat } from "../../../utils/forms"
import aircraftAPI from "../../../API/aircraftAPI"
import { IAircraft } from "../../../store/reducers/aircraftReducer"

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

    const [selectedAircraftOption, setsSelectedAircraftOption] = useState<string | null>(null);
    const [aircraftsOptions, setAircraftsOptions] = useState([]);
    const aircraftSelectOnChange = async (option: IOption | null, actionMeta: ActionMeta<IOption>) => {
        if (option?.value) {
            setsSelectedAircraftOption(option.value);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const responce = await aircraftAPI.getAircrafts();
                if (responce.data.length) {
                    const optopns = responce.data.map((aircraft: IAircraft) => {
                        return {
                            value: aircraft.msn,
                            label: `${aircraft.type} MSN: ${aircraft.msn}`
                        }
                    })
                    setAircraftsOptions(optopns);
                }

            } catch (error) {
                console.log(error)
            }
        })()

    }, [])
    return (
        <div className={s.addEngineForm}>
            <h3 className={s.addEngineForm__header} >Engine</h3>
            <Formik
                initialValues={{
                    // General
                    type: '',
                    msn: '',
                    manufDate: '',
                    tsn: '',
                    csn: '',
                    //Installation
                    onAircraft: '',
                    installDate: '',
                    aircraftTsn: '',
                    aircraftCsn: '',
                    engTsn: '',
                    engCsn: '',
                    //Overhaul
                    overhaulNum: 0,
                    lastOverhaulDate: '',
                    tsnAtlastOverhaul: '',
                    csnAtlastOverhaul: '',
                    //Limits
                    tlp: '',
                    tlt: '',
                    tlc: '',
                    pbo: '',
                    tbo: '',
                    cbo: '',
                }}
                validate={values => {
                    interface IErrors {
                        // General
                        type?: string | null;
                        msn?: string | null;
                        manufDate?: string | null;
                        tsn?: string | null;
                        csn?: string | null;
                        //Installation
                        onAircraft?: string | null;
                        installDate?: string | null;
                        aircraftTsn?: string | null;
                        aircraftCsn?: string | null;
                        engTsn?: string | null;
                        engCsn?: string | null;
                        //Overhaul
                        overhaulNum: string | null;
                        lastOverhaulDate?: string | null;
                        tsnAtlastOverhaul?: string | null;
                        csnAtlastOverhaul?: string | null;
                        //Limits
                        tlp?: string | null;
                        tlt?: string | null;
                        tlc?: string | null;
                        pbo?: string | null;
                        tbo?: string | null;
                        cbo?: string | null;

                    }
                    const errors = {} as IErrors;
                    // General
                    if (!selectedOption) errors.type = 'Type is required';
                    if (!values.msn) errors.msn = 'MSN is required';
                    if (!values.manufDate) errors.manufDate = 'Manufacture date is required';
                    if (!values.tsn) errors.tsn = 'TSN is required';
                    if (!checkFHFormat(values.tsn)) errors.tsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.csn) errors.csn = 'CSN si required';
                    //Installation
                    if (!selectedAircraftOption) errors.onAircraft = 'Aircraft is required';
                    if (!values.installDate) errors.installDate = 'Installayion Date is required';
                    if (!values.aircraftTsn) errors.aircraftTsn = 'Aircraft TSN is required';
                    if (!checkFHFormat(values.aircraftTsn)) errors.aircraftTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.aircraftCsn) errors.aircraftCsn = 'Aircraft CSN is required';
                    if (!values.engTsn) errors.engTsn = 'Engine TSN is required';
                    if (!checkFHFormat(values.engTsn)) errors.engTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.engCsn) errors.engCsn = 'Engine CSN is required';
                    //Overhaul
                    if (!values.overhaulNum) errors.overhaulNum = 'Overhaul numbers is required';
                    if (!values.lastOverhaulDate) errors.lastOverhaulDate = 'Last overhaul date is required';
                    if (!values.tsnAtlastOverhaul) errors.tsnAtlastOverhaul = 'TSN at overhaul is required';
                    if (!checkFHFormat(values.tsnAtlastOverhaul)) errors.tsnAtlastOverhaul = 'Invalid format, the format should be like "123456:22"';
                    if (!values.csnAtlastOverhaul) errors.csnAtlastOverhaul = 'CSN at overhaul is required';
                    //Limits
                    if (!values.tlp) errors.tlp = 'Total life period is required';
                    if (!values.tlt) errors.tlt = 'Total life time is required';
                    if (!checkFHFormat(values.tlt)) errors.tlt = 'Invalid format, the format should be like "123456:22"';
                    if (!values.tlc) errors.tlc = 'Total life cycles is required';
                    if (!values.pbo) errors.pbo = 'Period between overhaul is required';
                    if (!values.tbo) errors.tbo = 'Time between overhaul is required';
                    if (!checkFHFormat(values.tbo)) errors.tbo = 'Invalid format, the format should be like "123456:22"';
                    if (!values.cbo) errors.cbo = 'Cycles between overhaul is required';
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    if (selectedOption) values.type = selectedOption
                    if (selectedAircraftOption) values.onAircraft = selectedAircraftOption
                    dispatch(addEngine(values))
                }}
            >
                {({ errors, touched }) => (
                    <Form className={s.addEngineForm__form} >
                        <div className={s.addEngineForm__wrap} >
                            {/* General */}
                            <h3 className={s.addEngineForm__wrap__header}>General</h3>
                            <div className={s.addEngineForm__wrap__block}>
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
                                    {errors.tsn ? <ErrorMessage message={errors.tsn} /> : null}
                                    <label>Hours Since New <span>*</span></label>
                                    <Input type="text" id="tsn" name="tsn" placeholder="Enter Time Since New" />
                                </div>

                                <div className={s.addEngineForm__form__link}>
                                    {errors.csn ? <ErrorMessage message={errors.csn} /> : null}
                                    <label>Cycles Since New <span>*</span></label>
                                    <Input type="text" id="csn" name="csn" placeholder="Enter Cycles Since New" />
                                </div>
                            </div>
                            {/* Installation */}
                            <h3 className={s.addEngineForm__wrap__header}>Installation</h3>
                            <div className={s.addEngineForm__wrap__block}>
                                <div className={s.addEngineForm__form__link}>
                                    {/* {errors.type ? <ErrorMessage message={errors.type} /> : null} */}
                                    <label>Aircraft<span>*</span></label>
                                    <Select options={aircraftsOptions} onChange={aircraftSelectOnChange} styles={customStyles} />
                                </div>
                                <div className={s.addEngineForm__form__link}>
                                    {errors.installDate ? <ErrorMessage message={errors.installDate} /> : null}
                                    <label>Installation Date <span>*</span></label>
                                    <Input type="date" id="installDate" name="installDate" placeholder="Enter installation Date" />
                                </div>
                                <div className={s.addEngineForm__form__link}>
                                    {errors.aircraftTsn ? <ErrorMessage message={errors.aircraftTsn} /> : null}
                                    <label>Aircraft TSN <span>*</span></label>
                                    <Input type="text" id="aircraftTsn" name="aircraftTsn" placeholder="Enter Aircrfat TSN" />
                                </div>
                                <div className={s.addEngineForm__form__link}>
                                    {errors.aircraftCsn ? <ErrorMessage message={errors.aircraftCsn} /> : null}
                                    <label>Aircraft CSN <span>*</span></label>
                                    <Input type="text" id="aircraftCsn" name="aircraftCsn" placeholder="Enter Aircrfat CSN" />
                                </div>
                                <div className={s.addEngineForm__form__link}>
                                    {errors.engTsn ? <ErrorMessage message={errors.engTsn} /> : null}
                                    <label>Engine TSN <span>*</span></label>
                                    <Input type="text" id="engTsn" name="engTsn" placeholder="Enter Engine TSN" />
                                </div>
                                <div className={s.addEngineForm__form__link}>
                                    {errors.engCsn ? <ErrorMessage message={errors.engCsn} /> : null}
                                    <label>Engine CSN <span>*</span></label>
                                    <Input type="text" id="engCsn" name="engCsn" placeholder="Enter Engine CSN" />
                                </div>
                            </div>
                            {/* Overhaul */}
                            <h3 className={s.addEngineForm__wrap__header}>Overhaul</h3>
                            <div className={s.addEngineForm__wrap__block}>
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
                                    {errors.tsnAtlastOverhaul ? <ErrorMessage message={errors.tsnAtlastOverhaul} /> : null}
                                    <label>TSN at Last Overhaul<span>*</span></label>
                                    <Input type="text" id="tsnAtlastOverhaul" name="tsnAtlastOverhaul" placeholder="Enter TSN at Last Overhaul" />
                                </div>
                                <div className={s.addEngineForm__form__link}>
                                    {errors.csnAtlastOverhaul ? <ErrorMessage message={errors.csnAtlastOverhaul} /> : null}
                                    <label>CSN at Last Overhaul<span>*</span></label>
                                    <Input type="text" id="csnAtlastOverhaul" name="csnAtlastOverhaul" placeholder="Enter CSN at Last Overhaul" />
                                </div>
                            </div>
                            {/* Limits */}
                            <h3 className={s.addEngineForm__wrap__header}>Limits</h3>
                            <div className={s.addEngineForm__wrap__block}>
                                <div className={s.addEngineForm__form__link}>
                                    {errors.tlp ? <ErrorMessage message={errors.tlp} /> : null}
                                    <label>Total Life Limit Period till<span>*</span></label>
                                    <Input type="date" id="tlp" name="tlp" placeholder="Enter Total Life Limit Period" />
                                </div>

                                <div className={s.addEngineForm__form__link}>
                                    {errors.tlt ? <ErrorMessage message={errors.tlt} /> : null}
                                    <label>Total Life Limit Time<span>*</span></label>
                                    <Input type="text" id="tlt" name="tlt" placeholder="Enter Total Life Limit Time" />
                                </div>

                                <div className={s.addEngineForm__form__link}>
                                    {errors.tlc ? <ErrorMessage message={errors.tlc} /> : null}
                                    <label>Total Life Limit Cycles<span>*</span></label>
                                    <Input type="text" id="tlc" name="tlc" placeholder="Enter Total Life Limit Cycles" />
                                </div>

                                <div className={s.addEngineForm__form__link}>
                                    {errors.pbo ? <ErrorMessage message={errors.pbo} /> : null}
                                    <label>Period Between Overhauls<span>*</span></label>
                                    <Input type="date" id="pbo" name="pbo" placeholder="Enter Period Between Overhauls" />
                                </div>
                                <div className={s.addEngineForm__form__link}>
                                    {errors.tbo ? <ErrorMessage message={errors.tbo} /> : null}
                                    <label>Time Between Overhauls<span>*</span></label>
                                    <Input type="text" id="tbo" name="tbo" placeholder="Enter Time Between Overhauls" />
                                </div>
                                <div className={s.addEngineForm__form__link}>
                                    {errors.cbo ? <ErrorMessage message={errors.cbo} /> : null}
                                    <label>Cycles Between Overhauls<span>*</span></label>
                                    <Input type="text" id="cbo" name="cbo" placeholder="Enter Cycles Between Overhauls" />
                                </div>
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