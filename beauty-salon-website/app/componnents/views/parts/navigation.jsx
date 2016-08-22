'use strict';

import React from 'react';
import ProcedureNames from './../procedures/procedure-names.jsx';
import { Link } from 'react-router';


const Navigation = (props) => {
    let isAuthenticated = props.isAuthenticated();
    let isAdmin = props.isAdmin();

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link className="navbar-brand" to="/">Емисия красота</Link>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Процедури <span className="caret"></span></a>
                            <ProcedureNames data={props.data} />
                        </li>
                    </ul>
                    {
                        isAdmin ?
                            <div className="navbar-form navbar-right">
                                <Link to="/procedures/add"><button type="button" className="btn btn-primary">Добави процедура</button></Link>
                            </div>
                        :
                            null
                    }
                    {
                        !isAuthenticated ?
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/users/login">Логин</Link></li>
                                <li><Link to="/users/register">Регистрация</Link></li>
                            </ul>
                        :
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/users/show">Профил</Link></li>
                            </ul>
                    }
                </div>
            </div>
        </nav>
    );
};

Navigation.propTypes = {
    data: React.PropTypes.array,
    isAuthenticated: React.PropTypes.func,
    isAdmin: React.PropTypes.func
};

export default Navigation;