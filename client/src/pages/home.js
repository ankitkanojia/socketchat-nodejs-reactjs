import React, { Component } from 'react';
import io from "socket.io-client";
const socket = io('http://127.0.0.1:4001');
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
                        <h1>Socket Chat App</h1>
                        <p>Please enter user name.</p>
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
