import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select, { ActionMeta, SingleValue } from "react-select";
import { compose } from "redux";
import Button from "../../../common/buttons/Button";
import Input from "../../../common/Input";
import { IAircraft, IInstEngine, removeEngine } from "../../../store/reducers/aircraftReducer";
import { AppDispatch } from "../../../store/store";
import withSuccessMessage from "../../HOC/messageHoc";
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur";
import s from "./RemovalEngine.module.scss";

type RemovalEngineProps = {
    setPage: (page: boolean) => void;
    aircraft: IAircraft;
}

type posOptionsType = {
    value: { pos: string, msn: string };
    label: string;
}

export type RemEngFormDataType = {
    msn: string;
    position: string;
    engineMSN: string;
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


const RemovalEngine: React.FC<RemovalEngineProps> = ({ setPage, aircraft }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [posOptions, setPosOptions] = useState<posOptionsType[]>([]);
    const [engineMSN, setEngineMSN] = useState<string>('');
    const [position, setposition] = useState('');
    const onChange = (newValue: SingleValue<posOptionsType>, actionMeta: ActionMeta<posOptionsType>) => {
        if (newValue?.value) {
            setposition(newValue.value.pos);
            setEngineMSN(newValue.value.msn);
        }
    }
    useEffect(() => {
        const options: posOptionsType[] = aircraft.engines.map((engine: IInstEngine): posOptionsType => {
            return { value: { pos: engine.pos.toString(), msn: engine.msn }, label: `Pos.: ${engine.pos} MSN: ${engine.msn}` };
        })
        setPosOptions(options)
    }, [aircraft.engines])
    return (
        <div className={s.removalEngine} >
            <h2 className={s.removalEngine__header}>Engine Removal</h2>
            <Formik
                initialValues={{
                    msn: '',
                    position: '',
                    engineMSN: ''
                }}
                validate={values => {
                    interface IErrors {
                        msn?: string | null;
                        position?: string | null;
                        engineMSN?: string | null;
                    }
                    const errors: IErrors = {};
                    if (!aircraft.msn) errors.msn = 'Aircraft MSN is required';
                    if (!position) errors.position = 'Engine position is required';
                    if (!engineMSN) errors.engineMSN = 'Engine MSN is required';
                    return errors;
                }}
                onSubmit={(
                    values: RemEngFormDataType,
                    { setSubmitting }: FormikHelpers<any>
                ) => {
                    values.msn = aircraft.msn;
                    values.position = position;
                    values.engineMSN = engineMSN;
                    dispatch(removeEngine(values));
                }}
            >
                {({ errors, touched }) => (
                    <Form className={s.removalEngine__form}>
                        <div className={s.removalEngine__form__wrap}>
                            <div className={s.removalEngine__form__link}>
                                <label>Position:<span>*</span></label>
                                <Select options={posOptions} onChange={onChange} styles={customStyles} />
                            </div>
                            <div className={s.removalEngine__form__link}>
                                <label>Engine MSN:<span>*</span></label>
                                <Input type="text" name='msn' id="msn" placeholder='MSN' value={engineMSN} disabled />
                            </div>
                        </div>
                        <div className={s.buttons} >
                            <Button text="Back" btnType="button" color="white" handler={() => setPage(false)} />
                            <Button text="Remove" btnType="submit" color="green" />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default compose(withContainerBlur, withSuccessMessage)(RemovalEngine);