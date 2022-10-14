import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/buttons/Button';
import s from './Engines.module.scss';
import EngineWidget from './EngineWidget/EngineWidget';
import addEngineImg from '../../assets/img/png/cross.png'

const fakeEngines = [
    { _id: 'sdfsdf', msn: '25897', fh: '2569:33', fc: '45859', lastRepData: '25-05-1989', lastRepFh: '2323:33', lastRepFc: "51465" },
    { _id: 'sdfsdf', msn: '25897', fh: '2569:33', fc: '45859', lastRepData: '25-05-1989', lastRepFh: '2323:33', lastRepFc: "51465" },
    { _id: 'sdfsdf', msn: '25897', fh: '2569:33', fc: '45859', lastRepData: '25-05-1989', lastRepFh: '2323:33', lastRepFc: "51465" },
    { _id: 'sdfsdf', msn: '25897', fh: '2569:33', fc: '45859', lastRepData: '25-05-1989', lastRepFh: '2323:33', lastRepFc: "51465" },
    { _id: 'sdfsdf', msn: '25897', fh: '2569:33', fc: '45859', lastRepData: '25-05-1989', lastRepFh: '2323:33', lastRepFc: "51465" },
    { _id: 'sdfsdf', msn: '25897', fh: '2569:33', fc: '45859', lastRepData: '25-05-1989', lastRepFh: '2323:33', lastRepFc: "51465" },
]

const Engines: React.FC = () => {
    const navigate = useNavigate();
    const engines = fakeEngines.map((engine: any) => {
        return <EngineWidget engine={engine} />
    })
    return (
        <>
            <div className={s.engines}>
                {engines}
                <div className={s.widget}>
                    <img className={s.widget__img} src={addEngineImg} alt="" />
                </div>
            </div>
            <Button text='Back' color='white__dark' btnType='button' handler={() => navigate('/dashboard')} />
        </>

    )
}

export default Engines;