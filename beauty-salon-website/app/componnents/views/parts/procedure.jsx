'use strict';

import React from 'react';

const Procedure = (props) => {
    let procedure = props.procedure;
    return(
        <h3>{procedure.name}</h3>
    )
};

export default Procedure;