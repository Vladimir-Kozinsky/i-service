import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import { withContainerBlur } from '../../../components/HOC/withContainerBlur/withContainerBlur';
import { hideSuccessMessage } from '../../../store/reducers/aircraftReducer';
import { AppDispatch } from '../../../store/store';
import Button from '../../buttons/Button';
import icon from './../../../assets/img/png/success-icon.png'
import s from './SuccessMessage.module.scss';

type SuccessMessageProps = {
    handler: () => any
}

const SuccessMessage = ({ handler }: SuccessMessageProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const buttonHandler = () => {
        dispatch(hideSuccessMessage())
    }
    return (
        <div className={s.message} >
            <h3 className={s.message__header} >Success!</h3>
            <span>Your request has been successfully <br />processed</span>
            <img className={s.message__icon} src={icon} alt="img" />
            <Button btnType='button' text='Continue' handler={buttonHandler} color="green" />
        </div >
    )
}

export default compose(withContainerBlur)(SuccessMessage);