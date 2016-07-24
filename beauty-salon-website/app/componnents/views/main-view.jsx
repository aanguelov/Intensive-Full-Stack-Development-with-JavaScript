'use strict';

import React from 'react';
import Navigation from './parts/navigation';
import $ from 'jquery';

class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {data: []};
        this.loadProcedures = this.loadProcedures.bind(this);
    }

    loadProcedures() {
        $.ajax({
            method: 'GET',
            url: this.props.route.url,
            dataType: 'json',
            cache: false
        }).done((data) => {
            console.log(this.props);
            this.setState({ data: data });
        }).fail((xhr, status, err) => {
            console.error(this.props.route.url, status, err.toString());
        });
    }

    componentDidMount() {
        this.loadProcedures();
        //setInterval(this.loadProcedures, this.props.route.pollInterval);
    }

    render() {
        return (
        <div>
            <Navigation data={this.state.data} />

            {/* Routed components go here... */}
            {this.props.children}
        </div>);
    }
}

MainView.propTypes = {
    children: React.PropTypes.node,
    url: React.PropTypes.string,
    pollInterval: React.PropTypes.number,
    route: React.PropTypes.object
};

export default MainView;