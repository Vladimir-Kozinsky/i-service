import { useSelector } from 'react-redux';
import SuccessMessage from '../../common/messages/SuccessMessage/SuccessMessage';
import { hideSuccessMessage } from '../../store/reducers/aircraftReducer';

const withSuccessMessage = (Component: any) => () => {
    const isAuthSuccessMessage = useSelector((state: any) => state.auth.isSuccessMessage)
    const isAircraftSuccessMessage = useSelector((state: any) => state.aircraft.isSuccessMessage)

    const NewComponent = () => {
        if (isAuthSuccessMessage) return <SuccessMessage route='/auth' handler={hideSuccessMessage} />
        if (isAircraftSuccessMessage) return <SuccessMessage route='/dashboard' handler={hideSuccessMessage} />
        return <Component />
    }
    return <NewComponent />;
}

export default withSuccessMessage;