import { useSelector } from "react-redux";
import SuccessMessage from "../../common/messages/SuccessMessage/SuccessMessage";

const withEngineSuccMess = (Component: any) => ({ ...props }) => {
    const isSuccessMessage = useSelector((state: any) => state.engine.isSuccessMessage)
    return (
        <>
            <Component {...props} />
            <SuccessMessage toggle={isSuccessMessage} />
        </>
    )
}

export default withEngineSuccMess;