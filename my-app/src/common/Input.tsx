import s from './Input.module.scss'
import { Field } from 'formik';

type InputProps = {
    type: String;
    id: String;
    name: String;
    placeholder: String;
}

const Input = ({ type, id, name, placeholder }: InputProps) => {
    return (
        <Field type={type}
            id={id} name={name}
            placeholder={placeholder}
            className={s.input} />
    )
}

export default Input