import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/Authentication';

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(id, pw) {
        console.log('Register.js - handleRegister');
        
        const Materialize = window.Materialize;

        return this.props.registerRequest(id, pw).then(
            () => {
                if ( this.props.status == "SUCCESS") {
                    Materialize.toast('Success! Please log in.', 2000);
                    this.props.history.push('/login');
                    return true;
                } else {
                    let errorMessage = [
                        'Invalid Username',
                        'Password is too short',
                        'Username already exists'   
                    ]
                    console.log('errorCode: ', this.props);
                    
                    console.log(errorMessage[this.props.errorCode - 1]);  
                }
            }
        );
    }   

    render() {
        return (
            <div>
                <Authentication mode={false} onRegister={this.handleRegister}/>
            </div>
        );
    }
}

Register.propTypes = {
    status: PropTypes.string,
    errorCode: PropTypes.number,
    registerRequest: PropTypes.func
}

const mapStateToProps = (state) => {    
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: (id, pw) => {
            return dispatch(registerRequest(id, pw));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);