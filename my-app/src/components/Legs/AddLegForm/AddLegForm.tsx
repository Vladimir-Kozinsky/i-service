import { Form, Formik, FormikHelpers } from "formik";
import { compose } from "redux";
import Button from "../../../common/buttons/Button";
import Input from "../../../common/Input";
import ErrorMessage from "../../../common/messages/ErrorMessage";
import { withContainerBlur } from "../../HOC/withContainerBlur/withContainerBlur";
import s from "./AddLegForm.module.scss"

interface ILeg {
    depDate: string;
    flightNumber: string;
    from: string;
    to: string;
    blockOff: string;
    takeOff: string;
    landing: string;
    blockOn: string;
    flightTime: string;
    blockTime: string;
    fh: string;
    fc: string;
}

type AddLegFormProps = {
    setAddLegForm: (addLegForm: boolean) => void;
    msn: string
}
const AddLegForm = ({ setAddLegForm, msn }: AddLegFormProps) => {
    return (
        <div className={s.addLeg} >
            <h3 className={s.addLeg__header}>Add a leg</h3>
            <Formik
                initialValues={{
                    depDate: '',
                    flightNumber: '',
                    from: '',
                    to: '',
                    blockOff: '',
                    takeOff: '',
                    landing: '',
                    blockOn: '',
                    flightTime: '',
                    blockTime: '20',
                    fh: '',
                    fc: '',
                }}
                validate={values => {
                    interface IErrors {
                        depDate?: string;
                        flightNumber?: string;
                        from?: string;
                        to?: string;
                        blockOff?: string;
                        takeOff?: string;
                        landing?: string;
                        blockOn?: string;
                        flightTime?: string;
                        blockTime?: string;
                        fh?: string;
                        fc?: string;
                    }
                    const errors: IErrors = {};

                    if (!values.depDate) errors.depDate = 'Date is required';
                    if (!values.flightNumber) errors.flightNumber = 'Reg No is required';
                    if (!values.from) errors.from = 'FH is required';
                    if (!values.to) errors.to = 'FC si required';
                    if (!values.blockOff) errors.blockOff = 'Serial number is required';
                    if (!values.blockOn) errors.blockOn = 'Serial number is required';
                    // if (!values.flightTime) errors.flightTime = 'Serial number is required';
                    if (!values.blockTime) errors.blockTime = 'Serial number is required';
                    if (!values.fh) errors.fh = 'Serial number is required';
                    if (!values.fc) errors.fc = 'Serial number is required';
                    return errors;
                }}
                onSubmit={(
                    values: ILeg,
                    { setSubmitting }: FormikHelpers<any>
                ) => {
                    const payload = {

                    }
                    // dispatch(addAircraft(payload));
                    console.log('add leg', values)
                }}
            >
                {({ errors, touched }) => (
                    <Form className={s.addLeg__form}>
                        <div className={s.addLeg__form__wrap}>
                            <div className={s.addLeg__form__link}>
                                {errors.depDate ? <ErrorMessage message={errors.depDate} /> : null}
                                <label>Date <span>*</span></label>
                                <Input type="date" id="depDate" name="depDate" placeholder="Enter Date" />
                            </div>
                            <div className={s.addLeg__form__link}>
                                {errors.flightNumber ? <ErrorMessage message={errors.flightNumber} /> : null}
                                <label>Flight No <span>*</span></label>
                                <Input type="text" id="flightNumber" name="flightNumber" placeholder="Enter Flight No" />
                            </div>
                            <div className={s.addLeg__form__link}>
                                {errors.from ? <ErrorMessage message={errors.from} /> : null}
                                <label>Depature airport <span>*</span></label>
                                <Input type="text" id="from" name="from" placeholder="Enter depature airport" />
                            </div>
                            <div className={s.addLeg__form__link}>
                                {errors.to ? <ErrorMessage message={errors.to} /> : null}
                                <label>Arrive airport <span>*</span></label>
                                <Input type="text" id="to" name="to" placeholder="Enter arrive airport" />
                            </div>
                            <div className={s.addLeg__form__link}>
                                {errors.blockOff ? <ErrorMessage message={errors.blockOff} /> : null}
                                <label>Block Off <span>*</span></label>
                                <Input type="text" id="blockOff" name="blockOff" placeholder="Enter Block Off" />
                            </div>
                            <div className={s.addLeg__form__link}>
                                {errors.blockOn ? <ErrorMessage message={errors.blockOn} /> : null}
                                <label>Block On <span>*</span></label>
                                <Input type="text" id="blockOn" name="blockOn" placeholder="Enter Block On" />
                            </div>
                            <div className={s.addLeg__form__link}>
                                {errors.flightTime ? <ErrorMessage message={errors.flightTime} /> : null}
                                <label>Flight Time <span>*</span></label>
                                <Input type="text" id="flightTime" name="flightTime" placeholder="Enter Flight Time" value="203" disabled={true} />
                            </div>
                            <div className={s.addLeg__form__link}>
                                {errors.blockTime ? <ErrorMessage message={errors.blockTime} /> : null}
                                <label>Block Time<span>*</span></label>
                                <Input type="text" id="blockTime" name="blockTime" placeholder="Enter Block Time" />
                            </div>
                            <div className={s.addLeg__form__link}>
                                {errors.fh ? <ErrorMessage message={errors.fh} /> : null}
                                <label>FH<span>*</span></label>
                                <Input type="text" id="fh" name="fh" placeholder="Enter FH" />
                            </div>
                            <div className={s.addLeg__form__link}>
                                {errors.fc ? <ErrorMessage message={errors.fc} /> : null}
                                <label>FC<span>*</span></label>
                                <Input type="text" id="fc" name="fc" placeholder="Enter FC" />
                            </div>
                           
                        </div>
                        <div className={s.addLeg__btns} >
                            <Button text="Cancel" color="white" btnType="button" handler={() => setAddLegForm(false)} />
                            <Button text="Add" color="green" btnType="submit" />
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    )
}

export default compose(withContainerBlur)(AddLegForm);