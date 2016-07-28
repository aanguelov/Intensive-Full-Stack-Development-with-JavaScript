'use strict';

import React from 'react';
import $ from 'jquery';

class EditProcedure extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {name: '', text: ''};
        this.handleProcedureName = this.handleProcedureName.bind(this);
        this.handleProcedureText = this.handleProcedureText.bind(this);
        this.getProcedure = this.getProcedure.bind(this);
        this.editProcedure = this.editProcedure.bind(this);
    }

    getProcedure(procedureId) {
        $.ajax({
            method: 'GET',
            url: this.props.route.url + '/' + procedureId,
            dataType: 'json',
            cache: false
        }).done((data) => {
            this.setState({ name: data.name, text: data.text });
        }).fail((xhr, status, err) => {
            console.error(this.props.route.url, status, err.toString());
        });
    }

    handleProcedureName(event) {
        this.setState({name: event.target.value});
    }

    handleProcedureText(event) {
        this.setState({text: event.target.value});
    }

    editProcedure() {
        let procedure = {
            id: parseInt(this.props.params.procedureId),
            name: this.state.name.trim(),
            text: this.state.text.trim()
        };

        $.ajax({
            method: 'PUT',
            url: this.props.route.url,
            dataType: 'json',
            data: procedure
        }).done((procedureId) => {
            let path = '/procedures/' + procedureId;
            this.context.router.push(path);
        }).fail((xhr, status, err) => {
            console.error(this.props.route.url, status, err.toString());
        });
    }

    componentDidMount() {
        this.getProcedure(this.props.params.procedureId);
    }

    render() {
        return(
            <div className="jumbotron container">
                <div className="form-group">
                    <label htmlFor="name">Име на процедурата</label>
                    <input type="text" className="form-control" value={this.state.name} id="name" onChange={this.handleProcedureName} />
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Описание</label>
                    <textarea type="text" className="form-control" value={this.state.text} rows="5" id="desc" onChange={this.handleProcedureText} />
                </div>
                <button className="btn btn-primary" onClick={this.editProcedure}>Обнови</button>
            </div>
        )
    }
}

EditProcedure.propTypes = {
    route: React.PropTypes.object,
    params: React.PropTypes.object
};

EditProcedure.contextTypes = {
    router: React.PropTypes.object
};

export default EditProcedure;