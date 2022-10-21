import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select, { ActionMeta, SingleValue } from "react-select";
import { compose } from "redux";
import engineAPI from "../../../API/engineAPI";
import Button from "../../../common/buttons/Button";
import Input from "../../../common/Input";
import ErrorMessage from "../../../common/messages/ErrorMessage";
import { IAircraft, installEngine } from "../../../store/reducers/aircraftReducer";
import { AppDispatch } from "../../../store/store";
import { IEngine } from "../../../types/types";
import { checkFHFormat } from "../../../utils/forms";
import withSuccessMessage from "../../HOC/messageHoc";
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur";
import s from "./InstallEngine.module.scss";

type InstallEngineProps = {
    setPage: (page: boolean) => void;
    aircraft: IAircraft;
}

export type FormValues = {
    ACmsn: string;
    Emsn: string;
    position: number;
    installDate: string;
    aircraftTsn: string;
    aircraftCsn: string;
    engTsn: string;
    engCsn: string;
}

interface IOption {
    value: number | null;
    label: string | null;
}

interface IEngOption {
    value: string | null;
    label: string | null;
}

const options: IOption[] = [
    { value: 1, label: 'Pos. 1' },
    { value: 2, label: 'Pos. 2' },
    { value: 3, label: 'Pos. 3' },
    { value: 4, label: 'Pos. 4' }
]

const InstallEngine: React.FC<InstallEngineProps> = ({ setPage, aircraft }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [selectedEngOption, setSelectedEngOption] = useState<string | null>(null);
    const [engines, setEngines] = useState<any>([]);

    const onChange = (newValue: SingleValue<IOption>, actionMeta: ActionMeta<IOption>) => {
        if (newValue?.value) {
            setSelectedOption(newValue.value);
        }
    }
    const onChangeEng = (newValue: SingleValue<IEngOption>, actionMeta: ActionMeta<IEngOption>) => {
        if (newValue?.value) {
            setSelectedEngOption(newValue.value);
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
                    position: 0,
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
                    if (!selectedEngOption) errors.Emsn = 'Engine is required';
                    if (!selectedOption) errors.position = 'Engine Position is required';
                    if (!values.installDate) errors.installDate = 'Engine Installation Date is required';
                    if (!values.aircraftTsn) errors.aircraftTsn = 'Aircraft TSN is required';
                    if (!checkFHFormat(values.aircraftTsn)) errors.aircraftTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.aircraftCsn) errors.aircraftCsn = 'Aircraft CSN is required';
                    if (!values.engTsn) errors.engTsn = 'Engine TSN is required';
                    if (!checkFHFormat(values.engTsn)) errors.engTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.engCsn) errors.engCsn = 'Engine CSN is required';
                    return errors;
                }}
                onSubmit={(
                    values: FormValues,
                    { setSubmitting }: FormikHelpers<any>
                ) => {
                    values.ACmsn = aircraft.msn;
                    if (selectedOption) values.position = selectedOption
                    if (selectedEngOption) values.Emsn = selectedEngOption
                    dispatch(installEngine(values));
                }}
            >
                {({ errors, touched }) => (
                    <Form className={s.installEngine__form}>
                        <div className={s.installEngine__form__wrap}>
                            <div className={s.installEngine__form__link}>
                                <label>Position:<span>*</span></label>
                                <Select options={options} onChange={onChange} styles={customStyles} />
                            </div>
                            <div className={s.installEngine__form__link}>
                                <label>Engine:<span>*</span></label>
                                <Select options={engines} onChange={onChangeEng} styles={customStyles} />
                            </div>

                            <div className={s.installEngine__form__link}>
                                {errors.installDate ? <ErrorMessage message={errors.installDate} /> : null}
                                <label>Installation Date <span>*</span></label>
                                <Input type="date" id="installDate" name="installDate" placeholder="Enter installation Date" />
                            </div>
                            <div className={s.installEngine__form__link}>
                                {errors.aircraftTsn ? <ErrorMessage message={errors.aircraftTsn} /> : null}
                                <label>Aircraft TSN <span>*</span></label>
                                <Input type="text" id="aircraftTsn" name="aircraftTsn" placeholder="Enter Aircrfat TSN" />
                            </div>
                            <div className={s.installEngine__form__link}>
                                {errors.aircraftCsn ? <ErrorMessage message={errors.aircraftCsn} /> : null}
                                <label>Aircraft CSN <span>*</span></label>
                                <Input type="text" id="aircraftCsn" name="aircraftCsn" placeholder="Enter Aircrfat CSN" />
                            </div>
                            <div className={s.installEngine__form__link}>
                                {errors.engTsn ? <ErrorMessage message={errors.engTsn} /> : null}
                                <label>Engine TSN <span>*</span></label>
                                <Input type="text" id="engTsn" name="engTsn" placeholder="Enter Engine TSN" />
                            </div>
                            <div className={s.installEngine__form__link}>
                                {errors.engCsn ? <ErrorMessage message={errors.engCsn} /> : null}
                                <label>Engine CSN <span>*</span></label>
                                <Input type="text" id="engCsn" name="engCsn" placeholder="Enter Engine CSN" />
                            </div>
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

export default compose(withContainerBlur, withSuccessMessage)(InstallEngine);