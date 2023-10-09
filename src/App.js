import './App.css';
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbarr from './components/Navbarr'
import {
    BrowserRouter as Router, Route, Routes,
} from "react-router-dom";
import Home from './components/Home';
import NotesState from './context/notes/NotesState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';

function App() {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 1500);

    }

    return (
        <>
            <NotesState>
                <Router>
                    <Navbarr />
                    <Alert alert={alert} />
                    <div className="container">

                        <Routes>
                            <Route exact path='/' element={<Home showAlert={showAlert} />} />
                            <Route exact path='/login' element={<Login showAlert={showAlert} />} />
                            <Route exact path='/signup' element={<Signup showAlert={showAlert} />} />
                        </Routes>
                    </div>
                </Router>
            </NotesState>
        </>
    );
}

export default App;