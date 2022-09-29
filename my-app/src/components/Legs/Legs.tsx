import { Field, Form, Formik, FormikHelpers } from "formik";
import Button from "../../common/buttons/Button";
import Input from "../../common/Input";
import s from "./Legs.module.scss"
import Pagenator from "./Pagenator/Pagenator";

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

const Legs = () => {
    return (
        <div className={s.legs__contaiter}>
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
                    <Button text="Search" color="green" btnType="submit" />
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
            </div>
        </div>

    )
}

export default Legs;