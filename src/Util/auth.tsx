import React, { Component } from 'react';
import {Redirect } from 'react-router-dom';
import { getCurrentUser } from '../Services/User';

export default WrappedComponent => {
    class auth extends Component {
        render(){
            if(getCurrentUser() == null){
                return <Redirect to={{ pathname: "/signin" }}/>;
            }
            return <WrappedComponent />;
        }
    }
    return auth;
}