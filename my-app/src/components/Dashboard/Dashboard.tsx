import Button from '../../common/buttons/Button';
import s from './Dashboard.module.scss';
import logo from './../../assets/img/png/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { signOut } from '../../store/reducers/authReducer';
import AircraftWidget from './AircraftWidget/AircraftWidget';
import { compose } from 'redux';
import { withAuthRedirect } from '../HOC/withAuthRedirect';

const Dashboard = () => {
    const user = useSelector((state: any) => state.auth.user);
    const isAuth = useSelector((state: any) => state.auth.isAuth)
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const logout = () => {
        dispatch(signOut());
        navigate('/auth');
    }
    const aircraftsArr = [
        { _id: 'dsfsdf', msn: '25899' },
        { _id: 'dsfsdf', msn: '25900' },
        { _id: 'dsfsdf', msn: '25991' },
        { _id: 'dsfsdf', msn: '25999' },
    ]

    const aircraftsWidgets = () => {
        return aircraftsArr.map(() => {
            return (
                <AircraftWidget />
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