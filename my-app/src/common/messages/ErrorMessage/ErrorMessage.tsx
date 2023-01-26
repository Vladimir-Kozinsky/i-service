import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { withContainerBlur } from '../../../components/HOC/withContainerBlur/withContainerBlur';
import { hideErrorMessage } from '../../../store/reducers/aircraftReducer';
import { AppDispatch } from '../../../store/store';
import Button from '../../buttons/Button';
import icon from './../../../assets/img/png/fail-icon.png'
import s from './ErrorMessage.module.scss';

type ErrorMessageProps = {
    handler: () => any
}

const ErrorMessage = ({ handler }: ErrorMessageProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const buttonHandler = () => {
        dispatch(hideErrorMessage())
    }
    return (
        <div className={s.error} >
            <h3 className={s.error__header} >Error!</h3>
            <span>Your request has been faild.</span>
            <img className={s.error__icon} src={icon} alt="img" />
            <Button btnType='button' text='Continue' handler={buttonHandler} color="green" />
        </div >
    )
}

export default compose(withContainerBlur)(ErrorMessage);