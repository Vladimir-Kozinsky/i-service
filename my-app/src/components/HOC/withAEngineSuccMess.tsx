import { useSelector } from 'react-redux';
import SuccessMessage from '../../common/messages/SuccessMessage/SuccessMessage';
import { hideEngineSuccessMessage } from '../../store/reducers/engineReducer';

const withEngineSuccMess = (Component: any) => ({ ...props }) => {
    const isEngineSuccessMessage = useSelector((state: any) => state.engine.isSuccessMessage)
    const NewComponent = () => {
        return (
            <>
                {isEngineSuccessMessage
                    ? <SuccessMessage
                        handler={hideEngineSuccessMessage}
                        toggle={isEngineSuccessMessage} />
                    : null}
                <Component {...props} />
            </>
        )
    }
    return <NewComponent />;
}

export default withEngineSuccMess;