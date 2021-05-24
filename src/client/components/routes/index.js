import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UidContext } from '../AppContext'
import Login from '../Login/login'
import MainPage from '../MainPage'

const index = () => {
    const uid = useContext(UidContext)
    return (
        <div>
            <Router>
                <Switch>
                    {uid ? (
                        <Route path="/" exact component={MainPage} />
                    ) : (
                        <Route path="/" exact component={Login} />
                    )}
                </Switch>
            </Router>
        </div>
    )
}

export default index
