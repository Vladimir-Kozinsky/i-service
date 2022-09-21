import Button from '../../common/buttons/Button';
import s from './Dashboard.module.scss';
import logo from './../../assets/img/png/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { signOut } from '../../store/reducers/authReducer';
import AircraftWidget from './AircraftWidget/AircraftWidget';
import { compose } from 'redux';
import { withAuthRedirect } from '../HOC/withAuthRedirect';
import { getAircrafts, IAircraft } from '../../store/reducers/aircraftReducer';
import { useEffect } from 'react';

const Dashboard = () => {
    const user = useSelector((state: any) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const aircrafts = useSelector((state: any) => state.aircraft.aircrafts);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAircrafts())
    }, [])


    const logout = () => {
        dispatch(signOut());
        navigate('/auth');
    }

    const aircraftsWidgets = () => {
        if (!aircrafts) return
        return aircrafts.map((aircraft: IAircraft) => {
            return (
                <AircraftWidget key={aircraft._id} aircraft={aircraft} />
            )
        })
    }

    return (
        <div className={s.dashboard}>
            <div className={s.background__circle}></div>
            <div className={s.dashboard__container}>
                <div className={s.header}>
                    <div className={s.header__logo}>
                        <img src={logo} />
                    </div>
                    <div className={s.header__nav} >
                        <span>{`${user.firstName} ${user.lastName}`}</span>
                        <Button text='Log Out' color='white__dark' btnType='button' handler={logout} />
                    </div>
                </div>
                <div className={s.main}>
                    <div className={s.main__aircrafts} >
                        {aircraftsWidgets()}
                        <AircraftWidget type='new' handler={() => navigate("/aircraft/add")} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default compose(withAuthRedirect)(Dashboard);