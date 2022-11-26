import { useEffect, useState } from 'react';
import s from './Apus.module.scss';
import addEngineImg from '../../assets/img/png/cross.png'
import { useNavigate } from 'react-router-dom';
import Button from '../../common/buttons/Button';
import ApuAddForm from './ApuAddForm/ApuAddForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { IApu } from '../../types/types';
import { getApus } from '../../store/reducers/apuReducer';
import ApuWidget from './ApuWidget/ApuWidget';
import Header from '../Header/Header';

const Apus: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const apusArr = useSelector((state: RootState) => state.apu.apus);
    const apus = apusArr.map((apu: IApu) => {
        return <ApuWidget key={apu._id} apu={apu} />
    })
    const [engAddForm, setEngAddForm] = useState<boolean>(false);
    useEffect(() => {
        dispatch(getApus())
    }, [])
    return (
        <div className={s.apus__container}>
            <Header />
            <div className={s.engines}>
                <ApuAddForm setEngAddForm={setEngAddForm} toggle={engAddForm} />
                {apus}
                <div className={s.widget} onClick={() => setEngAddForm(true)}>
                    <img className={s.widget__img} src={addEngineImg} alt="" />
                </div>
            </div>
            <Button text='Back' color='white__dark' btnType='button' handler={() => navigate('/dashboard')} />
        </div>
    )
}

export default Apus;