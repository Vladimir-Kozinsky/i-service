import s from './App.module.scss';
import Auth from './components/Auth/Auth';
import { Routes, Route, } from "react-router-dom";
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className={s.container}>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
