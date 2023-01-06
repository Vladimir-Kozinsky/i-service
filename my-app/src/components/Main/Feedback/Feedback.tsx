import { Field, Form, Formik } from 'formik'
import React from 'react'
import s from './Feedback.module.scss'
import cross from '../../../assets/img/png/cross-input.png'

type IFeedbackValues = {
    name: string;
    phone: string;
    company: string;
    message: string;
}

const Feedback: React.FC = () => {
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
            <Form className={s.message}>
                <h3 className={s.message__title}>Напишите нам</h3>
                <div className={s.message__field} >
                    {errors.name && <img src={cross} alt='cross-img' />}
                    <Field type="text" id="name" name="name" placeholder="Ваше имя" as='input' />
                </div>
                <div className={s.message__field} >
                    {errors.phone && <img src={cross} alt='cross-img' />}
                    <Field type="text" id="phone" name="phone" placeholder='Ваш телефон' as='input' />
                </div>
                <div className={s.message__field} >
                    {errors.company && <img src={cross} alt='cross-img' />}
                    <Field type="text" id="company" name="company" placeholder='Компания' as='input' />
                </div>
                <div className={s.message__field} >
                    {errors.message && <img src={cross} alt='cross-img' />}
                    <Field type="text" id="message" name="message" placeholder='Ваше сообщение' as='textarea' />
                </div>
                <button className={s.message__btn}>Отправить</button>
            </Form>
        )}
        </Formik>
    )
}

export default Feedback;