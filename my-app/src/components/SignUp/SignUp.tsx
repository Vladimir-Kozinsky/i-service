import s from './SignUp.module.scss';
import userAvatar from '../../assets/img/png/user-avatar.png'
import { Form, Formik, FormikHelpers } from 'formik';
import Input from '../../common/Input';
import Button from '../../common/buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearSignUpErrorMessage, signUp } from '../../store/reducers/authReducer';
import { AppDispatch } from '../../store/store';
import {  useNavigate, Navigate } from "react-router-dom";
import { compose } from 'redux';
import withSuccessMessage from '../HOC/messageHoc';

export interface ISignUpValues {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    position: string;
}

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isAuth = useSelector((state: any) => state.auth.isAuth)
    const isSignUpError = useSelector((state: any) => state.auth.isSignUpError)
    const signUpErrorMessage = useSelector((state: any) => state.auth.signUpErrorMessage)
    return (
        <div className={s.signout__container}>
            {isAuth ? <Navigate to="/dashboard" replace={true} /> : null}
            <div className={s.background__circle}></div>
            <div className={s.signout} >
                <div className={s.signout__avatar} >
                    <img className={s.signout__avatar__img} src={userAvatar} />
                </div>
                <h3 className={s.signout__header}>Create an Account</h3>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        firstName: '',
                        lastName: '',
                        position: ''
                    }}
                    validate={values => {
                        interface IErrors {
                            email?: string;
                            password?: string;
                            firstName?: string;
                            lastName?: string;
                            position?: string;
                        }
                        const errors: IErrors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) errors.password = 'Required';
                        if (!values.firstName) errors.firstName = 'Required';
                        if (!values.lastName) errors.lastName = 'Required';
                        if (!values.position) errors.position = 'Required';
                        return errors;
                    }}
                    onSubmit={(
                        values: ISignUpValues,
                        { setSubmitting }: FormikHelpers<ISignUpValues>
                    ) => {
                        dispatch(signUp(values));
                        dispatch(clearSignUpErrorMessage());
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className={s.auth__form}>
                            <div className={s.auth__form__link}>
                                <label>Email</label>
                                <Input type="email" id="email" name="email" placeholder="john@acme.com" />
                            </div>
                            <div className={s.auth__form__link}>
                                <label>Password</label>
                                <Input type="password" id="password" name="password" placeholder="Password" />
                            </div>
                            <div className={s.auth__form__link}>
                                <label>First Name</label>
                                <Input type="text" id="firstName" name="firstName" placeholder="First Name" />
                            </div>
                            <div className={s.auth__form__link}>
                                <label>Last Name</label>
                                <Input type="text" id="lastName" name="lastName" placeholder="Last Name" />
                            </div>
                            <div className={s.auth__form__link}>
                                <label>Position</label>
                                <Input type="text" id="position" name="position" placeholder="Position" />
                            </div>
                            {isSignUpError
                                ? <div className={s.error_message}>{'* ' + signUpErrorMessage}</div>
                                : null}
                            <div className={s.auth__form__btns} >
                                <Button text="Cancel" color="white" btnType="button" handler={() => navigate("/auth")} />
                                <Button text="Sign Up" color="green" btnType="submit" />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div >
    )
}

export default compose(withSuccessMessage)(SignUp);