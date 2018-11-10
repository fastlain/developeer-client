import React from 'react';
import { connect } from 'react-redux';
import { closeNotification } from '../actions';
import requiresLogin from './HOC/requiresLogin';

import PageTitle from './PageTitle';
import Notifications from './Notifications';
import Credits from './Credits';
import MyFeedback from './MyFeedback';

export const Dashboard = props => (
    <div>
        <PageTitle>Dashboard</PageTitle>
        <Notifications notifications={props.notifications} closeNotification={props.closeNotification} />
        <Credits credits={props.credit} />
        <MyFeedback />
    </div>
);

const mapStateToProps = state => ({
    credit: state.credit,
    notifications: state.notifications
});

const mapDispatchToProps = dispatch => ({
    closeNotification: id => dispatch(closeNotification(id))
});

export default requiresLogin()(connect(mapStateToProps, mapDispatchToProps)(Dashboard));