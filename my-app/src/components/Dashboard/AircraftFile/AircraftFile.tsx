import { Link, Route, Routes } from "react-router-dom";
import s from "./AircraftFile.module.scss";


const AircraftFile = ({ msn }: { msn: string }) => {
    return (
        <div className={s.container} >
            <nav className={s.nav} >
                <Link className={s.nav__link} to="/aircraft/legs">Legs</Link>
                <Link className={s.nav__link} to="/aircraft/legs">Legs</Link>
                <Link className={s.nav__link} to="/aircraft/legs">Legs</Link>
                <Link className={s.nav__link} to="/aircraft/legs">Legs</Link>
                <Link className={s.nav__link} to="/aircraft/legs">Legs</Link>
            </nav>
            <div className={s.aircraftData} >
                <Routes>
                    {/* <Route path='/aircraft/add' element={<Legs />} /> */}
                </Routes>
            </div >
        </div >
    )
}

export default AircraftFile;