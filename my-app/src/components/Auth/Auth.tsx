import classNames from 'classnames';
import { Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import Button from '../../common/buttons/Button';
import Input from '../../common/Input';
import s from './Auth.module.scss';
import { signIn } from './../../store/reducers/authReducer';
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { compose } from 'redux';
import { withDashboardRedirect } from '../HOC/withDashboardRedirect';

export interface IAuthValues {
    email: string;
    password: string;
}

type AuthProps = {
    signIn: ({ email, password }: IAuthValues) => void;
    isAuthError: boolean;
    isAuth: boolean;
}

class Auth extends React.Component<AuthProps> {
    state: {
        isAuthError: boolean
    }
    constructor(props: AuthProps) {
        super(props);
        this.state = {
            isAuthError: false
        }
    }
    componentDidUpdate(prevProps: AuthProps) {
        if (this.props.isAuthError !== prevProps.isAuthError) {
            this.setAuthError(this.props.isAuthError);
        }
    }

    setAuthError(isAuthError: boolean) {
        if (isAuthError) {
            this.setState({ isAuthError: true });
        } else {
            this.setState({ isAuthError: false });
        }
    }

    render(): React.ReactNode {
        return (
            <div className={s.auth__container}>
                <div className={s.background__circle}></div>
                <div className={s.auth}>
                    <h4 className={classNames(s.auth__header, s.auth__header__welcome)}>Welcome back!</h4>
                    <h3 className={classNames(s.auth__header, s.auth__header__signin)}>Sign in to your account</h3>
                    <h5 className={classNames(s.auth__header, s.auth__header__signup)}>Don't have an account? <Link to="/signup">Sign Up</Link></h5>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={(
                            values: IAuthValues,
                            { setSubmitting }: FormikHelpers<IAuthValues>
                        ) => {
                            this.props.signIn(values);
                        }}
                    >
                        <Form className={s.auth__form}>
                            {this.state.isAuthError
                                ? <div className={s.auth__message}>Incorrect e-mail or password</div>
                                : null}
                            <Input type="email" id="email" name="email" placeholder="john@acme.com" />
                            <Input type="password" id="password" name="password" placeholder="Password" />
                            <Button text="Login" color="green" btnType="submit" />
                        </Form>
                    </Formik>
                </div >
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        isAuthError: state.auth.isAuthError,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = { signIn };

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withDashboardRedirect
)(Auth);
