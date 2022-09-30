import { Field, Form, Formik, FormikHelpers } from "formik";
import Button from "../../common/buttons/Button";
import Input from "../../common/Input";
import { IAircraft } from "../../store/reducers/aircraftReducer";
import s from "./Legs.module.scss"
import Pagenator from "./Pagenator/Pagenator";
import backgroundImg1 from "./../../assets/img/png/back-img1.png"
import backgroundImg2 from "./../../assets/img/png/back-img2.png"

type ILegsProps = {
    aircraft?: IAircraft;
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
const Leg: ILeg = {
    _id: '223423',
    depDate: '25.05.2020',
    flightNumber: 'tss2345',
    from: 'EDDT',
    to: 'EDDD',
    blockOff: '14:30',
    takeOff: '14:40',
    landing: '18:00',
    blockOn: '18:10',
    flightTime: "02:15",
    blockTime: "02:25",
    fh: '343434',
    fc: '343433'
}

const fakeArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const legs = fakeArr.map(() => {
    return (
        <div className={s.leg}>
            <div className={s.leg__title__value}>{Leg.depDate}</div>
            <div className={s.leg__title__value}>{Leg.flightNumber}</div>
            <div className={s.leg__title__value}>{Leg.from}</div>
            <div className={s.leg__title__value}>{Leg.to}</div>
            <div className={s.leg__title__value}>{Leg.blockOff}</div>
            <div className={s.leg__title__value}>{Leg.takeOff}</div>
            <div className={s.leg__title__value}>{Leg.landing}</div>
            <div className={s.leg__title__value}>{Leg.blockOn}</div>
            <div className={s.leg__title__value}>{Leg.flightTime}</div>
            <div className={s.leg__title__value}>{Leg.blockTime}</div>
            <div className={s.leg__title__value}>{Leg.fh}</div>
            <div className={s.leg__title__value}>{Leg.fc}</div>
        </div>
    )
})

const fakeAircraft = {
    _id: "632ac45eaaac3b3162a6d242",
    type: "Boeing 737-300",
    regNum: "23233",
    msn: "111111",
    fh: "4444:11",
    fc: "1111",
    engines: [
        { _id: "ac45eaaac3b3162a6d242pos", pos: 1, msn: "34343" },
        { _id: "ac45eaaac3b3162a6d242pos", pos: 2, msn: "34343" },
        { _id: "ac45eaaac3b3162a6d242pos", pos: 3, msn: "34343" },
        { _id: "ac45eaaac3b3162a6d242pos", pos: 4, msn: "34343" }
    ],
    apu: "111",
    legs: []
}

const Legs = () => {
    return (
        <div className={s.legs__contaiter}>
              <div className={s.background__circle}></div>
              <img className={s.background__img1} src={backgroundImg1} alt="" />
              <img className={s.background__img2} src={backgroundImg2} alt="" />
            <div className={s.aircraftInfo} >
                <div className={s.aircraftInfo__block} >
                    <span className={s.aircraftInfo__block__title}>Type:</span>
                    <span className={s.aircraftInfo__block__value}>{fakeAircraft.type}</span>
                </div>
                <div className={s.aircraftInfo__block}>
                    <span className={s.aircraftInfo__block__title}>MSN:</span>
                    <span className={s.aircraftInfo__block__value}>{fakeAircraft.msn}</span>
                </div>
                <div className={s.aircraftInfo__block}>
                    <span className={s.aircraftInfo__block__title}>Reg:</span>
                    <span className={s.aircraftInfo__block__value}>{fakeAircraft.regNum}</span>
                </div>
                <div className={s.aircraftInfo__block}>
                    <span className={s.aircraftInfo__block__title}>FH:</span>
                    <span className={s.aircraftInfo__block__value}>{fakeAircraft.fh}</span>
                </div>
                <div className={s.aircraftInfo__block}>
                    <span className={s.aircraftInfo__block__title}>FC:</span>
                    <span className={s.aircraftInfo__block__value}>{fakeAircraft.fc}</span>
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
                    console.log('search legs from to', values)
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
            <Pagenator />
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
                {legs}
            </div>
            <div className={s.buttons} >
                <Button text="Back" btnType="button" color="white" />
                <Button text="Add" btnType="button" color="green" />
            </div>
        </div>

    )
}

export default Legs;