'use strict';

import React from 'react';
import Procedure from './parts/procedure.jsx';
import $ from 'jquery';

class ProcedureView extends React.Component {
    constructor(props) {
        super(props);
        this.state = { procedure: {} };
        this.getProcedure = this.getProcedure.bind(this);
    }

    getProcedure(procedureId) {
        //let procedureId = this.props.params.procedureId;
        $.ajax({
            method: 'GET',
            url: this.props.route.url + '/' + procedureId,
            dataType: 'json',
            cache: false
        }).done((data) => {
            this.setState({ procedure: data });
        }).fail((xhr, status, err) => {
            console.error(this.props.route.url, status, err.toString());
        });
    }

    componentDidMount() {
        //console.log(this.props.params.procedureId);
        this.getProcedure(this.props.params.procedureId);
    }

    componentWillReceiveProps(nextProps) {
        this.getProcedure(nextProps.params.procedureId);
    }

    render() {
        return(
            <Procedure procedure={this.state.procedure} />
        )
    }
}

export default ProcedureView;