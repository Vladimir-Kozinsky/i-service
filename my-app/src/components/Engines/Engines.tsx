import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/buttons/Button';
import Header from '../Header/Header';
import s from './Engines.module.scss';

const Engines: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className={s.engines}>
            <div className={s.background__circle}></div>
            <div className={s.dashboard__container}>
                <Header />
                <div className={s.main}>
                    <Button text='Back' color='white__dark' btnType='button' handler={() => navigate('/dashboard')} />

                </div>
            </div>

        </div>
    )
}

export default Engines;