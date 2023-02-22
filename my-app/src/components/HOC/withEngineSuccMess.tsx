import { useSelector } from "react-redux";
import SuccessMessage from "../../common/messages/SuccessMessage/SuccessMessage";
import { hideEngineSuccessMessage } from "../../store/reducers/engineReducer";

const withEngineSuccMess = (Component: any) => ({ ...props }) => {
    const isSuccessMessage = useSelector((state: any) => state.engine.isSuccessMessage)
    return (
        <>
            <Component {...props} />
            <SuccessMessage toggle={isSuccessMessage} handler={hideEngineSuccessMessage} />
        </>
    )
}

export default withEngineSuccMess;