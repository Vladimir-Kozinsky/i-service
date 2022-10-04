import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../../store/store';
import icon from './../../../assets/img/png/success-icon.png'
import s from './SuccessMessage.module.scss';

type SuccessMessageProps = {
    route: string;
    handler: () => any
}

const SuccessMessage = ({ route, handler }: SuccessMessageProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const setSignUpMessage = () => {
        dispatch(handler())
    }
    return (
        <div className={s.message}>
            <h3 className={s.message__header}>Success!</h3>
            <span>Your request has been successfully <br />processed</span>
            <img className={s.message__icon} src={icon} alt="img" />
            <Link onClick={setSignUpMessage} className={s.message__btn} to={route} >Continue</Link>
        </div>
    )
}

export default SuccessMessage;