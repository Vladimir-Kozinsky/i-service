import s from './App.module.scss';
import Auth from './components/Auth/Auth';
import { Routes, Route, } from "react-router-dom";
import SignUp from './components/SignUp/SignUp';
import Aircrafts from './components/Aircrafts/Aircrafts';
import Dashboard from './components/Dashboard/Dashboard';
import Engines from './components/Engines/Engines';

function App() {
  return (
    <div className={s.container}>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/aircrafts' element={<Aircrafts />} />
        <Route path='/engines' element={<Engines />} />
      </Routes>
    </div>
  );
}

export default App;
