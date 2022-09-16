import s from './SignUp.module.scss';
import userAvatar from '../../assets/img/png/user-avatar.png'
import { Form, Formik, FormikHelpers } from 'formik';
import Input from '../../common/Input';
import Button from '../../common/buttons/Button';
import { useDispatch } from 'react-redux';
import { signIn, signUp } from '../../store/reducers/authReducer';
import { AppDispatch } from '../../store/store';

export interface ISignUpValues {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    position: string;
}

const SignUp = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className={s.signout__container}>
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
                    onSubmit={(
                        values: ISignUpValues,
                        { setSubmitting }: FormikHelpers<ISignUpValues>
                    ) => {
                        dispatch(signUp(values));
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
                        <div className={s.auth__form__btns} >
                            <Button text="Cancel" color="white" btnType="button" />
                            <Button text="Sign Up" color="green" btnType="submit" />
                        </div>
                    </Form>
                </Formik>
            </div>
        </div >
    )
}

export default SignUp;