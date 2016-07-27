'use strict';

import React from 'react';
import $ from 'jquery';

class AddProcedure extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {name: '', text: ''};
        this.handleProcedureName = this.handleProcedureName.bind(this);
        this.handleProcedureText = this.handleProcedureText.bind(this);
        this.addProcedure = this.addProcedure.bind(this);
    }

    handleProcedureName(event) {
        this.setState({name: event.target.value});
    }

    handleProcedureText(event) {
        this.setState({text: event.target.value});
    }

    addProcedure() {
        let procedure = {
            name: this.state.name.trim(),
            text: this.state.text.trim()
        };

        $.ajax({
            method: 'POST',
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

    render() {
        return(
            <div className="jumbotron container">
                <div className="form-group">
                    <label htmlFor="name">Име на процедурата</label>
                    <input type="text" className="form-control" id="name" onChange={this.handleProcedureName} />
                </div>
                <div className="form-group">
                    <label htmlFor="desc">Описание</label>
                    <textarea type="text" className="form-control" rows="5" id="desc" onChange={this.handleProcedureText} />
                </div>
                <button className="btn btn-primary" onClick={this.addProcedure}>Добави</button>
            </div>
        )
    }
}

AddProcedure.propTypes = {
    route: React.PropTypes.object
};

AddProcedure.contextTypes = {
    router: React.PropTypes.object
};

export default AddProcedure;