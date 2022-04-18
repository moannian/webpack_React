import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter as Router } from "react-router-dom"
const Test = function () {
        return (<>
                <Router>
                        <App />
                </Router>
        </>)
}
ReactDOM.render(<Test />, document.getElementById('root'));