import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { IAircraftState } from "../../store/reducers/aircraftReducer";
import { checkAuth, setUser } from "../../store/reducers/authReducer";
import { IAuthState } from "../../types/types";

type MyProps = {
    isAuth: boolean;
    userId: string | null;
    checkAuth: (id: string) => void
}
interface IState {
    auth: IAuthState;
    aircraft: IAircraftState
}

const mapStateToProps = (state: IState) => {
    return {
        isAuth: state.auth.isAuth,
        userId: state.auth.user._id
    }
}

export const withDashboardRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<MyProps> {
        async componentDidMount(): Promise<void> {
            if (this.props.userId) this.props.checkAuth(this.props.userId)
        }
        render() {
            if (this.props.isAuth) return <Navigate to="/dashboard" replace={true} />
            return <Component {...this.props} />
        }
    }
    const mapDispatchToProps = { checkAuth };
    let ConnectedAuthRedirectComponent = connect(mapStateToProps, mapDispatchToProps)(RedirectComponent);
    return ConnectedAuthRedirectComponent
}
