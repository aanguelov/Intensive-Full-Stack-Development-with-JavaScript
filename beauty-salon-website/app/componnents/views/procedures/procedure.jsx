'use strict';

import React from 'react';
import $ from 'jquery';

class Procedure extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { procedure: {} };
        this.isAuthenticated = context.authService.isAuthenticated();
        this.isAdmin = false;
        this.getProcedure = this.getProcedure.bind(this);
        this.deleteProcedure = this.deleteProcedure.bind(this);
        this.handleEditProcedure = this.handleEditProcedure.bind(this);
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

    handleEditProcedure() {
        let path = '/procedures/edit/' + this.props.params.procedureId;
        this.context.router.push(path);
    }

    componentDidMount() {
        this.getProcedure(this.props.params.procedureId);
        if(this.isAuthenticated) {
            this.isAdmin = this.context.authService.isAdmin();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.getProcedure(nextProps.params.procedureId);
    }

    render() {
        return(
            <div className="jumbotron container">
                <h2 className="procedure-name">{this.state.procedure.name}</h2>
                <div className="procedure-text">{this.state.procedure.text}</div>
                <button type="button" className="btn btn-success">Запиши се</button>
                {
                    this.isAdmin ?
                        <div className="pull-right">
                            <button type="button" onClick={this.handleEditProcedure} className="btn btn-info">Редактирай</button>
                            <button type="button" onClick={this.deleteProcedure} className="btn btn-danger">Изтрий</button>
                        </div>
                        : null
                }
            </div>
        )
    }
}

Procedure.propTypes = {
    route: React.PropTypes.object,
    params: React.PropTypes.object
};

Procedure.contextTypes = {
    router: React.PropTypes.object,
    authService: React.PropTypes.object
};

export default Procedure;