import s from './SignUp.module.scss';
import userAvatar from '../../assets/img/png/user-avatar.png'
import icon from '../../assets/img/png/success-icon.png'
import { Form, Formik, FormikHelpers } from 'formik';
import Input from '../../common/Input';
import Button from '../../common/buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearSignUpErrorMessage, clearSignUpMessage, signUp } from '../../store/reducers/authReducer';
import { AppDispatch } from '../../store/store';
import { Link, useNavigate, Navigate } from "react-router-dom";

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
    const isAuth = useSelector((state: any) => state.isAuth)
    const signUpMessage = useSelector((state: any) => state.signUpMessage)
    const isSignUpError = useSelector((state: any) => state.isSignUpError)
    const signUpErrorMessage = useSelector((state: any) => state.signUpErrorMessage)
    const setSignUpMessage = () => {
        dispatch(clearSignUpMessage());
    }
    return (
        <div className={s.signout__container}>
            {isAuth ? <Navigate to="/dashboard" replace={true} /> : null}
            <div className={s.background__circle}></div>
            {signUpMessage.length
                ? <div className={s.message}>
                    <h3 className={s.message__header}>Succses!</h3>
                    <span>Your account has been created</span>
                    <img className={s.message__icon} src={icon} alt="img" />
                    <Link onClick={setSignUpMessage} className={s.message__btn} to="/auth">Continue</Link>
                </div>
                : null}
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
                    onSubmit={(
                        values: ISignUpValues,
                        { setSubmitting }: FormikHelpers<ISignUpValues>
                    ) => {
                        dispatch(signUp(values));
                        dispatch(clearSignUpErrorMessage());
                    }}
                >
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
                            ? <span className={s.error_message}>{'* ' + signUpErrorMessage}</span>
                            : null}
                        <div className={s.auth__form__btns} >
                            <Button text="Cancel" color="white" btnType="button" handler={() => navigate("/auth")} />
                            <Button text="Sign Up" color="green" btnType="submit" />
                        </div>
                    </Form>
                </Formik>
            </div>
        </div >
    )
}

export default SignUp;