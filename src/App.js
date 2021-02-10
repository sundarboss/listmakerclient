import React from 'react';
import './index.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './Pages/Home';
import Task from './Pages/Task';

import Authcontext from './context/context';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            userId: '',
            username: ''
        };
    }

    login = (id, token, name) => {
        this.setState({
            token: token,
            userId: id,
            username: name
        });
    }

    logout = () => {
        this.setState({
            token: '',
            userId: '',
            username: ''
        });
    }

    render() {
        return (
            <BrowserRouter>
                <Authcontext.Provider value={{
                    token: this.state.token,
                    userId: this.state.userId,
                    username: this.state.username,
                    login: this.login,
                    logout: this.logout
                }}>
                <Switch>
                    {this.state.token && (<Redirect from="/" to="/task" exact />)}
                    <Route path="/" exact component={Home} />
                    {this.state.token && (<Route path="/task" component={Task} />)}
                </Switch>
                </Authcontext.Provider> 
            </BrowserRouter>
        )
    }
}

export default App;