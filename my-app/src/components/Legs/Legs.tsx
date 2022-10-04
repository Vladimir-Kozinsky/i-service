import { Field, Form, Formik, FormikHelpers } from "formik";
import Button from "../../common/buttons/Button";
import Input from "../../common/Input";
import { getLegs, IAircraft, setLegsCurrentPage, setLegsTotalPages } from "../../store/reducers/aircraftReducer";
import s from "./Legs.module.scss"
import Pagenator from "./Pagenator/Pagenator";
import backgroundImg1 from "./../../assets/img/png/back-img1.png"
import backgroundImg2 from "./../../assets/img/png/back-img2.png"
import { compose } from "redux";
import { withContainerBlur } from "../HOC/withContainerBlur/withContainerBlur";
import { useState } from "react";
import AddLegForm from "./AddLegForm/AddLegForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import withSuccessMessage from "../HOC/messageHoc";
import { withAuthRedirect } from "../HOC/withAuthRedirect";

type ILegsProps = {
    aircraft: IAircraft;
    setPage: (isPage: boolean) => void

}
interface IFilterValues {
    from: string;
    to: string;
}

interface ILeg {
    _id: string;
    depDate: string;
    flightNumber: string;
    from: string;
    to: string;
    blockOff: string;
    takeOff: string;
    landing: string;
    blockOn: string;
    flightTime: string;
    blockTime: string;
    fh: string;
    fc: string;
}

const Legs = ({ setPage, aircraft }: ILegsProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const choosedAircraft = useSelector((state: any) => state.aircraft.choosedAircraft);
    const totalPages = useSelector((state: any) => state.aircraft.legsTotalPages);
    const currentPage = useSelector((state: any) => state.aircraft.legsCurrentPage);
    const [searchParam, setSearchParam] = useState({ from: '', to: '' });
    const [addLegForm, setAddLegForm] = useState(false);
    const [legsEditMode, setlegsEditMode] = useState(false);

    const getLegsFunc = async (msn: string, from: string, to: string, page: number) => {
        dispatch(getLegs({ msn, from, to, page }))
    }

    const legsComp = choosedAircraft ? choosedAircraft.legs.map((leg: ILeg) => {
        return (
            <div key={leg._id} className={s.leg}>
                <div className={s.leg__title__value}>{leg.depDate}</div>
                <div className={s.leg__title__value}>{leg.flightNumber}</div>
                <div className={s.leg__title__value}>{leg.from}</div>
                <div className={s.leg__title__value}>{leg.to}</div>
                <div className={s.leg__title__value}>{leg.blockOff}</div>
                <div className={s.leg__title__value}>{leg.takeOff}</div>
                <div className={s.leg__title__value}>{leg.landing}</div>
                <div className={s.leg__title__value}>{leg.blockOn}</div>
                <div className={s.leg__title__value}>{leg.flightTime}</div>
                <div className={s.leg__title__value}>{leg.blockTime}</div>
                <div className={s.leg__title__value}>{leg.fh}</div>
                <div className={s.leg__title__value}>{leg.fc}</div>
                {legsEditMode
                    && <div className={s.edit__btns} >
                        <button className={s.edit__btns__edit}></button>
                        <button className={s.edit__btns__del} ></button>
                    </div>}
            </div>
        )
    }) : null

    const changePage = (page: number) => {
        getLegsFunc(aircraft.msn, searchParam.from, searchParam.to, page)
    }

    return (
        <div className={s.legs__contaiter}>
            <div className={s.background__circle}></div>
            {addLegForm && <AddLegForm setAddLegForm={setAddLegForm} msn={aircraft.msn} fh={aircraft.fh} fc={aircraft.fc} />}
            <div className={s.aircraftInfo} >
                <div className={s.aircraftInfo__wrap} >
                    <div className={s.aircraftInfo__block} >
                        <span className={s.aircraftInfo__block__title}>Type:</span>
                        <span className={s.aircraftInfo__block__value}>{aircraft.type}</span>
                    </div>
                    <div className={s.aircraftInfo__block}>
                        <span className={s.aircraftInfo__block__title}>MSN:</span>
                        <span className={s.aircraftInfo__block__value}>{aircraft.msn}</span>
                    </div>
                    <div className={s.aircraftInfo__block}>
                        <span className={s.aircraftInfo__block__title}>Reg:</span>
                        <span className={s.aircraftInfo__block__value}>{aircraft.regNum}</span>
                    </div>
                </div>
                <div className={s.aircraftInfo__wrap} >
                    <div className={s.aircraftInfo__block}>
                        <span className={s.aircraftInfo__block__title}>FH:</span>
                        <span className={s.aircraftInfo__block__value}>{aircraft.fh}</span>
                    </div>
                    <div className={s.aircraftInfo__block}>
                        <span className={s.aircraftInfo__block__title}>FC:</span>
                        <span className={s.aircraftInfo__block__value}>{aircraft.fc}</span>
                    </div>
                </div>
            </div>
            <Formik
                initialValues={{
                    from: '',
                    to: ''
                }}
                onSubmit={(
                    values: IFilterValues,
                    { setSubmitting }: FormikHelpers<IFilterValues>
                ) => {
                    getLegsFunc(aircraft.msn, values.from, values.to, currentPage)
                    setSearchParam({ from: values.from, to: values.to })
                }}
            >
                <Form className={s.legs__filter}>
                    <div className={s.value__wrap}>
                        <label>From</label>
                        <Input type='date' id='from' name='from' placeholder='' />
                    </div>
                    <div className={s.value__wrap}>
                        <label>To</label>
                        <Input type='date' id='to' name='to' placeholder='' />
                    </div>
                    <Button text="Search" color="white" btnType="submit" />
                </Form>
            </Formik>
            <Pagenator totalPages={totalPages} currentPage={currentPage} changePage={changePage} />
            <div className={s.legs}>
                <div className={s.leg__title}>
                    <div className={s.leg__title__value}>Date</div>
                    <div className={s.leg__title__value}>Flight No</div>
                    <div className={s.leg__title__value}>From</div>
                    <div className={s.leg__title__value}>To</div>
                    <div className={s.leg__title__value}>Block Off</div>
                    <div className={s.leg__title__value}>Take Off</div>
                    <div className={s.leg__title__value}>Landing</div>
                    <div className={s.leg__title__value}>Block On</div>
                    <div className={s.leg__title__value}>Flight Time</div>
                    <div className={s.leg__title__value}>Block Time</div>
                    <div className={s.leg__title__value}>FH</div>
                    <div className={s.leg__title__value}>FC</div>
                </div>
                {legsComp}
            </div>
            <div className={s.buttons} >
                <Button text="Back" btnType="button" color="white" handler={() => setPage(false)} />
                <Button text="Edit" btnType="button" color="white" handler={() => setlegsEditMode(true)} />
                <Button text="Add" btnType="button" color="green" handler={() => setAddLegForm(true)} />
            </div>
        </div >
    )
}

export default compose(withContainerBlur, withSuccessMessage, withAuthRedirect)(Legs); 