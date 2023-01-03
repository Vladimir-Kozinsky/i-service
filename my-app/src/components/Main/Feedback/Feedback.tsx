import { Field, Form, Formik } from 'formik';
import React from 'react'
import s from './Feedback.module.scss'

type IFeedbackValues = {
    name: string;
    number: string;
    company: string;
    message: string;
}

const Feedback: React.FC = () => {
    return (
        <div className={s.message} >
            <Formik
                initialValues={{
                    name: '',
                    number: '',
                    company: '',
                    message: ''
                }}
                validate={values => {
                    interface IFeedback {
                        name?: string;
                        number?: string;
                        company?: string;
                        message?: string;
                    }
                    const errors: IFeedback = {};
                    if (!values.name) errors.name = 'Name is required';
                    if (!values.number) errors.number = 'Email is required';
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
                    <Field type="text" id="name" name="name" placeholder="Ваше имя" error={errors.name} as='input' />
                    <Field type="text" id="number" name="number" placeholder='Ваш телефон' error={errors.number} as='input' />
                    <Field type="text" id="company" name="company" placeholder='Компания' error={errors.number} as='input' />
                    <Field type="text" id="message" name="message" placeholder='Ваше сообщение' error={errors.number} as='textarea' />
                    <button className={s.message__btn}>Отправить</button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default Feedback;