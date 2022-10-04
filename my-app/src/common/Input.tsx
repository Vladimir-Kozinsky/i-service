import s from './Input.module.scss'
import { Field } from 'formik';

type InputProps = {
    type: string;
    id: string;
    name: string;
    placeholder: string;
    value?: string;
    disabled?: boolean;
}

const Input = ({ type, id, name, placeholder, value, disabled }: InputProps) => {
    return (
        <Field type={type}
            id={id} name={name}
            placeholder={placeholder}
            className={s.input}
            value={value} disabled={disabled} />
    )
}

export default Input