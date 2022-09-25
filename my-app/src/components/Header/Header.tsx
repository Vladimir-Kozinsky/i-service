import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../common/buttons/Button";
import { AppDispatch } from "../../store/store";
import logo from './../../assets/img/png/logo.png';
import s from './Header.module.scss';
import { signOut } from '../../store/reducers/authReducer';

const Header = () => {
    const user = useSelector((state: any) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(signOut());
        navigate('/auth');
    }
    return (
        <div className={s.header}>
            <div className={s.header__logo}>
                <img src={logo} />
            </div>
            <div className={s.header__nav} >
                <span>{`${user.firstName} ${user.lastName}`}</span>
                <Button text='Log Out' color='white__dark' btnType='button' handler={logout} />
            </div>
        </div>
    )
}

export default Header;