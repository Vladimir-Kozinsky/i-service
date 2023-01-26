import s from './Aircrafts.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import AircraftWidget from './AircraftWidget/AircraftWidget';
import { getAircrafts, IAircraft } from '../../store/reducers/aircraftReducer';
import { useEffect, useState } from 'react';

import Button from '../../common/buttons/Button';
import { useNavigate } from 'react-router-dom';
import AircraftForm from './AircraftForm/AircraftForm';
import { Transition, TransitionStatus } from 'react-transition-group';
import Loader from '../../common/Loader/Loader';
import Header from '../Header/Header';
import { compose } from 'redux';
import withAircraftSuccMess from '../HOC/withAircraftSuccMess';
import AddAircraftWidget from './AircraftWidget/AddAircraftWidget';
import withAircraftErrorMess from '../HOC/withAircraftErrorMess';



export interface IAircraftFile {
    show: boolean;
    msn: string;
}

const Aircrafts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const aircrafts = useSelector((state: any) => state.aircraft.aircrafts);
    const [aircraftFile, setAircraftFile] = useState<IAircraftFile>({ show: false, msn: '' })
    const [addForm, setAddForm] = useState<boolean>(false)
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        (async () => {
            await dispatch(getAircrafts())
            setIsLoader(false)
        })()
    }, [])



    const aircraftsWidgets = () => {
        if (!aircrafts) return
        return aircrafts.map((aircraft: IAircraft) => {
            return (
                <AircraftWidget key={aircraft._id}
                    aircraft={aircraft}
                    onClick={setAircraftFile}
                    setIsLoader={setIsLoader}
                    isLoader={isLoader} />
            )
        })
    }

    return (
        <div className={s.aircrafts__container}>
            <Transition in={isLoader} timeout={400} unmountOnExit mountOnEnter >
                {(state) => <Loader state={state} />}
            </Transition>
            <Header />
            <div className={s.aircrafts}>
                {aircraftsWidgets()}
                <AircraftForm setAddForm={setAddForm} toggle={addForm} />
                <AddAircraftWidget setAddForm={setAddForm} isLoader={isLoader} />
            </div>
            <div className={s.aircrafts__buttons} >
                <Button text='Back' color='white__dark' btnType='button' handler={() => navigate("/dashboard")} />
            </div>

        </div>
    )
}

export default compose(withAircraftSuccMess, withAircraftErrorMess)(Aircrafts);
