import { Field, Form, Formik } from 'formik'
import React, { useContext } from 'react'
import s from './Feedback.module.scss'
import cross from '../../../assets/img/png/cross-input.png'
import { useTranslation } from 'react-i18next'
import { ThemeContext } from '../Main'

type IFeedbackValues = {
    name: string;
    phone: string;
    company: string;
    message: string;
}

const Feedback: React.FC = () => {
    const { t, i18n } = useTranslation();
    const appContext = useContext(ThemeContext);
    return (
        <Formik
            initialValues={{
                name: '',
                phone: '',
                company: '',
                message: ''
            }}
            validate={values => {
                interface IFeedback {
                    name?: string;
                    phone?: string;
                    company?: string;
                    message?: string;
                }
                const errors: IFeedback = {};
                if (!values.name) errors.name = 'Name is required';
                if (!values.phone) errors.phone = 'Email is required';
                if (!values.company) errors.company = 'Company is required';
                if (!values.message) errors.message = 'Message is required';
                return errors;
            }}
            onSubmit={(
                values: IFeedbackValues,
            ) => {
                console.log(values)
            }}
        >{({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
        }) => (
            <Form className={s.message} id={s[`${appContext?.theme}__main__message`]} >
                <h3 className={s.message__title}>{t("feedback_title")}</h3>
                <div className={s.message__field} >
                    {errors.name && <img src={cross} alt='cross-img' />}
                    <Field type="text" id="name" name="name" placeholder={t("name")} as='input' />
                </div>
                <div className={s.message__field} >
                    {errors.phone && <img src={cross} alt='cross-img' />}
                    <Field type="text" id="phone" name="phone" placeholder={t("phone")} as='input' />
                </div>
                <div className={s.message__field} >
                    {errors.company && <img src={cross} alt='cross-img' />}
                    <Field type="text" id="company" name="company" placeholder={t("company")} as='input' />
                </div>
                <div className={s.message__field} >
                    {errors.message && <img src={cross} alt='cross-img' />}
                    <Field type="text" id="message" name="message" placeholder={t("message")} as='textarea' />
                </div>
                <button className={s.message__btn}>{t("send")}</button>
            </Form>
        )}
        </Formik>
    )
}

export default Feedback;