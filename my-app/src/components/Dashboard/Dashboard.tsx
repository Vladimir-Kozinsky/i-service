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
import { IAircraft } from '../../store/reducers/aircraftReducer';

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
        {
            _id: 'sdfsdfsd',
            type: 'IL-76TD',
            msn: '23232',
            FH: '34234',
            FC: '23434',
            engines: [
                { _id: '23ereger', pos: 1, msn: '24234' },
                { _id: '23ereger', pos: 2, msn: '24234' },
                { _id: '23ereger', pos: 3, msn: '24234' },
                { _id: '23ereger', pos: 3, msn: '24234' }

            ],
            legs: []
        },
        {
            _id: 'sdfsdfsd',
            type: 'IL-76T',
            msn: '23232',
            FH: '34234',
            FC: '23434',
            engines: [
                { _id: '23ereger', pos: 1, msn: '24234' },
                { _id: '23ereger', pos: 2, msn: '24234' },
                { _id: '23ereger', pos: 3, msn: '24234' },
                { _id: '23ereger', pos: 3, msn: '24234' }

            ],
            legs: []
        },
        {
            _id: 'sdfsdfsd',
            type: 'IL-76TD',
            msn: '23232',
            FH: '34234',
            FC: '23434',
            engines: [
                { _id: '23ereger', pos: 1, msn: '24234' },
                { _id: '23ereger', pos: 2, msn: '24234' },
                { _id: '23ereger', pos: 3, msn: '24234' },
                { _id: '23ereger', pos: 3, msn: '24234' }

            ],
            legs: []
        },

    ]

    const aircraftsWidgets = () => {
        return aircraftsArr.map((aircraft: IAircraft) => {
            return (
                <AircraftWidget aircraft={aircraft} />
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