import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { BrowserRouter as Router } from "react-router-dom"
const Root = function () {
        return (<>
                <Router>
                        <App />
                </Router>
        </>)
}
ReactDOM.render(<Root />, document.getElementById('root'));