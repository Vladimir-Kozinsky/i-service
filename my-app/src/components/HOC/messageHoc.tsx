import { useSelector } from 'react-redux';
import SuccessMessage from '../../common/messages/SuccessMessage/SuccessMessage';
import { hideSuccessMessage } from '../../store/reducers/aircraftReducer';
import { hideAuthSuccessMessage } from '../../store/reducers/authReducer';
import { hideEngineSuccessMessage } from '../../store/reducers/engineReducer';

const withSuccessMessage = (Component: any) => ({ ...props }) => {
    const isAuthSuccessMessage = useSelector((state: any) => state.auth.isSuccessMessage)
    const isAircraftSuccessMessage = useSelector((state: any) => state.aircraft.isSuccessMessage)
   
    const NewComponent = () => {
        return (
            <>
                {isAuthSuccessMessage
                    ? <SuccessMessage route='/auth' handler={hideAuthSuccessMessage} toggle={isAuthSuccessMessage} />
                    : null}
               
                {isAircraftSuccessMessage
                    ? <SuccessMessage
                        handler={hideSuccessMessage}
                        toggle={props.setAddForm
                            ? props.setAddForm
                            : props.showArcraftEditForm} />
                    : null}
                <Component {...props} />
            </>
        )

    }
    return <NewComponent />;
}

export default withSuccessMessage;