import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MainPage from '../mainPage'

const index = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact component={MainPage} />
                </Switch>
            </Router>
        </div>
    )
}

export default index
