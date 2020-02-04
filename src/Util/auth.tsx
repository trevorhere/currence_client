import React, { Component } from 'react';
import {Redirect } from 'react-router-dom';
import { getCurrentUserID } from '../Services/User';

export default WrappedComponent => {
    class auth extends Component {
        render(){
            if(getCurrentUserID() == null){
                return <Redirect to={{ pathname: "/signin" }}/>;
            }
            return <WrappedComponent />;
        }
    }
    return auth;
}