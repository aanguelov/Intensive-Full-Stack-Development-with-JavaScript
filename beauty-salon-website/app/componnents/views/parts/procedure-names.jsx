'use strict';

import React from 'react';

const ProcedureNames = (props) => {
    let procedures = props.data.map((procedure) => {
        return(
            <li key={procedure.id}>{procedure.name}</li>
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