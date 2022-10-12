import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../common/buttons/Button";
import { AppDispatch } from "../../store/store";
import logo from './../../assets/img/png/logo.png';
import s from './Header.module.scss';
import { signOut } from '../../store/reducers/authReducer';

type HeaderProps = {
    theme?: string
}

const Header = ({ theme }: HeaderProps) => {
    const user = useSelector((state: any) => state.auth.user);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(signOut());
        navigate('/auth');
    }
    const color = theme === "white" ? "white" : "white__dark"
    return (
        <div className={s.header}>
            <div className={s.header__logo}>
                <img src={logo} />
                <h2 className={s.header__logo__title} >I-Service</h2>
            </div>
            <div className={s.header__nav} >
                <span>{`${user.firstName} ${user.lastName}`}</span>
                <Button text='Log Out' color={color} btnType='button' handler={logout} />
            </div>
        </div>
    )
}

export default Header;