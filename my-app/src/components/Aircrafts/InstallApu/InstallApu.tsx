import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select, { ActionMeta, SingleValue } from "react-select";
import { compose } from "redux";
import apuAPI from "../../../API/apuAPI";
import engineAPI from "../../../API/engineAPI";
import Button from "../../../common/buttons/Button";
import Input from "../../../common/Input";
import ErrorMessage from "../../../common/messages/ErrorMessage";
import { IAircraft, installApu, installEngine } from "../../../store/reducers/aircraftReducer";
import { AppDispatch } from "../../../store/store";
import { IApu, IEngine } from "../../../types/types";
import { checkFHFormat } from "../../../utils/forms";
import withSuccessMessage from "../../HOC/messageHoc";
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur";
import s from "./InstallApu.module.scss";

type InstallApuProps = {
    setPage: (page: boolean) => void;
    aircraft: IAircraft;
}

export type ApuInstallValues = {
    ACmsn: string;
    apuMsn: string;
    installDate: string;
    aircraftTsn: string;
    aircraftCsn: string;
    apuTsn: string;
    apuCsn: string;
}

interface IOption {
    value: number | null;
    label: string | null;
}

interface IApuOption {
    value: string | null;
    label: string | null;
}

const InstallApu: React.FC<InstallApuProps> = ({ setPage, aircraft }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [apus, setApus] = useState<any>([]);
    const [selectedApuOption, setSelectedApuOption] = useState<string | null>(null);

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

    const onChangeApu = (newValue: SingleValue<IApuOption>, actionMeta: ActionMeta<IApuOption>) => {
        if (newValue?.value) {
            setSelectedApuOption(newValue.value);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await apuAPI.getAvailApus();
                if (response.data) {
                    const apuOptions = response.data.map((apu: IApu) => {
                        return {
                            value: apu.msn,
                            label: `${apu.type} MSN: ${apu.msn}`,
                        }
                    })
                    setApus(apuOptions);
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
                    apuMsn: '',
                    //Installation
                    installDate: '',
                    aircraftTsn: '',
                    aircraftCsn: '',
                    apuTsn: '',
                    apuCsn: '',
                }}
                validate={values => {
                    interface IErrors {
                        ACmsn?: string | null;
                        apuMsn?: string | null;
                        installDate?: string | null;
                        aircraftTsn?: string | null;
                        aircraftCsn?: string | null;
                        apuTsn?: string | null;
                        apuCsn?: string | null;
                    }
                    const errors: IErrors = {};
                    if (!selectedApuOption) errors.apuMsn = 'Engine is required';
                    if (!values.installDate) errors.installDate = 'Engine Installation Date is required';
                    if (!values.aircraftTsn) errors.aircraftTsn = 'Aircraft TSN is required';
                    if (!checkFHFormat(values.aircraftTsn)) errors.aircraftTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.aircraftCsn) errors.aircraftCsn = 'Aircraft CSN is required';
                    if (!values.apuTsn) errors.apuTsn = 'Engine TSN is required';
                    if (!checkFHFormat(values.apuTsn)) errors.apuTsn = 'Invalid format, the format should be like "123456:22"';
                    if (!values.apuCsn) errors.apuCsn = 'Engine CSN is required';
                    return errors;
                }}
                onSubmit={(
                    values: ApuInstallValues,
                    { setSubmitting }: FormikHelpers<any>
                ) => {
                    values.ACmsn = aircraft.msn;
                    if (selectedApuOption) values.apuMsn = selectedApuOption
                    dispatch(installApu(values));
                    console.log(values)
                }}
            >
                {({ errors, touched }) => (
                    <Form className={s.installEngine__form}>
                        <div className={s.installEngine__form__wrap}>
                            <div className={s.installEngine__form__link}>
                                <label>Apu:<span>*</span></label>
                                <Select options={apus} onChange={onChangeApu} styles={customStyles} />
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
                                {errors.apuTsn ? <ErrorMessage message={errors.apuTsn} /> : null}
                                <label>Apu TSN <span>*</span></label>
                                <Input type="text" id="apuTsn" name="apuTsn" placeholder="Enter Engine TSN" />
                            </div>
                            <div className={s.installEngine__form__link}>
                                {errors.apuCsn ? <ErrorMessage message={errors.apuCsn} /> : null}
                                <label>Apu CSN <span>*</span></label>
                                <Input type="text" id="apuCsn" name="apuCsn" placeholder="Enter Engine CSN" />
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

export default compose(withContainerBlur, withSuccessMessage)(InstallApu);