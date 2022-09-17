import Button from '../../common/buttons/Button';
import s from './Dashboard.module.scss';
import logo from './../../assets/img/png/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { signOut } from '../../store/reducers/authReducer';

const Dashboard = () => {
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const logout = () => {
        dispatch(signOut());
        navigate('/auth');
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
            </div>
        </div>
    )
}

export default Dashboard;