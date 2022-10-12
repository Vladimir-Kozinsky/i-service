import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../../store/reducers/authReducer";
import { IAuthState } from "../../types/types";

type MyProps = {
    isAuth: boolean;
    checkAuth: (id: string) => void
    id: string | null
}
interface IState {
    auth: IAuthState;
}

const mapStateToProps = (state: IState) => {
    return {
        isAuth: state.auth.isAuth,
        id: state.auth.user._id
    }
}

export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<MyProps> {
        componentDidMount(): void {
            if (this.props.id) {
                this.props.checkAuth(this.props.id)
            }
        }
        render() {
            if (!this.props.isAuth) return <Navigate to="/auth" replace={true} />
            return <Component {...this.props} />
        }
    }
    const mapDispatchToProps = { checkAuth };
    let ConnectedAuthRedirectComponent = connect(mapStateToProps, mapDispatchToProps)(RedirectComponent);
    return ConnectedAuthRedirectComponent
}
