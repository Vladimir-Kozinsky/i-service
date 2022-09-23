import { useSelector } from 'react-redux';
import SuccessMessage from '../../common/messages/SuccessMessage/SuccessMessage';
import { hideSuccessMessage } from '../../store/reducers/aircraftReducer';
import { hideAuthSuccessMessage } from '../../store/reducers/authReducer';

const withSuccessMessage = (Component: any) => () => {
    const isAuthSuccessMessage = useSelector((state: any) => state.auth.isSuccessMessage)
    const isAircraftSuccessMessage = useSelector((state: any) => state.aircraft.isSuccessMessage)

    const NewComponent = () => {
        if (isAuthSuccessMessage) return <SuccessMessage route='/auth' handler={hideAuthSuccessMessage} />
        if (isAircraftSuccessMessage) return <SuccessMessage route='/dashboard' handler={hideSuccessMessage} />
        return <Component />
    }
    return <NewComponent />;
}

export default withSuccessMessage;