'use strict';

import React from 'react';
import Navlink from './nav-link.jsx';

const ProcedureNames = (props) => {
    let procedures = props.data.map((procedure) => {
        let path = '/procedures/' + procedure.id;
        return(
            <Navlink to={path} key={procedure.id}>{procedure.name}</Navlink>
        )
    });

    return(
        <ul className="dropdown-menu">
            {procedures}
        </ul>
    )
};

ProcedureNames.propTypes = {
    data: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            id: React.PropTypes.number.isRequired,
            name: React.PropTypes.string
        }))
};

export default ProcedureNames;