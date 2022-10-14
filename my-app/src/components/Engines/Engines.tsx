import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/buttons/Button';
import s from './Engines.module.scss';


const Engines: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className={s.engines}>

            </div>
            <Button text='Back' color='white__dark' btnType='button' handler={() => navigate('/dashboard')} />
        </>

    )
}

export default Engines;