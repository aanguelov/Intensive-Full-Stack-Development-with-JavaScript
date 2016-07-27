'use strict';

import React from 'react';
import { Link } from 'react-router';

const NavLink = (props) => {
    return(
        <li>
            <Link {...props} />
        </li>
    )
};

export default NavLink;