import { useSelector } from 'react-redux';
import SuccessMessage from '../../common/messages/SuccessMessage/SuccessMessage';
import { hideSuccessMessage } from '../../store/reducers/aircraftReducer';
import { hideAuthSuccessMessage } from '../../store/reducers/authReducer';
import { hideEngineSuccessMessage } from '../../store/reducers/engineReducer';

const withSuccessMessage = (Component: any) => ({ ...props }) => {
    const isAuthSuccessMessage = useSelector((state: any) => state.auth.isSuccessMessage)
    const isAircraftSuccessMessage = useSelector((state: any) => state.aircraft.isSuccessMessage)
    const isEngineSuccessMessage = useSelector((state: any) => state.engine.isSuccessMessage)

    const NewComponent = () => {
        if (isAuthSuccessMessage) return <SuccessMessage route='/auth' handler={hideAuthSuccessMessage} />
        if (isAircraftSuccessMessage) return <SuccessMessage handler={hideSuccessMessage} />
        if (isEngineSuccessMessage) return <SuccessMessage route='/dashboard/engines' handler={hideEngineSuccessMessage} />
        return <Component {...props} />
    }
    return <NewComponent />;
}

export default withSuccessMessage;