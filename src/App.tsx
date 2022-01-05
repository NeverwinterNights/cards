import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import './App.css';
import {MyRoutes} from './components/routes/MyRoutes';
import {checkAuth} from './redux/authReducer';
import {filesApi} from "./api/fileAPI";
import image from './assets/images/error/404girl.jpg'

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuth());
    }, []);
    return (
        <div>
            <MyRoutes/>
        </div>
    );
};

export default App;
