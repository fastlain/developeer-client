import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default () => Component => {
    function RequiresLogin(props) {
        const { loggedIn, ...passThroughProps } = props;
        if (loggedIn) {
            return <Component {...passThroughProps} />;
        } else {
            return <Redirect to="/" />
        }
    }

    const displayName = Component.displayName || Component.name || 'Component';
    RequiresLogin.displayName = `RequiresLogin(${displayName})`;

    const mapStateToProps = (state, props) => ({
        loggedIn: state.user !== null
    });

    return connect(mapStateToProps)(RequiresLogin);
};