import s from './Dashboard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import AircraftWidget from './AircraftWidget/AircraftWidget';
import { compose } from 'redux';
import { withAuthRedirect } from '../HOC/withAuthRedirect';
import { getAircrafts, IAircraft } from '../../store/reducers/aircraftReducer';
import { useEffect, useState } from 'react';
import AircraftFile from './AircraftFile/AircraftFile';
import Header from '../Header/Header';

export interface IAircraftFile {
    show: boolean;
    msn: string;
}

const Dashboard = () => {

    const dispatch = useDispatch<AppDispatch>();
    const aircrafts = useSelector((state: any) => state.aircraft.aircrafts);
    const navigate = useNavigate();

    const [aircraftFile, setAircraftFile] = useState<IAircraftFile>({ show: false, msn: '' })

    useEffect(() => {
        dispatch(getAircrafts())
    }, [])



    const aircraftsWidgets = () => {
        if (!aircrafts) return
        return aircrafts.map((aircraft: IAircraft) => {
            return (
                <AircraftWidget key={aircraft._id} aircraft={aircraft} onClick={setAircraftFile} />
            )
        })
    }

    return (
        <>
            {aircraftFile.show ? <AircraftFile msn={aircraftFile.msn} /> : <div className={s.dashboard}>
                <div className={s.background__circle}></div>
                <div className={s.dashboard__container}>
                    <Header />
                    <div className={s.main}>
                        <div className={s.main__aircrafts} >
                            {aircraftsWidgets()}
                            <AircraftWidget type='new' handler={() => navigate("/aircraft/add")} />
                        </div>
                    </div>
                </div>
            </div>}
        </>

    )
}



export default compose(withAuthRedirect)(Dashboard);