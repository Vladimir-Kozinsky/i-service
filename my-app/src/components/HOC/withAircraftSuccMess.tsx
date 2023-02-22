import { useSelector } from "react-redux";
import SuccessMessage from "../../common/messages/SuccessMessage/SuccessMessage";
import { hideSuccessMessage } from "../../store/reducers/aircraftReducer";

const withAircraftSuccMess = (Component: any) => ({ ...props }) => {
    const isSuccessMessage = useSelector((state: any) => state.aircraft.isSuccessMessage)
    return (
        <>
            <Component {...props} />
            <SuccessMessage toggle={isSuccessMessage} handler={hideSuccessMessage}/>
        </>
    )
}

export default withAircraftSuccMess;