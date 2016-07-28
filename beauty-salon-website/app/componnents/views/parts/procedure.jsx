'use strict';

import React from 'react';
import $ from 'jquery';

class Procedure extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { procedure: {} };
        this.getProcedure = this.getProcedure.bind(this);
        this.deleteProcedure = this.deleteProcedure.bind(this);
    }

    getProcedure(procedureId) {
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

    deleteProcedure() {
        let procedureId = this.props.params.procedureId;
        $.ajax({
            method: 'DELETE',
            url: this.props.route.url + '/' + procedureId,
            dataType: 'json',
            cache: false
        }).done((data) => {
            console.log(data);
            this.context.router.push('/');
        }).fail((xhr, status, err) => {
            console.error(this.props.route.url, status, err.toString());
        });
    }

    componentDidMount() {
        this.getProcedure(this.props.params.procedureId);
    }

    componentWillReceiveProps(nextProps) {
        this.getProcedure(nextProps.params.procedureId);
    }

    render() {
        return(
            <div className="jumbotron container">
                <h2 className="procedure-name">{this.state.procedure.name}</h2>
                <div className="procedure-text">{this.state.procedure.text}</div>
                <div className="btn-group btn-group-md" role="group" aria-label="...">
                    <button type="button" className="btn btn-success">Запиши се</button>
                    <button type="button" className="btn btn-info">Обнови</button>
                    <button type="button" onClick={this.deleteProcedure} className="btn btn-danger">Изтрий</button>
                </div>
            </div>
        )
    }
}

Procedure.propTypes = {
    route: React.PropTypes.object,
    params: React.PropTypes.object
};

Procedure.contextTypes = {
    router: React.PropTypes.object
};

export default Procedure;