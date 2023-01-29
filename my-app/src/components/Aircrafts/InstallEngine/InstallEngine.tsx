import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ActionMeta, SingleValue } from "react-select";
import { compose } from "redux";
import engineAPI from "../../../API/engineAPI";
import Button from "../../../common/buttons/Button";
import Input from "../../../common/inputs/Input";
import FormSelect from "../../../common/Select/Select";
import { IAircraft, installEngine } from "../../../store/reducers/aircraftReducer";
import { AppDispatch } from "../../../store/store";
import { IEngine } from "../../../types/types";
import { checkFHFormat } from "../../../utils/forms";
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur";
import s from "./InstallEngine.module.scss";

type InstallEngineProps = {
    setPage: (page: boolean) => void;
    aircraft: IAircraft;
}

export type FormValues = {
    ACmsn: string;
    Emsn: string;
    position: string;
    installDate: string;
    aircraftTsn: string;
    aircraftCsn: string;
    engTsn: string;
    engCsn: string;
}

interface IOption {
    value: string | null;
    label: string | null;
}

interface IEngOption {
    value: string | null;
    label: string | null;
}

const options: IOption[] = [
    { value: '1', label: 'Pos. 1' },
    { value: '2', label: 'Pos. 2' },
    { value: '3', label: 'Pos. 3' },
    { value: '4', label: 'Pos. 4' }
]

const InstallEngine: React.FC<InstallEngineProps> = ({ setPage, aircraft }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedEngOption, setSelectedEngOption] = useState<string | null>(null);
    const [engines, setEngines] = useState<any>([]);

    const onChange = (newValue: SingleValue<IOption | null>, actionMeta: ActionMeta<IOption>) => {
        if (newValue?.value) setSelectedOption(newValue.value);
    }
    const onChangeEng = (newValue: SingleValue<IEngOption>, actionMeta: ActionMeta<IEngOption>) => {
        if (newValue?.value) setSelectedEngOption(newValue.value);
        console.log(newValue?.value)
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
    useEffect(() => {
        (async () => {
            try {
                const response = await engineAPI.getAvailEngines();
                if (response.data) {
                    const engOptions = response.data.map((engine: IEngine) => {
                        return {
                            value: engine.msn,
                            label: `${engine.type} MSN: ${engine.msn}`,
                        }
                    })
                    setEngines(engOptions);
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])
    return (
        <div className={s.installEngine}>
            <Formik
                initialValues={{
                    ACmsn: '',
                    Emsn: '',
                    //Installation
                    position: '0',
                    installDate: '',
                    aircraftTsn: '',
                    aircraftCsn: '',
                    engTsn: '',
                    engCsn: '',
                }}
                validate={values => {
                    interface IErrors {
                        ACmsn?: string | null;
                        Emsn?: string | null;
                        position?: string | null;
                        installDate?: string | null;
                        aircraftTsn?: string | null;
                        aircraftCsn?: string | null;
                        engTsn?: string | null;
                        engCsn?: string | null;
                    }
                    const errors: IErrors = {};
                    if (!selectedOption || selectedOption === 'error') errors.position = 'Type is required';
                    if (!selectedEngOption || selectedEngOption === 'error') errors.Emsn = 'Engine is required';
                    if (!values.installDate) errors.installDate = 'Engine Installation Date is required';
                    if (!values.aircraftTsn) errors.aircraftTsn = 'Aircraft TSN is required';
                    if (!checkFHFormat(values.aircraftTsn)) errors.aircraftTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.aircraftCsn) errors.aircraftCsn = 'Aircraft CSN is required';
                    if (!values.engTsn) errors.engTsn = 'Engine TSN is required';
                    if (!checkFHFormat(values.engTsn)) errors.engTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.engCsn) errors.engCsn = 'Engine CSN is required';
                    console.log(errors)
                    return errors;
                }}
                onSubmit={(
                    values: FormValues,
                    { setSubmitting }: FormikHelpers<any>
                ) => {
                    values.ACmsn = aircraft.msn;
                    if (selectedOption) values.position = selectedOption
                    if (selectedEngOption) values.Emsn = selectedEngOption
                    console.log(values)
                    dispatch(installEngine(values));
                }}
            >
                {({ errors, values, touched, handleChange }) => (
                    <Form className={s.installEngine__form}>
                        <div className={s.installEngine__form__wrap}>
                            <div className={s.installEngine__form__link}>
                                <label>Position:<span>*</span></label>
                                <Field id='position' name='position' type='select' value={values.position}
                                    setSelectedOption={setSelectedOption} onChange={onChange} as={FormSelect}
                                    placeholder='Position' error={selectedOption} options={options}
                                    customStyles={customStyles} errorMessage={'Engine position is required'} />
                            </div>
                            <div className={s.installEngine__form__link}>
                                <label>Engine:<span>*</span></label>
                                <Field id='Emsn' name='Emsn' type='select' value={values.position}
                                    setSelectedOption={setSelectedEngOption} onChange={onChangeEng} as={FormSelect}
                                    placeholder='Msn' error={selectedEngOption} options={engines}
                                    customStyles={customStyles} errorMessage={'Engine is required'} />
                            </div>

                            {[
                                {
                                    label: "Installation Date", type: "date", id: "installDate", name: "installDate",
                                    value: values.installDate, error: errors.installDate, placeholder: "Enter installation Date"
                                },
                                {
                                    label: "Aircraft TSN", type: "text", id: "aircraftTsn", name: "aircraftTsn",
                                    value: values.aircraftTsn, error: errors.aircraftTsn, placeholder: "Enter Aircrfat TSN"
                                },
                                {
                                    label: "Aircraft CSN", type: "text", id: "aircraftCsn", name: "aircraftCsn",
                                    value: values.aircraftCsn, error: errors.aircraftCsn, placeholder: "Enter Aircrfat CSN"
                                },
                                {
                                    label: "Engine TSN", type: "text", id: "engTsn", name: "engTsn",
                                    value: values.engTsn, error: errors.engTsn, placeholder: "Enter Engine TSN"
                                },
                                {
                                    label: "Engine CSN", type: "text", id: "engCsn", name: "engCsn",
                                    value: values.engCsn, error: errors.engCsn, placeholder: "Enter Engine CSN"
                                },
                            ].map((field: any) => {
                                return (
                                    <div key={field.label} className={s.installEngine__form__link}>
                                        <label>{field.label}<span>*</span></label>
                                        <Field type={field.type} id={field.id} name={field.name} value={field.value} onChange={handleChange} as={Input}
                                            disabled={field.disabled} placeholder={field.placeholder} error={field.error} min="0" />
                                    </div>
                                )
                            })
                            }
                        </div>
                        <div className={s.buttons} >
                            <Button text="Back" btnType="button" color="white" handler={() => setPage(false)} />
                            <Button text="Install" btnType="submit" color="green" />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default compose(withContainerBlur)(InstallEngine);