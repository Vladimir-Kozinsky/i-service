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
import Header from '../Header/Header';
import { Transition } from 'react-transition-group';
import Loader from '../../common/Loader/Loader';

const Engines: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const enginesArr = useSelector((state: RootState) => state.engine.engines);
    const engines = enginesArr.map((engine: IEngine) => {
        return <EngineWidget engine={engine} key={engine._id} />
    })
    const [engAddForm, setEngAddForm] = useState<boolean>(false);
    const [isLoader, setIsLoader] = useState(false);
    useEffect(() => {
        async function loader() {
            await setIsLoader(true)
            await dispatch(getEngines())
            await setIsLoader(false)
        }
        loader()
    }, [])

    return (
        <div className={s.engines__container} >
            <Transition in={isLoader} timeout={400} unmountOnExit mountOnEnter >
                {(state) => <Loader state={state} />}
            </Transition>
            <Header />
            <div className={s.engines}>
                <EngineAddForm setEngAddForm={setEngAddForm} toggle={engAddForm} />
                {engines}
                <div className={s.widget} onClick={() => setEngAddForm(true)}>
                    <img className={s.widget__img} src={addEngineImg} alt="" />
                </div>
            </div>
            <Button text='Back' color='white__dark' btnType='button' handler={() => navigate('/dashboard')} />
        </div>



    )
}

export default Engines;