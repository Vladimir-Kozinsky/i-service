import { useSelector } from "react-redux";
import ErrorMessage from "../../common/messages/ErrorMessage/ErrorMessage";

const withAircraftErrorMess = (Component: any) => ({ ...props }) => {
    const isSuccessMessage = useSelector((state: any) => state.aircraft.isErrorMessage)
    return (
        <>
            <Component {...props} />
            <ErrorMessage toggle={isSuccessMessage}/>
        </>
    )
}

export default withAircraftErrorMess;