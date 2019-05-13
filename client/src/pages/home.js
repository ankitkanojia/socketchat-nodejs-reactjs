import React, { Component } from 'react';
import io from "socket.io-client";
const socket = io("http://10.30.16.33:3030");

class home extends Component {

    constructor() {
        super();
        socket.emit('get_names');
    }

    state = {
        name: ""
    }

   addName() {
        global.currentUser = this.state.name;
        socket.emit('add_name', this.state.name);
        this.props.history.push('/chat');
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <div className="jumbotron text-center">
                    <div className="cContainer">
                        <h1>Chat App</h1>
                        <p>Please enter your name.</p>
                        <div className="row">
                            <div className="col-md-12">
                                <p><input onChange={this.handleChange.bind(this)} type="text" value={this.state.name} /></p>
                                <p><button onClick={this.addName.bind(this)}>Submit</button></p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default home;