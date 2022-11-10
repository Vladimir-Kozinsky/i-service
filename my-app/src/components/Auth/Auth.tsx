import classNames from 'classnames';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import Button from '../../common/buttons/Button';
import s from './Auth.module.scss';
import { signIn } from './../../store/reducers/authReducer';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from 'redux';
import { withDashboardRedirect } from '../HOC/withDashboardRedirect';
import { CSSTransition } from 'react-transition-group';
import Input from '../../common/inputs/Input';

export interface IAuthValues {
    email: string;
    password: string;
}

type AuthPropsType = {
    signIn: ({ email, password }: IAuthValues) => void;
    isAuthError: boolean;
    isAuth: boolean;
}

class Auth extends React.Component<AuthPropsType> {
    state: {
        isAuthError: boolean
    }
    myRef: any;
    constructor(props: AuthPropsType) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            isAuthError: false
        }
    }
    componentDidUpdate(prevProps: AuthPropsType) {
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
                        validate={values => {
                            interface IAuth {
                                email?: string;
                                password?: string;
                            }
                            const errors: IAuth = {};
                            if (!values.email) errors.email = 'Email is required';
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Invalid email address';
                            if (!values.password) errors.password = 'Password is required';
                            return errors;
                        }}
                        onSubmit={(
                            values: IAuthValues,
                            { setSubmitting }: FormikHelpers<IAuthValues>
                        ) => {
                            this.props.signIn(values);
                        }}
                    >{({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <Form className={s.auth__form}>
                            <CSSTransition
                                in={this.state.isAuthError}
                                nodeRef={this.myRef}
                                timeout={500}
                                classNames={{
                                    ...s,
                                    enterActive: s['enter-active'],
                                }}
                                unmountOnExit
                            >
                                <div ref={this.myRef} className={s.auth__message}>Incorrect e-mail or password</div>
                            </CSSTransition>
                            <div className={s.auth__form__block}>
                                <Field type="email" id="email" name="email" placeholder="john@acme.com" error={errors.email} as={Input} />
                            </div>
                            <div className={s.auth__form__block}>
                                <Field type="password" id="password" name="password" placeholder="Password" error={errors.password} as={Input} />
                            </div>
                            <Button text="Login" color="green" btnType="submit" />
                        </Form>
                    )}
                    </Formik>
                </div >
            </div >
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
