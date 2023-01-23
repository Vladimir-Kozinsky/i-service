import { useSelector } from 'react-redux';
import SuccessMessage from '../../common/messages/SuccessMessage/SuccessMessage';
import { hideSuccessMessage } from '../../store/reducers/aircraftReducer';

const withAircraftSuccMess = (Component: any) => ({ ...props }) => {
    const isAircraftSuccessMessage = useSelector((state: any) => state.aircraft.isSuccessMessage)
    const NewComponent = () => {
        return (
            <>
                <SuccessMessage
                    handler={hideSuccessMessage}
                    toggle={isAircraftSuccessMessage} />
                <Component {...props} />
            </>
        )
    }
    return <NewComponent />;
}

export default withAircraftSuccMess;