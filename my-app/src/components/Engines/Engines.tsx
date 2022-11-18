import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/buttons/Button';
import s from './Engines.module.scss';
import EngineWidget from './EngineWidget/EngineWidget';
import addEngineImg from '../../assets/img/png/cross.png'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getEngines } from '../../store/reducers/engineReducer';
import { IEngine } from '../../types/types';
import EngineAddForm from './EngineAddForm/EngineAddForm';

const Engines: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const enginesArr = useSelector((state: RootState) => state.engine.engines);
    const engines = enginesArr.map((engine: IEngine) => {
        return <EngineWidget engine={engine} key={engine._id} />
    })
    const [engAddForm, setEngAddForm] = useState<boolean>(false);
    useEffect(() => {
        dispatch(getEngines())
    }, [])

    return (
        <>
            <div className={s.engines}>
                <EngineAddForm setEngAddForm={setEngAddForm} toggle={engAddForm} />
                {engines}
                <div className={s.widget} onClick={() => setEngAddForm(true)}>
                    <img className={s.widget__img} src={addEngineImg} alt="" />
                </div>
            </div>
            <Button text='Back' color='white__dark' btnType='button' handler={() => navigate('/dashboard')} />
        </>

    )
}

export default Engines;