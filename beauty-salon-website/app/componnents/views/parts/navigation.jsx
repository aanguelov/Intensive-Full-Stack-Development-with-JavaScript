'use strict';

import React from 'react';
import ProcedureNames from './procedure-names.jsx';
import { Link } from 'react-router';


const Navigation = (props) => {
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
                    <a className="navbar-brand" href="/">Емисия красота</a>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li><a href="/">Home</a></li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Процедури <span className="caret"></span></a>
                            <ProcedureNames data={props.data} />
                        </li>
                    </ul>
                    <div className="navbar-form navbar-right">
                        <Link to="/procedures/add"><button type="button" className="btn btn-primary">Добави процедура</button></Link>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#">Логин</a></li>
                        <li><a href="#">Регистрация</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

Navigation.propTypes = {
    data: React.PropTypes.array
};

export default Navigation;