import classNames from 'classnames';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import Input from '../../common/Input';
import s from './Auth.module.scss';

interface Values {
    firstName: string;
    lastName: string;
    email: string;
}

class Auth extends React.Component {
    render(): React.ReactNode {
        return (
            <div className={s.auth}>
                <h4 className={classNames(s.auth__header, s.auth__header__welcome)}>Welcome back!</h4>
                <h3 className={classNames(s.auth__header, s.auth__header__signin)}>Sign in to your account</h3>
                <h5 className={classNames(s.auth__header, s.auth__header__signup)}>Don't have an account? <a>Sign Up</a></h5>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                    }}
                    onSubmit={(
                        values: Values,
                        { setSubmitting }: FormikHelpers<Values>
                    ) => {
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                        }, 500);
                    }}
                >
                    <Form className={s.auth__form}>
                        <Input type="email" id="email" name="email" placeholder="john@acme.com" />
                        <Input type="password" id="password" name="password" placeholder="Password" />
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </div >
        )
    }
}

export default Auth;