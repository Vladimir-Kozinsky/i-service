import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { IAircraftState } from "../../store/reducers/aircraftReducer";
import { IAuthState } from "../../store/reducers/authReducer";

type MyProps = {
    isAuth: boolean;
}
interface IState {
    auth: IAuthState;
    aircraftL: IAircraftState
}

const mapStateToProps = (state: IState) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withDashboardRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<MyProps> {
        render() {
            if (this.props.isAuth) return <Navigate to="/dashboard" replace={true} />
            return <Component {...this.props} />
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent);
    return ConnectedAuthRedirectComponent
}
