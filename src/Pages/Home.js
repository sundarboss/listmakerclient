import React from 'react';
import Authcontext from '../context/context';
import axios from 'axios';

import './Home.css';


const listItems = [
    {
        text: 'Create a list of todo items',
        icon: 'fas fa-plus-square fa-2x'
    },
    {
        text: 'Mark the finished items as completed',
        icon: 'fas fa-check-square fa-2x'
    },
    {
        text: 'Edit the created todo items with a click',
        icon: 'fas fa-edit fa-2x'
    },
    {
        text: 'Delete the items not needed from your list',
        icon: 'fas fa-trash fa-2x'
    },
    {
        text: 'View the complete list of items created by you',
        icon: 'fas fa-list fa-2x'
    },
    {
        text: 'Signup to create and manage your own todo items',
        icon: 'fas fa-user-plus fa-2x'
    }
];

const BASE_URL = process.env.REACT_APP_BASE_URL;

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            signin: true,
            error: ''
        }
    }

    static contextType = Authcontext;

    onNameChange = (e) => {
        this.setState({name: e.target.value});
    }

    onEmailChange = (e) => {
        this.setState({email: e.target.value});
    }

    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    onSigninSubmit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/api/user/login`, {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            this.context.login(res.data.userid, res.data.token, res.data.name);
        })
        .catch(err => {
            this.setState({error: err.response.data});
        })
    }

    onRegisterSubmit = (e) => {
        e.preventDefault();
        axios.post(`${BASE_URL}/api/user/register`, {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            this.context.login(res.data.userid, res.data.token, res.data.name);
        })
        .catch(err => {
            this.setState({error: err.response.data});
        })
    }

    onRegisterClick = () => {
        this.setState({
            email: '',
            password: '',
            signin: false,
            error: ''
        });
    }

    onSigninClick = () => {
        this.setState({
            name: '',
            email: '',
            password: '',
            signin: true,
            error: ''
        });
    }

    render() {
        const finalList = listItems.map((item, i) => {
             return (<li className={`activeitem-${i} liItem`}><i className={item.icon}></i><span className="liText">{item.text}</span></li>)
        });

        return (
            <div className="my-container">
                <h1 className="my-header">List Creator</h1>
                <div className="my-main">
                    <div className="my-list">
                        <ul className="lists">
                            {finalList}
                        </ul>
                    </div>
                    <div className="my-login">
                        <h2 className="form-header">{this.state.signin ? "Sign In" : "Register"}</h2>
                        {this.state.error && (<div className="error">
                               {this.state.error}
                        </div>)}
                        {this.state.signin ?
                        (<form className="form" onSubmit={this.onSigninSubmit}>
                            <div className="field">
                                <label htmlFor="email">Email</label><br/>
                                <input 
                                 type="email" 
                                 name="email"
                                 value={this.state.email} 
                                 onChange={this.onEmailChange}
                                 placeholder="Enter Your Email" 
                                 className="input"
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="password">Password</label><br/>
                                <input 
                                 type="password" 
                                 name="password" 
                                 value={this.state.password}
                                 onChange={this.onPasswordChange}
                                 placeholder="Enter Your Password" 
                                 className="input"
                                />
                            </div>
                            <div className="field">
                                <button type="Submit" className="button"><i className="fas fa-sign-in-alt"></i> Sign In</button>
                            </div>
                            <div className="field">
                               New to List Creator?
                            </div>
                            <div className="field">
                                <button type="button" className="secondary-button" onClick={this.onRegisterClick}>Create An Account</button>
                            </div>
                        </form>)
                        :
                        (<form className="form" onSubmit={this.onRegisterSubmit}>
                            <div className="field">
                                <label htmlFor="name">Name</label><br/>
                                <input 
                                 type="text" 
                                 name="name" 
                                 value={this.state.name}
                                 onChange={this.onNameChange}
                                 placeholder="Enter Your Name" 
                                 className="input" 
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="email">Email</label><br/>
                                <input 
                                 type="email" 
                                 name="email" 
                                 value={this.state.email}
                                 onChange={this.onEmailChange}
                                 placeholder="Enter Your Email" 
                                 className="input"
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="password">Password</label><br/>
                                <input 
                                 type="password" 
                                 name="password" 
                                 value={this.state.password}
                                 onChange={this.onPasswordChange}
                                 placeholder="Enter Your Password" 
                                 className="input"
                                />
                            </div>
                            <div className="field">
                                <button type="Submit" className="button">Register</button>
                            </div>
                            <div className="field">
                               Have an account? <span className="signin-link" onClick={this.onSigninClick}>Sign-In</span>
                            </div>
                        </form>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;